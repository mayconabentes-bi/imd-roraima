import React, { useEffect, useState } from 'react';
import { type Bidding, fetchRRBiddings } from '../services/pncpApi';
import { RefreshCw, ExternalLink, Calendar, Landmark } from 'lucide-react';

export const BiddingFeed: React.FC = () => {
  const [biddings, setBiddings] = useState<Bidding[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchRRBiddings();
    setBiddings(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="glass-card bidding-feed">
      <div className="card-header">
        <div className="title-group">
          <h3>Monitor de Licitações (PNCP)</h3>
          <span className="live-badge">LIVE</span>
        </div>
        <button onClick={loadData} className="refresh-btn" disabled={loading}>
          <RefreshCw size={16} className={loading ? 'spinning' : ''} />
        </button>
      </div>

      <div className="feed-list">
        {loading && biddings.length === 0 ? (
          <div className="loading-state">Carregando feed em tempo real...</div>
        ) : (
          biddings.map((bid) => (
            <div key={bid.numeroControlePNCP} className="bid-item">
              <div className="bid-header">
                <span className="bid-mode">{bid.modalidadeNome}</span>
                <span className="bid-value">
                  {bid.valorEstimadoTotal ? 
                    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(bid.valorEstimadoTotal) 
                    : 'Valor não informado'}
                </span>
              </div>
              <p className="bid-object">{bid.objeto}</p>
              <div className="bid-footer">
                <div className="bid-meta">
                  <Landmark size={12} />
                  <span>{bid.orgaoEntidade.razaoSocial}</span>
                </div>
                <div className="bid-meta">
                  <Calendar size={12} />
                  <span>{new Date(bid.dataPublicacaoPncp).toLocaleDateString('pt-BR')}</span>
                </div>
                <button 
                  className="bid-link" 
                  onClick={() => window.open(`https://pncp.gov.br/app/editais/${bid.numeroControlePNCP}`, '_blank')}
                >
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .bidding-feed {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 400px;
          padding: 1.5rem;
        }

        .title-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .live-badge {
          background: #ef4444;
          color: white;
          font-size: 0.6rem;
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          font-weight: 900;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        .refresh-btn {
          background: var(--bg-accent);
          border: 1px solid var(--border-glass);
          color: var(--text-secondary);
          padding: 0.5rem;
          border-radius: 6px;
          cursor: pointer;
        }

        .spinning { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .feed-list {
          flex: 1;
          overflow-y: auto;
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding-right: 0.5rem;
        }

        .bid-item {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          border-radius: 8px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          transition: border-color 0.2s;
        }

        .bid-item:hover {
          border-color: var(--accent-cyan);
        }

        .bid-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .bid-mode {
          font-size: 0.7rem;
          color: var(--accent-cyan);
          text-transform: uppercase;
          font-weight: 700;
          background: rgba(0, 242, 255, 0.1);
          padding: 0.1rem 0.5rem;
          border-radius: 4px;
        }

        .bid-value {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 700;
        }

        .bid-object {
          font-size: 0.85rem;
          color: var(--text-primary);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .bid-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-glass);
          padding-top: 0.75rem;
          margin-top: 0.25rem;
        }

        .bid-meta {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.7rem;
          color: var(--text-secondary);
          max-width: 120px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .bid-link {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
        }

        .bid-link:hover { color: var(--accent-cyan); }

        .loading-state {
          text-align: center;
          padding: 2rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
      `}} />
    </div>
  );
};
