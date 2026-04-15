import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Overview } from './components/Overview';
import { LegalHub } from './components/LegalHub';
import { StatsDashboard } from './components/StatsDashboard';
import { EngStandards } from './components/EngStandards';
import { Menu, X } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsCollapsed(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Overview />;
      case 'legal': return <LegalHub />;
      case 'stats': return <StatsDashboard />;
      case 'eng': return <EngStandards />;
      default: return <Overview />;
    }
  };

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="app-container">
      {/* Mobile Top Header */}
      {isMobile && (
        <header className="mobile-header">
          <button className="menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="mobile-logo">IM Semper</span>
        </header>
      )}

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (isMobile) setIsMobileMenuOpen(false);
        }}
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        isMobileOpen={isMobileMenuOpen}
        closeMobile={() => setIsMobileMenuOpen(false)}
      />

      <main className={`main-content ${isCollapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''}`}>
        {renderContent()}
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .app-container {
          display: flex;
          min-height: 100vh;
          background-color: var(--bg-primary);
        }

        .mobile-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-glass);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          z-index: 100;
        }

        .menu-toggle {
          background: transparent;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
        }

        .mobile-logo {
          font-weight: 800;
          color: var(--accent-cyan);
          font-size: 1.1rem;
        }

        .main-content {
          flex: 1;
          height: 100vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .main-content.mobile {
          margin-left: 0 !important;
          padding-top: 60px;
        }

        @media (max-width: 767px) {
          .app-container {
            flex-direction: column;
          }
        }
      `}} />
    </div>
  );
}

export default App;
