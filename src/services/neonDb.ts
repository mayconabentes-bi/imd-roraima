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

export interface UnitComment {
  id: number;
  unit_id: string;
  author: string;
  content: string;
  level: 'Normal' | 'Atenção' | 'Urgente';
  created_at: string;
}

export interface UnitFile {
  id: number;
  unit_id: string;
  file_name: string;
  file_type: string;
  base64_data: string;
  uploaded_at: string;
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

/**
 * Busca Comentários de uma Unidade
 */
export async function getUnitComments(unitId: string): Promise<UnitComment[]> {
  try {
    const comments = await sql`SELECT * FROM unit_comments WHERE unit_id = ${unitId} ORDER BY created_at DESC`;
    return comments as UnitComment[];
  } catch (err) {
    console.error('Falha ao buscar comentários:', err);
    return [];
  }
}

/**
 * Adiciona um Comentário a uma Unidade (Limite 10)
 */
export async function addUnitComment(unitId: string, author: string, content: string, level: string = 'Normal'): Promise<boolean> {
  try {
    const current = await sql`SELECT count(*) FROM unit_comments WHERE unit_id = ${unitId}`;
    if (parseInt(current[0].count) >= 10) {
      alert('Limite de 10 comentários atingido para esta unidade.');
      return false;
    }
    await sql`
      INSERT INTO unit_comments (unit_id, author, content, level) 
      VALUES (${unitId}, ${author}, ${content}, ${level})
    `;
    return true;
  } catch (err) {
    console.error('Erro ao adicionar comentário:', err);
    return false;
  }
}

/**
 * Busca Resumo dos Arquivos (Sem retornar Base64 imediatamente para economizar banda até o clique)
 */
export async function getUnitFilesSummary(unitId: string): Promise<UnitFile[]> {
  try {
    // Select sem o array completo de Base64 para exibir a lista rápido
    const files = await sql`SELECT id, unit_id, file_name, file_type, uploaded_at, '' as base64_data FROM unit_files WHERE unit_id = ${unitId} ORDER BY uploaded_at DESC`;
    return files as UnitFile[];
  } catch (err) {
    console.error('Falha ao buscar arquivos:', err);
    return [];
  }
}

/**
 * Busca o arquivo completo em Base64
 */
export async function getUnitFileBase64(fileId: number): Promise<string | null> {
  try {
    const res = await sql`SELECT base64_data FROM unit_files WHERE id = ${fileId} LIMIT 1`;
    return res.length > 0 ? res[0].base64_data : null;
  } catch(err) {
    console.error('Erro ao baixar Base64:', err);
    return null;
  }
}

/**
 * Adiciona um Arquivo Base64 (Limiite 50)
 */
export async function addUnitFile(unitId: string, fileName: string, fileType: string, base64Data: string): Promise<boolean> {
  try {
    const current = await sql`SELECT count(*) FROM unit_files WHERE unit_id = ${unitId}`;
    if (parseInt(current[0].count) >= 50) {
      alert('Limite de 50 arquivos atingido para esta unidade.');
      return false;
    }
    await sql`
      INSERT INTO unit_files (unit_id, file_name, file_type, base64_data) 
      VALUES (${unitId}, ${fileName}, ${fileType}, ${base64Data})
    `;
    return true;
  } catch (err) {
    console.error('Erro ao adicionar arquivo:', err);
    return false;
  }
}
