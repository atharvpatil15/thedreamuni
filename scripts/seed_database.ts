
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config'; // Loads .env file for the script context

// NOTE: This script expects these env variables to be set in your terminal or .env file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(); // SERVICE ROLE KEY needed for writing!

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Error: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  console.log("   Check your .env file.");
  process.exit(1);
}

console.log(`Connecting to: ${supabaseUrl}`);
const supabase = createClient(supabaseUrl, supabaseKey);

const DATA_FILE = path.join('lib', 'university_data_cleaned.json');

// Mock Embedding Function (Replace with real OpenAI call in production)
async function generateEmbedding(text: string): Promise<number[]> {
    // Returns a random 1536-dimensional vector for testing
    // In prod: return await openai.embeddings.create({ input: text, model: "text-embedding-3-small" });
    return Array.from({ length: 1536 }, () => Math.random());
}

async function seed() {
    console.log("🌱 Starting Database Seed...");
    
    // 1. Read Data
    const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
    const universities = JSON.parse(rawData);
    console.log(`📦 Loaded ${universities.length} universities from JSON.`);

    for (const uni of universities) {
        // 2. Insert University
        // We use 'upsert' to avoid duplicates based on the 'name'
        const { data: uniData, error: uniError } = await supabase
            .from('universities')
            .upsert({
                name: uni.name,
                slug: uni.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                country: uni.country,
                city: uni.location.split(',')[0].trim(), // Simple city extractor
                ranking_global: parseInt(uni.ranking) || null,
                description: uni.programs[0]?.details || "Global Institution"
            }, { onConflict: 'name' })
            .select()
            .single();

        if (uniError) {
            console.error(`❌ Failed to insert ${uni.name}:`, uniError.message);
            continue;
        }

        const uniId = uniData.id;
        console.log(`✅ Processed: ${uni.name}`);

        // 3. Insert Programs
        const programsPayload = uni.programs.map((prog: any) => {
            // FIX: Handle ranges like "9000-12000" by taking the first number
            // Regex finds the first sequence of digits, ignoring dates if possible
            const tuitionMatch = prog.tuition.match(/(\d[\d,]*)/);
            const rawTuition = tuitionMatch ? parseInt(tuitionMatch[0].replace(/,/g, '')) : 0;
            
            // Sanity check: If tuition is > 1,000,000, it's probably a parsing error (concatenated years)
            const tuition_fee = rawTuition < 1000000 ? rawTuition : 0;

            return {
                university_id: uniId,
                name: prog.name,
                degree_level: "Bachelor/Master", // Defaulting for now
                tuition_fee: tuition_fee,
                min_gpa: prog.requirements.gpa,
                ielts_score: parseFloat(prog.requirements.ielts) || null
            };
        });

        const { error: progError } = await supabase
            .from('programs')
            .insert(programsPayload);

        if (progError) console.error(`   ⚠️ Program error: ${progError.message}`);

        // 4. Generate & Insert Embedding (The AI Part)
        // We combine all context into one rich vector for the university
        const contextText = uni.ai_embedding_context.join(" ");
        const embeddingVector = await generateEmbedding(contextText);

        const { error: embedError } = await supabase
            .from('university_embeddings')
            .insert({
                university_id: uniId,
                content_text: contextText,
                embedding: embeddingVector
            });

        if (embedError) console.error(`   ⚠️ Vector error: ${embedError.message}`);
    }

    console.log("✨ Seeding Complete!");
}

seed().catch(console.error);
