import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import DisclaimerBanner from './components/common/DisclaimerBanner';
import OverviewView from './components/dashboard/OverviewView';
import InteractiveMap from './components/map/InteractiveMap';
import RiskDetailPanel from './components/risk/RiskDetailPanel';
import PriorityQueue from './components/dashboard/PriorityQueue';
import RelocationView from './components/relocation/RelocationView';
import ScenarioSimulator from './components/simulation/ScenarioSimulator';
import AlertsView from './components/alerts/AlertsView';
import DataSourcesView from './components/common/DataSourcesView';

// Centralized Data Imports
import { HABITATIONS_DATA } from './data/habitationsData';
import { RELOCATION_SITES_DATA } from './data/relocationSitesData';
import { INFRASTRUCTURE_DATA } from './data/infrastructureData';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('overview');

  // Shared Core Data State (Ensures 100% Data Consistency across entire app)
  const [habitations] = useState(HABITATIONS_DATA);
  const [relocationSites] = useState(RELOCATION_SITES_DATA);
  const [infrastructure] = useState(INFRASTRUCTURE_DATA);

  // Selected State (Defaulted to Mogral Puthur and Periya Community Campus)
  const [selectedHabitation, setSelectedHabitation] = useState(HABITATIONS_DATA[0]);
  const [selectedRelocationSite, setSelectedRelocationSite] = useState(RELOCATION_SITES_DATA[0]);
  const [isRelocationMode, setIsRelocationMode] = useState(false);

  // Handlers for cross-component interactions
  const handleSelectHabitation = (habitation) => {
    setSelectedHabitation(habitation);
    // Find matching recommended site
    const matchingSite = relocationSites.find(s => s.id === habitation.recommendedRelocationSiteId) || relocationSites[0];
    setSelectedRelocationSite(matchingSite);
  };

  const handleSelectRelocationSite = (site) => {
    setSelectedRelocationSite(site);
    setIsRelocationMode(true);
  };

  const handleOpenFindSafeSites = (habitation) => {
    if (habitation) handleSelectHabitation(habitation);
    setIsRelocationMode(true);
    setActiveTab('relocation');
  };

  const handleOpenMapWithHabitation = (habitation) => {
    if (habitation) handleSelectHabitation(habitation);
    setActiveTab('map');
  };

  const handleOpenSimulation = (habitation) => {
    if (habitation) handleSelectHabitation(habitation);
    setActiveTab('simulation');
  };

  const handleViewCorridorOnMap = (site) => {
    if (site) setSelectedRelocationSite(site);
    setIsRelocationMode(true);
    setActiveTab('map');
  };

  const handleInspectHabitationFromAlert = (habitationId) => {
    const found = habitations.find(h => h.id === habitationId);
    if (found) {
      setSelectedHabitation(found);
      setActiveTab('map');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f1d] text-slate-100 font-sans">
      {/* Top Prototype Disclaimer */}
      <DisclaimerBanner />

      {/* Main Government Intelligence Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        alertCount={2}
      />

      {/* Main View Router */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* VIEW 1: OVERVIEW DASHBOARD */}
        {activeTab === 'overview' && (
          <div className="flex-1 overflow-y-auto">
            <OverviewView
              habitations={habitations}
              relocationSites={relocationSites}
              onSelectHabitation={handleSelectHabitation}
              onOpenMap={() => setActiveTab('map')}
              onOpenRelocation={() => setActiveTab('relocation')}
              onOpenSimulation={() => setActiveTab('simulation')}
              onOpenAlerts={() => setActiveTab('alerts')}
            />
          </div>
        )}

        {/* VIEW 2: RISK MAP (CENTERPIECE: 65-70% Map, 30-35% Detail Panel on Desktop) */}
        {activeTab === 'map' && (
          <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-6.5rem)] overflow-hidden">
            {/* Desktop: 68% Map / Mobile: 58% Map */}
            <div className="w-full lg:w-[68%] h-[58vh] lg:h-full relative flex-1">
              <InteractiveMap
                habitations={habitations}
                relocationSites={relocationSites}
                infrastructure={infrastructure}
                selectedHabitation={selectedHabitation}
                onSelectHabitation={handleSelectHabitation}
                selectedRelocationSite={selectedRelocationSite}
                onSelectRelocationSite={handleSelectRelocationSite}
                isRelocationMode={isRelocationMode}
                onOpenAssessment={() => setActiveTab('map')}
                onOpenRelocation={() => handleOpenFindSafeSites(selectedHabitation)}
              />
            </div>

            {/* Desktop: 32% Risk Panel / Mobile: Bottom Panel */}
            <div className="w-full lg:w-[32%] h-[42vh] lg:h-full border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/95 overflow-y-auto">
              <RiskDetailPanel
                habitation={selectedHabitation}
                onFindSafeSites={handleOpenFindSafeSites}
                onOpenSimulation={handleOpenSimulation}
                onClose={() => setSelectedHabitation(null)}
              />
            </div>
          </div>
        )}

        {/* VIEW 3: PRIORITY QUEUE */}
        {activeTab === 'priority' && (
          <div className="flex-1 overflow-y-auto">
            <PriorityQueue
              habitations={habitations}
              selectedHabitation={selectedHabitation}
              onSelectHabitation={handleSelectHabitation}
              onOpenMap={() => setActiveTab('map')}
              onOpenRelocation={() => handleOpenFindSafeSites(selectedHabitation)}
            />
          </div>
        )}

        {/* VIEW 4: RELOCATION HUB (CORE DIFFERENTIATOR) */}
        {activeTab === 'relocation' && (
          <div className="flex-1 overflow-y-auto">
            <RelocationView
              selectedHabitation={selectedHabitation}
              habitations={habitations}
              relocationSites={relocationSites}
              selectedRelocationSite={selectedRelocationSite}
              onSelectRelocationSite={handleSelectRelocationSite}
              onSelectHabitation={handleSelectHabitation}
              onViewOnMap={handleViewCorridorOnMap}
            />
          </div>
        )}

        {/* VIEW 5: SCENARIO SIMULATION ("WHAT IF?" SENSITIVITY) */}
        {activeTab === 'simulation' && (
          <div className="flex-1 overflow-y-auto">
            <ScenarioSimulator
              habitations={habitations}
              selectedHabitation={selectedHabitation}
              onSelectHabitation={handleSelectHabitation}
              onProceedToRelocation={handleOpenFindSafeSites}
            />
          </div>
        )}

        {/* VIEW 6: ALERTS (OFFICIAL SACHET vs AI RISK SIGNALS) */}
        {activeTab === 'alerts' && (
          <div className="flex-1 overflow-y-auto">
            <AlertsView
              onInspectHabitation={handleInspectHabitationFromAlert}
            />
          </div>
        )}

        {/* VIEW 7: DATA & SOURCES */}
        {activeTab === 'datasources' && (
          <div className="flex-1 overflow-y-auto">
            <DataSourcesView />
          </div>
        )}
      </main>

      {/* Status Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-2.5 px-4 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>AbhayAssist Decision-Support Engine v1.0 (Kasaragod Pilot)</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Target District: Kasaragod, Kerala</span>
          <span>Data References: Bhuvan • NDEM • SACHET</span>
          <span className="text-cyan-400 font-semibold">Smart India Hackathon 2026</span>
        </div>
      </footer>
    </div>
  );
}
