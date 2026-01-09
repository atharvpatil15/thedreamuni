import * as fs from 'fs';
import * as path from 'path';

const INPUT_FILE = 'university_rankings.csv';
const OUTPUT_FILE = path.join('lib', 'university_data_cleaned.json');

interface UniversityRaw {
    name: string;
    location: string;
    ranking: string;
    programDetails: string;
    tuition: string;
    // Discovered hidden fields
    requirements?: string;
    cost_per_term?: string; // Sometimes tuition is split or duplicated
    min_gpa?: string;
    ielts?: string;
    extra_notes?: string;
}

interface ProcessedUniversity {
    id: string;
    name: string;
    location: string;
    country: string;
    ranking: string;
    programs: {
        name: string;
        details: string;
        tuition: string;
        requirements: {
            gpa: string;
            ielts: string;
            text: string;
        }
    }[];
    // This is the "Gold" for Vector Search
    ai_embedding_context: string[]; 
}

function parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());
    return result;
}

function cleanData() {
    console.log("Reading CSV...");
    const rawData = fs.readFileSync(INPUT_FILE, 'utf-8');
    const lines = rawData.split(/\r?\n/).filter(line => line.trim() !== '');

    // Skip Header
    const dataLines = lines.slice(1);
    
    const universityMap = new Map<string, ProcessedUniversity>();

    dataLines.forEach((line, index) => {
        const cols = parseCSVLine(line);
        if (cols.length < 2) return;

        // Extract basic fields
        const name = cols[0].replace(/^"|"$/g, '');
        const location = cols[1].replace(/^"|"$/g, '');
        const ranking = cols[2]?.replace(/^"|"$/g, '') || "Not Ranked";
        const programDetails = cols[3]?.replace(/^"|"$/g, '') || "General Admission";
        const tuition = cols[4]?.replace(/^"|"$/g, '') || "Contact for pricing";
        
        // Extract hidden fields (Column 6+) found in ragged rows
        // Based on file analysis: [5] often Requirements, [6] Cost/Term, [7] GPA, [8] IELTS
        const requirements = cols[5]?.replace(/^"|"$/g, '') || "Standard admission requirements apply.";
        const min_gpa = cols[6]?.replace(/^"|"$/g, '') || cols[7]?.replace(/^"|"$/g, '') || "N/A"; 
        const ielts = cols[cols.length - 1]?.match(/\d\.\d/)?.[0] || "6.0"; // smart regex for IELTS at end

        // Normalize Country
        let country = "International";
        if (location.includes("USA") || location.includes("United States")) country = "USA";
        else if (location.includes("UK") || location.includes("United Kingdom") || location.includes("England")) country = "UK";
        else if (location.includes("Canada")) country = "Canada";
        else if (location.includes("Germany")) country = "Germany";
        else if (location.includes("Australia")) country = "Australia";
        else if (location.includes("India")) country = "India";
        else {
            const parts = location.split(',');
            country = parts[parts.length - 1].trim();
        }

        // Create or Update University Entry
        if (!universityMap.has(name)) {
            universityMap.set(name, {
                id: `uni-${Date.now()}-${index}`,
                name,
                location,
                country,
                ranking,
                programs: [],
                ai_embedding_context: []
            });
        }

        const uni = universityMap.get(name)!;

        // Add Program
        uni.programs.push({
            name: programDetails.length < 50 ? programDetails : "Various Programs", // Heuristic naming
            details: programDetails,
            tuition,
            requirements: {
                gpa: min_gpa,
                ielts: ielts,
                text: requirements
            }
        });

        // Generate Semantic Context for this specific row
        // This string is optimized for Embedding Models
        const contextString = `University: ${name}. Location: ${location}. Ranking: ${ranking}. Program Focus: ${programDetails}. Cost: ${tuition}. Requirements: GPA ${min_gpa}, IELTS ${ielts}.`;
        uni.ai_embedding_context.push(contextString);
    });

    const output = Array.from(universityMap.values());
    
    console.log(`Processed ${dataLines.length} raw rows.`);
    console.log(`Consolidated into ${output.length} unique universities.`);
    
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
    console.log(`Cleaned data saved to ${OUTPUT_FILE}`);
}

cleanData();
