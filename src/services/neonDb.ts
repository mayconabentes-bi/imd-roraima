import { neon } from '@neondatabase/serverless';

// Em ambiente Vite, as variáveis de ambiente com prefixo VITE_ ficam disponíveis via import.meta.env
// Como esse é um projeto público no GitHub Pages e a senha está hardcoded via import.meta.env, 
// a recomendação futura é usar Row Level Security (RLS) se a base de dados crescer.
const sql = neon(import.meta.env.VITE_NEON_DB_URL || 'postgresql://neondb_owner:npg_byL4jG3RrzSo@ep-green-haze-amgf3wga-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require');

export interface ServerlessUnit {
  id: string;
  name: string;
  address: string;
  function_desc: string;
  public_served: string;
  risk_profile: string;
  category: string;
  source_url: string;
  created_at?: string;
}

/**
 * Busca ao vivo no Banco de Dados Postgres (US-EAST-1 AWS)
 */
export async function getLiveSetrabesUnits(): Promise<ServerlessUnit[]> {
  try {
    const rawUnits = await sql`SELECT * FROM setrabes_units ORDER BY id ASC`;
    return rawUnits as ServerlessUnit[];
  } catch (err) {
    console.error('Falha ao consultar Banco Postgres Serverless:', err);
    return [];
  }
}
