import React, { useState, useEffect } from 'react';
import { getLiveSetrabesUnits, type ServerlessUnit } from '../services/neonDb';
import { UnitModal } from './UnitModal';
import { 
  Search, 
  MapPin, 
  ShieldAlert, 
  Info,
  Filter,
  Loader2,
  Database
} from 'lucide-react';

export const SetrabesDirectory: React.FC = () => {
  const [units, setUnits] = useState<ServerlessUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedUnit, setSelectedUnit] = useState<ServerlessUnit | null>(null);

  const categories = ['Todos', 'Acolhimento', 'Segurança Alimentar', 'Especializada', 'Logística', 'Sede'];

  useEffect(() => {
    const fetchDB = async () => {
      setLoading(true);
      const data = await getLiveSetrabesUnits();
      setUnits(data);
      setLoading(false);
    };
    fetchDB();
  }, []);

  const filteredUnits = units.filter(unit => {
    const matchesSearch = unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (unit.address || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || unit.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="module-container">
      <header className="module-header">
        <div>
          <h1 className="gradient-text">Unidades Estratégicas SETRABES</h1>
          <p className="subtitle">Gestão de infraestrutura conectada ao vivo via PostgreSQL (Módulo Serverless).</p>
        </div>
        {!loading && (
          <div className="live-status">
            <div className="pulse-dot"></div>
            <span>NeonDB LIVE</span>
          </div>
        )}
      </header>

      <div className="directory-controls glass-card">
        <div className="search-box">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar por nome ou endereço..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <Filter size={20} className="filter-icon" />
          <div className="tabs">
            {categories.map(cat => (
              <button 
                key={cat}
                className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-state glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <Loader2 size={48} className="animate-spin text-cyan" style={{ margin: '0 auto 1rem' }} />
          <h3>Sincronizando com Banco de Dados</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Estabelecendo túnel seguro com PostgreSQL (US-EAST-1)...
          </p>
        </div>
      ) : (
        <div className="units-grid">
          {filteredUnits.length > 0 ? (
            filteredUnits.map((unit) => (
              <div key={unit.id} className="glass-card unit-card" onClick={() => setSelectedUnit(unit)}>
                <div className="unit-header">
                  <span className="unit-id">{unit.id}</span>
                  <span className={`category-badge ${unit.category.toLowerCase().replace(' ', '-')}`}>
                    {unit.category}
                  </span>
                </div>
                
                <h3>{unit.name}</h3>
                
                <div className="unit-info">
                  <div className="info-item">
                    <MapPin size={16} className="icon-blue" />
                    <span>{unit.address}</span>
                  </div>
                  <div className="info-item">
                    <Info size={16} className="icon-cyan" />
                    <p className="function-text">{unit.function_desc}</p>
                  </div>
                </div>

                <div className="risk-assessment">
                  <div className="assessment-header">
                    <ShieldAlert size={16} />
                    <span>Perfil de Risco & Justificativa</span>
                  </div>
                  <p>{unit.risk_profile}</p>
                </div>

                <div className="unit-footer">
                  <span className="public-served">Público: {unit.public_served}</span>
                  <button 
                    className="source-btn" 
                    onClick={(e) => { e.stopPropagation(); setSelectedUnit(unit); }}
                    title="Acessar Banco de Arquivos"
                  >
                    <Database size={14} />
                    Origem
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state glass-card">
              Nenhuma unidade encontrada para os filtros selecionados.
            </div>
          )}
        </div>
      )}

      {selectedUnit && (
        <UnitModal unit={selectedUnit} onClose={() => setSelectedUnit(null)} />
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .directory-controls {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .search-box {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-glass);
          border-radius: 12px;
          padding: 0.75rem 1.25rem;
          gap: 1rem;
        }

        .search-box input {
          background: transparent;
          border: none;
          color: var(--text-primary);
          width: 100%;
          font-size: 1rem;
          outline: none;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .filter-icon { color: var(--text-secondary); }

        .tabs {
          display: flex;
          gap: 0.75rem;
        }

        .tab-btn {
          background: transparent;
          border: 1px solid var(--border-glass);
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          border-radius: 99px;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.85rem;
        }

        .tab-btn.active {
          background: var(--accent-cyan);
          color: black;
          border-color: var(--accent-cyan);
          font-weight: 700;
        }

        .units-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .unit-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          border-bottom: 3px solid transparent;
          transition: transform 0.2s;
        }

        .unit-card:hover {
          transform: translateY(-4px);
          border-bottom-color: var(--accent-cyan);
        }

        .unit-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .unit-id {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .category-badge {
          font-size: 0.65rem;
          text-transform: uppercase;
          font-weight: 800;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          letter-spacing: 0.05em;
        }

        .category-badge.sede { background: #3b82f6; color: white; }
        .category-badge.acolhimento { background: #10b981; color: white; }
        .category-badge.segurança-alimentar { background: #f59e0b; color: white; }
        .category-badge.especializada { background: #8b5cf6; color: white; }
        .category-badge.logística { background: #6b7280; color: white; }

        .unit-info {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .info-item {
          display: flex;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .info-item span { line-height: 1.4; }
        .function-text { color: var(--text-primary); font-size: 0.85rem; }

        .risk-assessment {
          background: rgba(239, 68, 68, 0.05);
          border: 1px solid rgba(239, 68, 68, 0.1);
          padding: 1rem;
          border-radius: 8px;
        }

        .assessment-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #ef4444;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .risk-assessment p {
          font-size: 0.8rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .unit-footer {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid var(--border-glass);
        }

        .public-served {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-style: italic;
        }

        .source-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(0, 242, 255, 0.1);
          border: 1px solid rgba(0, 242, 255, 0.2);
          color: var(--accent-cyan);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          cursor: pointer;
        }

        @media (max-width: 640px) {
          .units-grid { grid-template-columns: 1fr; }
          .directory-controls { padding: 1rem; }
          .unit-card { padding: 1rem; }
        }
      `}} />
    </div>
  );
};
