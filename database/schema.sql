
-- Enable the pgvector extension to work with embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- 1. UNIVERSITIES: Core Institution Data
CREATE TABLE universities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT UNIQUE NOT NULL, -- For SEO friendly URLs (e.g., /universities/technical-university-munich)
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    ranking_global INT, -- QS or THE Ranking
    website_url TEXT,
    logo_url TEXT,
    description TEXT, -- A general summary for display
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. PROGRAMS: Specific Courses offered by Universities
-- This is critical because "Tuition" often depends on the Program, not just the University.
CREATE TABLE programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    university_id UUID REFERENCES universities(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- e.g., "MSc Computer Science"
    degree_level TEXT, -- "Bachelor", "Master", "PhD"
    tuition_fee INT, -- Normalized to USD for easier filtering
    tuition_currency TEXT DEFAULT 'USD',
    duration_months INT,
    
    -- Admission Requirements
    min_gpa TEXT,
    ielts_score NUMERIC(3,1),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. EMBEDDINGS: The AI Brain
-- We store the vector representation of the university here.
-- We use 1536 dimensions (standard for OpenAI text-embedding-3-small).
CREATE TABLE university_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    university_id UUID REFERENCES universities(id) ON DELETE CASCADE,
    
    -- The text chunk we embedded (so we can see what the AI "read")
    content_text TEXT NOT NULL,
    
    -- The actual vector for math operations
    embedding vector(1536)
);

-- 4. SCHOLARSHIPS (Optional but High Value)
CREATE TABLE scholarships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    university_id UUID REFERENCES universities(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    amount INT,
    criteria TEXT
);

-- INDEXES for Speed
CREATE INDEX idx_universities_country ON universities(country);
CREATE INDEX idx_programs_tuition ON programs(tuition_fee);
-- Special Index for AI Search (IVFFlat is good for speed/recall balance)
CREATE INDEX idx_university_embeddings ON university_embeddings USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 100);

-- 5. MATCHING FUNCTION (The "Search Engine" Logic)
-- This function runs INSIDE the database to find the closest vectors.
CREATE OR REPLACE FUNCTION match_universities (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  content_text TEXT,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    ue.university_id as id,
    u.name,
    ue.content_text,
    1 - (ue.embedding <=> query_embedding) as similarity
  FROM university_embeddings ue
  JOIN universities u ON ue.university_id = u.id
  WHERE 1 - (ue.embedding <=> query_embedding) > match_threshold
  ORDER BY ue.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
