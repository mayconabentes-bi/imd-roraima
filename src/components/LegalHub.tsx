import React, { useState } from 'react';
import { Search, ExternalLink, Calendar } from 'lucide-react';
import { legalDocs } from '../data/legal';

export const LegalHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string>('All');

  const filteredDocs = legalDocs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || doc.category === filter;
    return matchesSearch && matchesFilter;
  });

  const categories = ['All', ...Array.from(new Set(legalDocs.map(d => d.category)))];

  return (
    <div className="module-container">
      <header className="module-header">
        <div>
          <h1 className="gradient-text">Centro Jurídico</h1>
          <p className="subtitle">Base de dados legal do Estado de Roraima e Normativas Federais.</p>
        </div>
        <div className="header-actions">
          <div className="search-bar">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar leis, decretos..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="filter-chips">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`chip ${filter === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="doc-grid">
        {filteredDocs.map((doc) => (
          <div key={doc.id} className="glass-card doc-card">
            <div className="doc-header">
              <span className={`tag tag-${getCategoryClass(doc.category)}`}>{doc.category}</span>
              <button 
                className="icon-btn" 
                onClick={() => window.open(doc.url, '_blank')}
                title="Abrir Fonte Oficial"
              >
                <ExternalLink size={16} />
              </button>
            </div>
            <h3>{doc.title}</h3>
            <p>{doc.description}</p>
            <div className="doc-footer">
              <div className="meta">
                <Calendar size={14} />
                <span>{new Date(doc.date).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="tags">
                {doc.tags.map(tag => (
                  <span key={tag} className="sub-tag">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .module-container {
          padding: 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          overflow-y: auto;
        }

        .module-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-top: 0.5rem;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-glass);
          padding: 0.75rem 1.25rem;
          border-radius: 9999px;
          width: 350px;
        }

        .search-bar input {
          background: transparent;
          border: none;
          color: var(--text-primary);
          outline: none;
          width: 100%;
          font-family: var(--font-sans);
        }

        .filter-chips {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .chip {
          padding: 0.5rem 1.25rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-glass);
          border-radius: 9999px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .chip:hover {
          border-color: var(--accent-cyan);
          color: var(--text-primary);
        }

        .chip.active {
          background: var(--accent-blue);
          border-color: var(--accent-blue);
          color: white;
        }

        .doc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .doc-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: transform 0.3s ease;
        }

        .doc-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-cyan);
        }

        .doc-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .doc-card h3 {
          font-size: 1.1rem;
          font-weight: 600;
          line-height: 1.4;
        }

        .doc-card p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
          flex: 1;
        }

        .doc-footer {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-glass);
        }

        .meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-family: var(--font-mono);
        }

        .tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .sub-tag {
          font-size: 0.75rem;
          color: var(--accent-cyan);
          opacity: 0.8;
        }

        .icon-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color 0.2s;
        }

        .icon-btn:hover {
          color: var(--accent-cyan);
        }
      `}} />
    </div>
  );
};

function getCategoryClass(cat: string) {
  if (cat.includes('Constituição')) return 'juridico';
  if (cat.includes('Engenharia')) return 'eng';
  if (cat.includes('Orçamento')) return 'stats';
  return 'juridico';
}
