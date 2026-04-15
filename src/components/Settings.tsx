import React from 'react';
import { dataSources } from '../data/finance';
import { 
  ExternalLink, 
  Database,
  Globe,
  Lock,
  Cpu
} from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="module-container">
      <header className="module-header">
        <div>
          <h1 className="gradient-text">Configurações & Transparência</h1>
          <p className="subtitle">Fontes de dados, APIs e conexões que alimentam a inteligência do sistema.</p>
        </div>
      </header>

      <div className="settings-grid">
        <section className="glass-card sources-panel">
          <div className="card-header">
            <h3>Fontes de Inteligência (Data Ingestion)</h3>
            <Database size={18} color="var(--accent-cyan)" />
          </div>
          <div className="sources-list">
            {dataSources.map((source) => (
              <div key={source.name} className="source-record">
                <div className="source-main">
                  <div className="source-icon">
                    <Globe size={16} />
                  </div>
                  <div className="source-info">
                    <h4>{source.name}</h4>
                    <span className="source-type">{source.type}</span>
                  </div>
                  <button className="link-btn" onClick={() => window.open(source.url, '_blank')}>
                    <ExternalLink size={14} />
                  </button>
                </div>
                <p className="source-desc">{source.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="settings-sideboards">
          <section className="glass-card status-panel">
            <div className="card-header">
              <h3>Status das Conexões</h3>
              <Cpu size={18} color="#10b981" />
            </div>
            <div className="status-metrics">
              <div className="status-item">
                <span>PNCP API</span>
                <span className="status-badge online">ONLINE</span>
              </div>
              <div className="status-item">
                <span>Transparência RR</span>
                <span className="status-badge online">ONLINE</span>
              </div>
              <div className="status-item">
                <span>Siconfi Connector</span>
                <span className="status-badge standby">STANDBY</span>
              </div>
            </div>
          </section>

          <section className="glass-card security-panel">
            <div className="card-header">
              <h3>Privacidade & Segurança</h3>
              <Lock size={18} color="#f59e0b" />
            </div>
            <div className="security-info">
              <p>Este BI processa dados em conformidade com a <strong>LGPD (Lei 13.709/2018)</strong>.</p>
              <ul className="security-list">
                <li>Criptografia ponta-a-ponta.</li>
                <li>Parsing de dados públicos sem identificação pessoal.</li>
                <li>Armazenamento local seguro.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .settings-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        .sources-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .source-record {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          border-radius: 12px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          transition: border-color 0.2s;
        }

        .source-record:hover { border-color: var(--accent-cyan); }

        .source-main {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .source-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--bg-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-cyan);
        }

        .source-info { flex: 1; }
        .source-info h4 { font-size: 0.95rem; margin: 0; }
        .source-type { font-size: 0.7rem; color: var(--accent-cyan); text-transform: uppercase; font-weight: 700; }

        .link-btn {
          background: var(--bg-accent);
          border: none;
          color: var(--text-secondary);
          padding: 0.5rem;
          border-radius: 6px;
          cursor: pointer;
        }

        .link-btn:hover { color: var(--accent-cyan); }

        .source-desc { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; }

        .settings-sideboards {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .status-metrics {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }

        .status-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .status-badge {
          font-size: 0.65rem;
          font-weight: 900;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
        }

        .status-badge.online { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .status-badge.standby { background: rgba(107, 114, 128, 0.1); color: #6b7280; }

        .security-info p { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1rem; }
        .security-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .security-list li {
          font-size: 0.8rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .security-list li::before { content: '•'; color: var(--accent-cyan); font-weight: 900; }

        @media (max-width: 1024px) {
          .settings-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
};
