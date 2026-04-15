import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:npg_byL4jG3RrzSo@ep-green-haze-amgf3wga-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require');

const units = [
  {
    id: '0.2.1',
    name: 'SEDE SETRABES',
    address: 'Av. Mário Homem de Melo, 2310, Mecejana, Boa Vista - RR',
    function_desc: 'Gestão central de políticas de assistência, trabalho e renda.',
    publicServed: 'Cidadãos em geral, servidores e gestores.',
    riskProfile: 'Alta circulação de público, guarda de dados sensíveis e processos administrativos críticos.',
    category: 'Sede',
    sourceUrl: 'https://portal.rr.gov.br'
  },
  {
    id: '0.2.2',
    name: 'CASA DO TRABALHADOR (SINE-RR)',
    address: 'Av. Mário Homem de Melo, 2310, Mecejana (Anexo Sede)',
    function_desc: 'Intermediação de mão de obra e seguro desemprego.',
    publicServed: 'Trabalhadores e empregadores.',
    riskProfile: 'Grandes filas e fluxo constante de pessoas em busca de emprego.',
    category: 'Especializada',
    sourceUrl: 'https://portal.rr.gov.br'
  },
  {
    id: '0.2.3',
    name: 'ABRIGO INFANTIL (Viva Criança)',
    address: 'Rua Monte Roraima, bairro São Vicente, Boa Vista - RR',
    function_desc: 'Acolhimento institucional de crianças em situação de risco.',
    publicServed: 'Crianças de 0 a 12 anos.',
    riskProfile: 'Proteção de menores sob custódia do estado; exige controle rigoroso de acesso.',
    category: 'Acolhimento',
    sourceUrl: 'https://folhabv.com.br'
  },
  {
    id: '0.2.4',
    name: 'ABRIGO DE MARIA',
    address: 'Localização protegida, Boa Vista - RR',
    function_desc: 'Acolhimento de mulheres em situação de vulnerabilidade extrema.',
    publicServed: 'Mulheres e seus dependentes.',
    riskProfile: 'Unidade sensível; proteção contra agressores e preservação da integridade física.',
    category: 'Acolhimento',
    sourceUrl: 'https://portal.rr.gov.br'
  },
  {
    id: '0.2.5',
    name: 'ABRIGO FEMININO',
    address: 'Bairro Liberdade, Boa Vista - RR',
    function_desc: 'Acolhimento institucional para o público feminino.',
    publicServed: 'Adolescentes e mulheres jovens.',
    riskProfile: 'Controle de acesso para proteção de vulneráveis.',
    category: 'Acolhimento',
    sourceUrl: 'https://transparencia.rr.gov.br'
  },
  {
    id: '0.2.6',
    name: 'ABRIGO MASCULINO',
    address: 'Bairro Pintolândia, Boa Vista - RR',
    function_desc: 'Acolhimento institucional para o público masculino.',
    publicServed: 'Adolescentes em situação de risco social.',
    riskProfile: 'Monitoramento preventivo contra conflitos e evasão.',
    category: 'Acolhimento',
    sourceUrl: 'https://transparencia.rr.gov.br'
  },
  {
    id: '0.2.7',
    name: 'CASA DE PASSAGEM',
    address: 'Centro, Boa Vista - RR',
    function_desc: 'Acolhimento temporário de curta duração.',
    publicServed: 'Pessoas em situação de rua e migrantes.',
    riskProfile: 'Alta rotatividade e fluxo imprevisível de usuários.',
    category: 'Acolhimento',
    sourceUrl: 'https://transparencia.rr.gov.br'
  },
  {
    id: '0.2.8',
    name: 'CENTRO SÓCIO EDUCATIVO (CSE)',
    address: 'RR-321 (Bom Intento), KM 02, Boa Vista - RR',
    function_desc: 'Custódia e ressocialização de adolescentes em conflito com a lei.',
    publicServed: 'Adolescentes (12 a 21 anos).',
    riskProfile: 'Unidade prisional de menor; risco de motins, invasões e necessidade de monitoramento 24h.',
    category: 'Especializada',
    sourceUrl: 'https://folhabv.com.br'
  },
  {
    id: '0.2.9',
    name: 'REDE CIDADANIA UNIDADE ESPECIAL',
    address: 'Av. São Sebastião, 1195, Santa Tereza, Boa Vista - RR',
    function_desc: 'Atendimento a pessoas com deficiência e necessidades especiais.',
    publicServed: 'Pessoas com deficiência (PcD).',
    riskProfile: 'Patrimônio tecnológico e segurança de pacientes com mobilidade reduzida.',
    category: 'Especializada',
    sourceUrl: 'https://jornalopainel.com'
  },
  {
    id: '0.2.10',
    name: 'REDE CIDADANIA MELHOR IDADE',
    address: 'Rua Cabo PM Lawrence de Melo, 762, Caranã, Boa Vista - RR',
    function_desc: 'Promoção do envelhecimento ativo e acolhimento de idosos.',
    publicServed: 'Idosos (60+ anos).',
    riskProfile: 'Vulnerabilidade física dos usuários e guarda de prontuários médicos.',
    category: 'Acolhimento',
    sourceUrl: 'https://portal.rr.gov.br'
  },
  {
    id: '0.2.11',
    name: 'CASA DOS CONSELHOS',
    address: 'Av. Mário Homem de Melo, 2310 (Anexo Sede)',
    function_desc: 'Sede dos conselhos estaduais (Direitos Humanos, Idoso, Criança).',
    publicServed: 'Conselheiros e sociedade civil.',
    riskProfile: 'Guarda de atas, denúncias e documentos sigilosos de direitos humanos.',
    category: 'Sede',
    sourceUrl: 'https://portal.rr.gov.br'
  },
  {
    id: '0.2.12',
    name: 'CASA DA MULHER BRASILEIRA',
    address: 'Rua Uraricoera, 919, São Vicente, Boa Vista - RR',
    function_desc: 'Atendimento integrado a mulheres vítimas de violência.',
    publicServed: 'Mulheres em situação de violência.',
    riskProfile: 'Unidade de segurança máxima; presença de delegacia, MP e Judiciário no local.',
    category: 'Especializada',
    sourceUrl: 'https://portal.rr.gov.br'
  },
  {
    id: '0.2.13',
    name: 'CAI 18 DE MAIO',
    address: 'Boa Vista - RR (Inaugurada em 2026)',
    function_desc: 'Atendimento integrado a crianças e adolescentes vítimas de violência sexual.',
    publicServed: 'Crianças e adolescentes (3 a 18 anos).',
    riskProfile: 'Risco extremo de revitimização e extrema sensibilidade jurídica das oitivas.',
    category: 'Especializada',
    sourceUrl: 'https://atricon.org.br'
  },
  {
    id: '0.2.14',
    name: 'CENTRO ESTADUAL DE ECOTERAPIA',
    address: 'Parque Dandãezinho, zona rural de Boa Vista - RR',
    function_desc: 'Reabilitação biopsicossocial utilizando cavalos.',
    publicServed: 'Pessoas com deficiência e distúrbios neurológicos.',
    riskProfile: 'Controle de perímetro rural e segurança de animais e equipamentos terapêuticos.',
    category: 'Especializada',
    sourceUrl: 'https://folhabv.com.br'
  },
  {
    id: '0.2.15',
    name: 'CASA VILA JARDIM',
    address: 'Residencial Vila Jardim, bairro Cidade Satélite, Boa Vista - RR',
    function_desc: 'Centro de atendimento social em área de vulnerabilidade urbana.',
    publicServed: 'Moradores do Conjunto Vila Jardim.',
    riskProfile: 'Área com altos índices de criminalidade; exige proteção para servidores.',
    category: 'Especializada',
    sourceUrl: 'https://portal.rr.gov.br'
  },
  {
    id: '0.2.16',
    name: 'CEAC VALDENHILTON GOMES',
    address: 'Bairro Senador Hélio Campos, Boa Vista - RR',
    function_desc: 'Centro de Atendimento ao Cidadão e serviços sociais.',
    publicServed: 'População da Zona Oeste de Boa Vista.',
    riskProfile: 'Alta demanda por serviços; risco de furtos e vandalismo em prédios públicos.',
    category: 'Especializada',
    sourceUrl: 'https://portal.rr.gov.br'
  },
  {
    id: '0.2.17',
    name: 'CASA DE PASSAGEM 13 DE SETEMBRO',
    address: 'Bairro 13 de Setembro, Boa Vista - RR',
    function_desc: 'Unidade de apoio provisório para migrantes e crianças.',
    publicServed: 'Crianças e famílias migrantes.',
    riskProfile: 'Área de fronteira urbana e vulnerabilidade extrema.',
    category: 'Acolhimento',
    sourceUrl: 'https://roraimaemfoco.com'
  },
  {
    id: '0.2.18',
    name: 'DSG (Unidade 01)',
    address: 'Av. Mário Homem de Melo, Boa Vista - RR',
    function_desc: 'Divisão de Serviços Gerais e Manutenção.',
    publicServed: 'Gestão Interna (Apoio Logístico).',
    riskProfile: 'Guarda de ferramentas, materiais de construção e equipamentos de manutenção.',
    category: 'Logística',
    sourceUrl: 'https://portal.rr.gov.br'
  },
  {
    id: '0.2.19',
    name: 'DSG (Unidade 02 - Depósito)',
    address: 'Distrito Industrial, Boa Vista - RR',
    function_desc: 'Depósito Central de Materiais.',
    publicServed: 'Gestão Interna.',
    riskProfile: 'Alto risco de roubo de carga e insumos patrimoniais.',
    category: 'Logística',
    sourceUrl: 'https://portal.rr.gov.br'
  },
  {
    id: '0.2.21',
    name: 'RESTAURANTE CIDADÃO 01 (Silvio Botelho)',
    address: 'Av. Nazaré Filgueiras, 940, Boa Vista - RR',
    function_desc: 'Segurança Alimentar e Nutricional.',
    publicServed: 'Famílias vulneráveis e pessoas em situação de rua.',
    riskProfile: 'Controle de grandes aglomerações e proteção de insumos alimentícios.',
    category: 'Segurança Alimentar',
    sourceUrl: 'https://folhabv.com.br'
  },
  {
    id: '0.2.22',
    name: 'RESTAURANTE CIDADÃO 02 (Sen. Hélio Campos)',
    address: 'Rua Laura Pinheiro Maia, 225, Boa Vista - RR',
    function_desc: 'Segurança Alimentar e Nutricional.',
    publicServed: 'Famílias cadastradas no programa.',
    riskProfile: 'Controle de filas e proteção patrimonial.',
    category: 'Segurança Alimentar',
    sourceUrl: 'https://folhabv.com.br'
  },
  {
    id: '0.2.23',
    name: 'RESTAURANTE CIDADÃO 03 (Cidade Satélite)',
    address: 'Av. das Galáxias, 1356, Boa Vista - RR',
    function_desc: 'Segurança Alimentar e Nutricional.',
    publicServed: 'Moradores do bairro Cidade Satélite.',
    riskProfile: 'Operação diária com alto fluxo de usuários.',
    category: 'Segurança Alimentar',
    sourceUrl: 'https://folhabv.com.br'
  },
  {
    id: '0.2.24',
    name: 'RESTAURANTE CIDADÃO 04 (Nova Cidade)',
    address: 'Rua Belo Horizonte, 113, Boa Vista - RR',
    function_desc: 'Segurança Alimentar e Nutricional.',
    publicServed: 'Moradores do bairro Nova Cidade.',
    riskProfile: 'Proteção de instalações de cozinha industrial e depósitos.',
    category: 'Segurança Alimentar',
    sourceUrl: 'https://folhabv.com.br'
  },
  {
    id: '0.2.25',
    name: 'RESTAURANTE CIDADÃO 05 (Jardim Primavera)',
    address: 'Lote 225, Quadra 379, Zona 12, Boa Vista - RR',
    function_desc: 'Segurança Alimentar e Nutricional.',
    publicServed: 'Comunidade local.',
    riskProfile: 'Ponto sensível de assistência social.',
    category: 'Segurança Alimentar',
    sourceUrl: 'https://folhabv.com.br'
  },
  {
    id: '0.2.26',
    name: 'RESTAURANTE CIDADÃO 06 (Centro)',
    address: 'Av. Getúlio Vargas, 6258, Boa Vista - RR',
    function_desc: 'Segurança Alimentar e Nutricional.',
    publicServed: 'Pessoas em situação de vulnerabilidade no centro.',
    riskProfile: 'Visibilidade política e alto fluxo urbano.',
    category: 'Segurança Alimentar',
    sourceUrl: 'https://folhabv.com.br'
  },
  {
    id: '0.2.27',
    name: 'CCGL - LOGÍSTICA',
    address: 'Av. Mário Homem de Melo, 2310, Mecejana',
    function_desc: 'Coordenação Geral de Logística do Estado.',
    publicServed: 'Administração Pública.',
    riskProfile: 'Gestão da frota estadual e suprimentos críticos de logística governamental.',
    category: 'Logística',
    sourceUrl: 'https://portal.rr.gov.br'
  }
];

async function seedDatabase() {
  console.log('Criando tabela setrabes_units no NeonDB...');
  
  await sql`
    CREATE TABLE IF NOT EXISTS setrabes_units (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(500),
      function_desc TEXT,
      public_served VARCHAR(500),
      risk_profile TEXT,
      category VARCHAR(100),
      source_url VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  console.log('Deletando registros antigos para evitar duplicação...');
  await sql`DELETE FROM setrabes_units`;

  console.log('Inserindo 27 unidades no banco de dados da nuvem...');
  
  for (const u of units) {
    await sql`
      INSERT INTO setrabes_units (
        id, name, address, function_desc, public_served, risk_profile, category, source_url
      ) VALUES (
        ${u.id}, ${u.name}, ${u.address}, ${u.function_desc}, ${u.publicServed}, ${u.riskProfile}, ${u.category}, ${u.sourceUrl}
      )
    `;
  }
  
  console.log('✅ Migração concluída com sucesso!');
}

seedDatabase().catch(console.error);
