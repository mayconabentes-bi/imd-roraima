import React from 'react';
import { secretariatStats, incidents } from '../data/stats';
import { Users, Landmark, AlertTriangle, MapPin } from 'lucide-react';

export const StatsDashboard: React.FC = () => {
  return (
    <div className="module-container">
      <header className="module-header">
        <div>
          <h1 className="gradient-text">Dados & Estatísticas</h1>
          <p className="subtitle">Análise orçamentária, funcional e de ocorrências por órgão.</p>
        </div>
      </header>

      <section className="stats-grid">
        {secretariatStats.map((sec) => (
          <div key={sec.id} className="glass-card sec-card">
            <div className="sec-header">
              <div className="acronym">{sec.acronym}</div>
              <span className="type-badge">{sec.type}</span>
            </div>
            <h3>{sec.name}</h3>
            
            <div className="sec-metrics">
              <div className="metric">
                <Users size={16} />
                <div className="metric-info">
                  <span className="label">Funcionários</span>
                  <span className="value">{sec.employees.toLocaleString()}</span>
                </div>
              </div>
              <div className="metric">
                <Landmark size={16} />
                <div className="metric-info">
                  <span className="label">Orçamento 2025</span>
                  <span className="value">R$ {(sec.budget2025 / 1000000).toFixed(0)}M</span>
                </div>
              </div>
            </div>

            <div className="sec-locations">
              <MapPin size={14} />
              <span>{sec.locations.join(' • ')}</span>
            </div>

            <div className="security-justification">
              <h4>Justificativa de Segurança</h4>
              <p>{sec.justificationForSecurity}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="incidents-section">
        <h2 className="section-title">
          <AlertTriangle size={20} color="#f59e0b" />
          Mapa de Incidentes Recentes
        </h2>
        <div className="incident-table glass-card">
          <div className="table-header">
            <span>Data</span>
            <span>Tipo</span>
            <span>Localização</span>
            <span>Impacto</span>
          </div>
          {incidents.map((incident) => (
            <div key={incident.id} className="table-row">
              <span className="date">{new Date(incident.date).toLocaleDateString()}</span>
              <span className="type">{incident.type}</span>
              <span className="loc">{incident.location}</span>
              <span className="impact">
                <div className="impact-bar">
                  <div 
                    className="impact-fill" 
                    style={{ 
                      width: `${incident.impactScore * 10}%`,
                      backgroundColor: incident.impactScore > 7 ? '#ef4444' : '#f59e0b'
                    }} 
                  />
                </div>
              </span>
            </div>
          ))}
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1.5rem;
        }

        .sec-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .sec-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .acronym {
          font-family: var(--font-mono);
          background: var(--bg-accent);
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          color: var(--accent-cyan);
          font-weight: 700;
        }

        .type-badge {
          font-size: 0.7rem;
          text-transform: uppercase;
          opacity: 0.6;
          letter-spacing: 0.1em;
        }

        .sec-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
        }

        .metric {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-secondary);
        }

        .metric-info {
          display: flex;
          flex-direction: column;
        }

        .metric-info .label {
          font-size: 0.7rem;
          text-transform: uppercase;
        }

        .metric-info .value {
          color: var(--text-primary);
          font-weight: 700;
          font-size: 1rem;
        }

        .sec-locations {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .security-justification {
          border-top: 1px solid var(--border-glass);
          padding-top: 1rem;
        }

        .security-justification h4 {
          font-size: 0.8rem;
          color: var(--accent-cyan);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .security-justification p {
          font-size: 0.85rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .incidents-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
        }

        .incident-table {
          width: 100%;
          overflow: hidden;
        }

        .table-header, .table-row {
          display: grid;
          grid-template-columns: 120px 100px 1fr 150px;
          padding: 1rem 1.5rem;
          align-items: center;
        }

        .table-header {
          background: rgba(255,255,255,0.05);
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          color: var(--text-secondary);
        }

        .table-row {
          border-top: 1px solid var(--border-glass);
          font-size: 0.9rem;
        }

        .table-row:hover {
          background: rgba(255,255,255,0.02);
        }

        .impact-bar {
          width: 100%;
          height: 6px;
          background: var(--bg-accent);
          border-radius: 99px;
          overflow: hidden;
        }

        .impact-fill {
          height: 100%;
          transition: width 1s ease-out;
        }
      `}} />
    </div>
  );
};
