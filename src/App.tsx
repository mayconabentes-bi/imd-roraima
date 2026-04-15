import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Overview } from './components/Overview';
import { LegalHub } from './components/LegalHub';
import { StatsDashboard } from './components/StatsDashboard';
import { EngStandards } from './components/EngStandards';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Overview />;
      case 'legal': return <LegalHub />;
      case 'stats': return <StatsDashboard />;
      case 'eng': return <EngStandards />;
      default: return <Overview />;
    }
  };

  return (
    <>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ flex: 1, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {renderContent()}
      </main>
    </>
  );
}

export default App;
