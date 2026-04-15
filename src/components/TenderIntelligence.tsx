import React, { useState, useEffect } from 'react';
import { type Bidding, searchTenders } from '../services/pncpApi';
import { 
  Search, 
  Download, 
  ExternalLink, 
  Loader2, 
  Filter,
  Calendar,
  Landmark,
  AlertCircle
} from 'lucide-react';

export const TenderIntelligence: React.FC = () => {
  const [tenders, setTenders] = useState<Bidding[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'Todos' | 'Licitação' | 'Ata de Registro de Preço'>('Todos');

  useEffect(() => {
    loadTenders();
  }, []);

  const loadTenders = async () => {
    setLoading(true);
    const data = await searchTenders('');
    setTenders(data);
    setLoading(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    const data = await searchTenders(searchTerm);
    setTenders(data);
    setLoading(false);
  };

  const filteredTenders = tenders.filter(t => 
    activeFilter === 'Todos' || t.tipo === activeFilter
  );

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="module-container">
      <header className="module-header">
        <div>
          <h1 className="gradient-text">Market Intelligence: Licitações & Atas</h1>
          <p className="subtitle">Monitoramento avançado de compras públicas e registros de preços em Roraima.</p>
        </div>
        <div className="live-status">
          <div className="pulse-dot"></div>
          <span>API PNCP LIVE</span>
        </div>
      </header>

      <div className="search-advanced glass-card">
        <div className="search-row">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar por objeto (ex: Obras, Medicamentos, Informática)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button className="primary-btn" onClick={handleSearch} disabled={loading}>
            {loading ? <Loader2 size={18} className="animate-spin" /> : 'Consultar Base'}
          </button>
        </div>

        <div className="filter-row">
          <Filter size={18} className="text-cyan" />
          <div className="tabs mini">
            {['Todos', 'Licitação', 'Ata de Registro de Preço'].map(f => (
              <button 
                key={f}
                className={`tab-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f as any)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <Loader2 size={48} className="animate-spin text-cyan" />
          <p>Realizando scraping avançado na base do Governo Federal...</p>
        </div>
      ) : (
        <div className="tender-results grid">
          {filteredTenders.length > 0 ? (
            filteredTenders.map((tender) => (
              <div key={tender.id} className="glass-card tender-card clickable" onClick={() => window.open(tender.link, '_blank')}>
                <div className="tender-badge-row">
                  <span className={`type-tag ${tender.tipo.toLowerCase().replace(/ /g, '-')}`}>
                    {tender.tipo === 'Ata de Registro de Preço' ? 'ARP' : 'LICITAÇÃO'}
                  </span>
                  <span className="tender-date">
                    <Calendar size={14} />
                    {new Date(tender.dataPublicacao).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                <div className="tender-body">
                  <h3 className="tender-title" title={tender.objeto}>{tender.objeto}</h3>
                  <div className="tender-meta">
                    <div className="meta-item">
                      <Landmark size={14} />
                      <span>{tender.orgao}</span>
                    </div>
                  </div>
                </div>

                <div className="tender-footer">
                  <div className="tender-price">
                    <span className="label">Valor Estimado</span>
                    <span className="value">{formatCurrency(tender.valor)}</span>
                  </div>
                  <div className="tender-actions">
                    <button className="icon-btn" title="Ver no Portal">
                      <ExternalLink size={18} />
                    </button>
                    <button className="icon-btn download" title="Documentos em PDF">
                      <Download size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state glass-card">
              <AlertCircle size={48} className="text-warning" />
              <h3>Nenhum resultado encontrado</h3>
              <p>Tente ajustar os termos da sua busca ou resetar os filtros.</p>
              <button className="secondary-btn" onClick={() => {setSearchTerm(''); loadTenders();}}>Limpar Busca</button>
            </div>
          )}
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .search-advanced {
          padding: 1.5rem;
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .search-row {
          display: flex;
          gap: 1rem;
        }

        .search-input-wrapper {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-glass);
          border-radius: 12px;
          display: flex;
          align-items: center;
          padding: 0 1.25rem;
          gap: 1rem;
        }

        .search-input-wrapper input {
          background: transparent;
          border: none;
          color: white;
          width: 100%;
          height: 50px;
          outline: none;
          font-size: 1rem;
        }

        .filter-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .tabs.mini .tab-btn {
          padding: 0.4rem 1rem;
          font-size: 0.8rem;
          border-radius: 6px;
        }

        .tender-results {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1.5rem;
        }

        .tender-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          transition: transform 0.2s, border-color 0.2s;
          border-left: 4px solid transparent;
        }

        .tender-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-cyan);
          background: rgba(255,255,255,0.08);
        }

        .tender-badge-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .type-tag {
          font-size: 0.65rem;
          font-weight: 900;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          letter-spacing: 0.05em;
        }

        .type-tag.licitação { background: rgba(59, 130, 246, 0.2); color: #3b82f6; border: 1px solid #3b82f6; }
        .type-tag.arp { background: rgba(16, 185, 129, 0.2); color: #10b981; border: 1px solid #10b981; }

        .tender-date {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .tender-title {
          font-size: 1.05rem;
          line-height: 1.4;
          height: 2.8em;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-bottom: 0.5rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .tender-footer {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-top: 1rem;
          border-top: 1px solid var(--border-glass);
        }

        .tender-price .label {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-bottom: 0.2rem;
        }

        .tender-price .value {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--accent-cyan);
          font-family: var(--font-mono);
        }

        .tender-actions {
          display: flex;
          gap: 0.75rem;
        }

        .icon-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-glass);
          color: var(--text-secondary);
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .icon-btn:hover { color: white; background: var(--bg-accent); }
        .icon-btn.download:hover { color: var(--accent-cyan); border-color: var(--accent-cyan); }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          gap: 1.5rem;
          color: var(--text-secondary);
        }

        .live-status {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          background: rgba(255,255,255,0.05);
          padding: 0.5rem 1rem;
          border-radius: 99px;
          border: 1px solid var(--border-glass);
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        @media (max-width: 768px) {
          .search-row { flex-direction: column; }
          .tender-results { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
};
