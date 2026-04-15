/**
 * PNCP (Portal Nacional de Contratações Públicas) API Service
 * Centralizing bidding and tender data for Roraima State.
 */

export interface BidingDocument {
  titulo: string;
  url: string;
}

export interface Bidding {
  id: string;
  numero: string;
  ano: number;
  orgao: string;
  objeto: string;
  valor: number;
  dataPublicacao: string;
  status: string;
  tipo: 'Licitação' | 'Ata de Registro de Preço' | 'Contrato';
  link: string;
  documentos?: BidingDocument[];
}

const BASE_URL = 'https://pncp.gov.br/api/consulta/v1';

export async function fetchRRBiddings(page = 1, size = 10): Promise<Bidding[]> {
  try {
    // Fetching main biddings (contratacoes) for RR
    const response = await fetch(`${BASE_URL}/contratacoes?uf=RR&pagina=${page}&tamanhoPagina=${size}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) throw new Error('Falha ao conectar com PNCP');

    const data = await response.json();
    
    return data.data.map((item: any) => ({
      id: item.id,
      numero: item.numeroControlePNCP,
      ano: item.anoCompra,
      orgao: item.orgaoEntidade.razaoSocial,
      objeto: item.objetoCompra,
      valor: item.valorEstimadoTotal || 0,
      dataPublicacao: item.dataPublicacaoPncp,
      status: item.situacaoCompraNome,
      tipo: 'Licitação',
      link: `https://pncp.gov.br/app/editais/${item.orgaoEntidade.cnpj}/${item.anoCompra}/${item.sequencialCompra}`
    }));
  } catch (error) {
    console.error('PNCP API Error:', error);
    return []; // Return empty on failure for safety
  }
}

export async function fetchRRAtas(page = 1, size = 10): Promise<Bidding[]> {
  try {
    // Fetching ARP (Atas de Registro de Preço) for RR
    const response = await fetch(`${BASE_URL}/atas?uf=RR&pagina=${page}&tamanhoPagina=${size}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) throw new Error('Falha ao conectar com PNCP ARPs');

    const data = await response.json();
    
    return data.data.map((item: any) => ({
      id: item.id,
      numero: item.numeroAtaRegistroPreco,
      ano: item.anoAta,
      orgao: item.orgaoEntidade.razaoSocial,
      objeto: item.objetoAta,
      valor: item.valorTotalEstimado || 0,
      dataPublicacao: item.dataPublicacaoPncp,
      status: 'Vigente',
      tipo: 'Ata de Registro de Preço',
      link: `https://pncp.gov.br/app/atas/${item.orgaoEntidade.cnpj}/${item.anoAta}/${item.sequencialAta}`
    }));
  } catch (error) {
    console.error('PNCP ARPs API Error:', error);
    return [];
  }
}

/**
 * Intelligent combined search for Roraima Tenders
 */
export async function searchTenders(query: string): Promise<Bidding[]> {
  const [biddings, atas] = await Promise.all([
    fetchRRBiddings(1, 20),
    fetchRRAtas(1, 20)
  ]);

  const combined = [...biddings, ...atas];
  
  if (!query) return combined;

  return combined.filter(item => 
    item.objeto.toLowerCase().includes(query.toLowerCase()) ||
    item.orgao.toLowerCase().includes(query.toLowerCase())
  );
}
