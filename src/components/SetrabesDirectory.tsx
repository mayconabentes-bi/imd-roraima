import React, { useState, useEffect } from 'react';
import { getLiveSetrabesUnits, getUnitsIntelligenceSummary, type ServerlessUnit } from '../services/neonDb';
import { UnitModal } from './UnitModal';
import { 
  Search, 
  MapPin, 
  Filter,
  Loader2,
  FileText,
  MessageSquare,
  Plus
} from 'lucide-react';

export const SetrabesDirectory: React.FC = () => {
  const [units, setUnits] = useState<ServerlessUnit[]>([]);
  const [intelligence, setIntelligence] = useState<Record<string, { files: number, comments: number }>>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedUnit, setSelectedUnit] = useState<ServerlessUnit | null>(null);

  const categories = ['Todos', 'Acolhimento', 'Segurança Alimentar', 'Especializada', 'Logística', 'Sede'];

  const fetchData = async () => {
    setLoading(true);
    try {
      const [unitsData, intelData] = await Promise.all([
        getLiveSetrabesUnits(),
        getUnitsIntelligenceSummary()
      ]);
      setUnits(unitsData);
      setIntelligence(intelData);
    } catch (err) {
      console.error('Erro ao carregar diretório:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
          <p className="subtitle">Gestão Governamental de Infraestrutura e Inteligência de Dados (PostgreSQL).</p>
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
            placeholder="Buscar por unidade, endereço ou categoria..." 
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
        <div className="loading-state glass-card" style={{ padding: '4rem', textAlign: 'center' }}>
          <Loader2 size={48} className="animate-spin text-cyan" style={{ margin: '0 auto 1rem' }} />
          <h3>Sincronizando Inteligência...</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Acessando base de dados serverless em US-EAST-1...</p>
        </div>
      ) : (
        <div className="units-grid">
          {filteredUnits.length > 0 ? (
            filteredUnits.map((unit) => (
              <div key={unit.id} className="glass-card unit-card" onClick={() => setSelectedUnit(unit)}>
                <div className="unit-header">
                  <div className="unit-id-group">
                    <span className="unit-id">{unit.id}</span>
                    <div className="unit-intel-badges">
                      {intelligence[unit.id]?.files > 0 && (
                        <span className="intel-badge files">
                          <FileText size={10} /> {intelligence[unit.id].files}
                        </span>
                      )}
                      {intelligence[unit.id]?.comments > 0 && (
                        <span className="intel-badge comments">
                          <MessageSquare size={10} /> {intelligence[unit.id].comments}
                        </span>
                      )}
                    </div>
                  </div>
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
                </div>

                <div className="unit-footer">
                  <span className="public-served">Público: {unit.public_served}</span>
                  <button 
                    className="action-btn-primary" 
                    onClick={(e) => { e.stopPropagation(); setSelectedUnit(unit); }}
                  >
                    <Plus size={14} /> Anexar / Log
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
        <UnitModal 
          unit={selectedUnit} 
          onClose={() => {
            setSelectedUnit(null);
            fetchData();
          }} 
        />
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

        .tabs { display: flex; gap: 0.75rem; }

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
          grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
          gap: 1.5rem;
        }

        .unit-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          border-bottom: 2px solid transparent;
        }

        .unit-card:hover {
          transform: translateY(-5px);
          border-bottom-color: var(--accent-cyan);
          background: rgba(255, 255, 255, 0.03);
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
        }

        .unit-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .unit-id-group {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .unit-id {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-secondary);
          opacity: 0.6;
        }

        .unit-intel-badges {
          display: flex;
          gap: 0.3rem;
        }

        .intel-badge {
          display: flex;
          align-items: center;
          gap: 0.2rem;
          font-size: 0.6rem;
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          font-weight: 700;
        }

        .intel-badge.files { background: rgba(0, 242, 255, 0.1); color: var(--accent-cyan); border: 1px solid rgba(0, 242, 255, 0.2); }
        .intel-badge.comments { background: rgba(168, 85, 247, 0.1); color: #a855f7; border: 1px solid rgba(168, 85, 247, 0.2); }

        .category-badge {
          font-size: 0.6rem;
          text-transform: uppercase;
          font-weight: 800;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
        }

        .category-badge.sede { background: #3b82f6; color: white; }
        .category-badge.acolhimento { background: #10b981; color: white; }
        .category-badge.segurança-alimentar { background: #f59e0b; color: white; }
        .category-badge.especializada { background: #8b5cf6; color: white; }
        .category-badge.logística { background: #6b7280; color: white; }

        .unit-info { display: flex; flex-direction: column; gap: 0.5rem; }
        .info-item { display: flex; gap: 0.6rem; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4; }

        .unit-footer {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid var(--border-glass);
        }

        .public-served { font-size: 0.7rem; color: var(--text-secondary); font-style: italic; }

        .action-btn-primary {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--accent-cyan);
          border: none;
          color: black;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          cursor: pointer;
          transition: 0.2s;
          text-transform: uppercase;
        }

        .action-btn-primary:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(0, 242, 255, 0.4);
        }

        @media (max-width: 640px) {
          .units-grid { grid-template-columns: 1fr; }
          .directory-controls { padding: 1rem; }
        }
      `}} />
    </div>
  );
};
