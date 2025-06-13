
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const stateData = {
  'CA': { fresh: 3200, aged: 1800, total: 5000 },
  'TX': { fresh: 2800, aged: 1600, total: 4400 },
  'FL': { fresh: 2400, aged: 1400, total: 3800 },
  'NY': { fresh: 2000, aged: 1200, total: 3200 },
  'IL': { fresh: 1600, aged: 1000, total: 2600 },
  'PA': { fresh: 1400, aged: 900, total: 2300 },
  'OH': { fresh: 1200, aged: 800, total: 2000 },
  'GA': { fresh: 1100, aged: 700, total: 1800 },
};

const USHeatMap = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const getStateColor = (stateCode: string) => {
    const data = stateData[stateCode as keyof typeof stateData];
    if (!data) return '#374151';
    
    const intensity = data.total / 5000;
    if (intensity > 0.8) return '#00D4FF';
    if (intensity > 0.6) return '#00FFB3';
    if (intensity > 0.4) return '#39FF14';
    if (intensity > 0.2) return '#0EA5E9';
    return '#64748B';
  };

  return (
    <Card className="card-glass">
      <CardHeader>
        <CardTitle className="text-2xl font-bold gradient-text">Lead Distribution Map</CardTitle>
        <p className="text-gray-400">Interactive map showing lead availability by state</p>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Simplified US Map Representation */}
          <div className="grid grid-cols-12 gap-1 p-4 bg-dark-surface/30 rounded-lg">
            {Object.keys(stateData).map((state) => (
              <div
                key={state}
                className="h-12 rounded cursor-pointer transition-all duration-300 flex items-center justify-center text-xs font-semibold hover:scale-110 glow-effect"
                style={{ backgroundColor: getStateColor(state) }}
                onMouseEnter={() => setHoveredState(state)}
                onMouseLeave={() => setHoveredState(null)}
                onClick={() => setSelectedState(state)}
              >
                {state}
              </div>
            ))}
          </div>

          {/* Tooltip */}
          {hoveredState && stateData[hoveredState as keyof typeof stateData] && (
            <div className="absolute top-4 right-4 bg-dark-card border border-electric-blue/30 rounded-lg p-4 z-10">
              <h4 className="font-semibold text-electric-blue mb-2">{hoveredState}</h4>
              <div className="space-y-1 text-sm">
                <div>Fresh Leads: <span className="text-electric-teal">{stateData[hoveredState as keyof typeof stateData].fresh.toLocaleString()}</span></div>
                <div>Aged Leads: <span className="text-gray-400">{stateData[hoveredState as keyof typeof stateData].aged.toLocaleString()}</span></div>
                <div>Total: <span className="text-white font-semibold">{stateData[hoveredState as keyof typeof stateData].total.toLocaleString()}</span></div>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-3">Lead Volume</h4>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#00D4FF' }}></div>
              <span>5000+</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#00FFB3' }}></div>
              <span>3000+</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#39FF14' }}></div>
              <span>2000+</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#0EA5E9' }}></div>
              <span>1000+</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="text-center p-4 rounded-lg bg-dark-surface/50">
            <div className="text-xl font-bold text-electric-blue">24.6K</div>
            <div className="text-sm text-gray-400">Fresh Leads</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-dark-surface/50">
            <div className="text-xl font-bold text-electric-teal">14.2K</div>
            <div className="text-sm text-gray-400">Aged Leads</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default USHeatMap;
