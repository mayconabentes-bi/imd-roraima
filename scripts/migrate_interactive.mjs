import { neon } from '@neondatabase/serverless';

// Tentando puxar a URL do processo (se rodado com dotenv) ou caindo no fallback estático
const dbUrl = process.env.VITE_NEON_DB_URL || 'postgresql://neondb_owner:npg_byL4jG3RrzSo@ep-green-haze-amgf3wga-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require';
const sql = neon(dbUrl);

async function migrateInteractiveFeatures() {
  console.log('🔗 Conectando ao Banco Postgres Serverless (Neon DB)...');

  try {
    console.log('📦 Criando tabela unit_comments...');
    await sql`
      CREATE TABLE IF NOT EXISTS unit_comments (
        id SERIAL PRIMARY KEY,
        unit_id VARCHAR(50) NOT NULL REFERENCES setrabes_units(id) ON DELETE CASCADE,
        author VARCHAR(100) NOT NULL,
        content TEXT NOT NULL,
        level VARCHAR(20) DEFAULT 'Normal',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('📁 Criando tabela unit_files...');
    await sql`
      CREATE TABLE IF NOT EXISTS unit_files (
        id SERIAL PRIMARY KEY,
        unit_id VARCHAR(50) NOT NULL REFERENCES setrabes_units(id) ON DELETE CASCADE,
        file_name VARCHAR(255) NOT NULL,
        file_type VARCHAR(50) NOT NULL,
        base64_data TEXT NOT NULL,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('✅ Tabelas criadas com sucesso! Seu banco agora suporta logs de Inteligência e Mídias Base64.');
  } catch (err) {
    console.error('❌ Erro durante a migração:', err);
  }
}

migrateInteractiveFeatures();
