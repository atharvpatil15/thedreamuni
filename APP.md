# TheDreamUni - AI-Powered Study Abroad Platform

TheDreamUni is a modern EdTech platform designed to help students discover international universities through **AI-driven recommendations** and **Semantic Search**.

## 🏗️ Architecture & Logic

### 1. Hybrid Search Engine (University Explorer)
The platform uses a sophisticated decision matrix to search for universities, balancing **Precision** with **Discovery**.

*   **Scenario A: Precision Mode (Strict Filtering)**
    *   **Trigger:** When a user selects a specific `Country` (e.g., "Germany").
    *   **Logic:** The system bypasses AI and uses **PostgreSQL Queries** (`WHERE country = 'Germany'`).
    *   **Why:** Ensures 100% accuracy for categorical filters. No hallucinations.
    *   **Filter Stack:**
        1.  **DB Query:** Fetch all universities in the selected Country.
        2.  **Text Match:** Filter programs by Course keywords (e.g., "Computer").
        3.  **Budget:** Filter by Tuition Fee (parsed from seed data).

*   **Scenario B: Discovery Mode (AI Search)**
    *   **Trigger:** When Country is "All" but a Course is specified.
    *   **Logic:** Uses **Vector Search** (`pgvector`).
    *   **Flow:**
        1.  User Query ("Artificial Intelligence") -> Embedding (Vector).
        2.  Cosine Similarity Search in Database -> Finds semantically similar programs (e.g., "Machine Learning", "Data Science").
    *   **Fallback:** If AI returns 0 results (API failure/low threshold), it automatically degrades to SQL Text Search (`ILIKE`) to prevent empty states.

### 2. RAG Chat Advisor (AI Chat)
The Chatbot is not a generic LLM. It is a **Retrieval-Augmented Generation (RAG)** system.

*   **Flow:**
    1.  **Input:** User asks "Is TU Munich cheap?"
    2.  **Retrieval:** System converts question to vector -> Queries `university_embeddings` table.
    3.  **Context:** Retrieves the specific row for "Technical University of Munich" (Tuition: €129, Rank: 50).
    4.  **Generation:** GPT-4 answers *using* that retrieved data as its source of truth.

---

## 🗄️ Database Schema (Supabase/PostgreSQL)

The system is built on **Supabase** with the `pgvector` extension.

### Tables
1.  **`universities`**
    *   `id`: UUID
    *   `name`: Text (Unique)
    *   `country`: Text
    *   `city`: Text
    *   `ranking_global`: Int
    *   `description`: Text (Summary)

2.  **`programs`**
    *   `id`: UUID
    *   `university_id`: FK -> universities
    *   `name`: Text (e.g., "MSc Computer Science")
    *   `tuition_fee`: Int (Normalized to USD/EUR value)
    *   `degree_level`: Text

3.  **`university_embeddings`**
    *   `id`: UUID
    *   `university_id`: FK -> universities
    *   `content_text`: Text (The raw text the AI "reads")
    *   `embedding`: vector(1536) (The mathematical representation)

---

## 🛠️ Data Pipeline (ETL)

We do not manually enter data. We use a **Seeding Script** (`scripts/seed_database.ts`) to process raw CSVs.

1.  **Input:** `university_rankings.csv` (Raw, messy data).
2.  **Cleaning:** 
    *   Normalizes Country names.
    *   Parses Tuition ranges ("$9,000 - $15,000" -> `9000`).
    *   Merges duplicate university rows into single "University" entries with multiple "Programs".
3.  **Embedding:** Calls OpenAI to generate vectors for each university context.
4.  **Upload:** Upserts data to Supabase using `upsert` (idempotent).

**Command to run ETL:**
```bash
npx tsx scripts/seed_database.ts
```

---

## 🚀 Setup & Installation

### Environment Variables
Create a `.env` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_public_key
SUPABASE_SERVICE_ROLE_KEY=your_secret_key (For Seeding only)
OPENROUTER_API_KEY=your_ai_key
```

### Installation
```bash
npm install
npm run dev
```

---

## 📅 Version History
*   **Initial Prototype:** Static JSON filtering.
*   **Production Upgrade:** Migrated to Supabase + pgvector. Implemented Hybrid Search Logic (SQL + AI). Added Markdown UI for Chat.