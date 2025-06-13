
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

const stateData = {
  'CA': { fresh: 3200, aged: 1800, total: 5000, coords: { x: 8, y: 60 } },
  'TX': { fresh: 2800, aged: 1600, total: 4400, coords: { x: 45, y: 75 } },
  'FL': { fresh: 2400, aged: 1400, total: 3800, coords: { x: 80, y: 85 } },
  'NY': { fresh: 2000, aged: 1200, total: 3200, coords: { x: 85, y: 25 } },
  'IL': { fresh: 1600, aged: 1000, total: 2600, coords: { x: 60, y: 40 } },
  'PA': { fresh: 1400, aged: 900, total: 2300, coords: { x: 82, y: 35 } },
  'OH': { fresh: 1200, aged: 800, total: 2000, coords: { x: 72, y: 40 } },
  'GA': { fresh: 1100, aged: 700, total: 1800, coords: { x: 78, y: 70 } },
  'WA': { fresh: 950, aged: 600, total: 1550, coords: { x: 15, y: 15 } },
  'NC': { fresh: 900, aged: 550, total: 1450, coords: { x: 80, y: 65 } },
  'AZ': { fresh: 850, aged: 500, total: 1350, coords: { x: 25, y: 70 } },
  'CO': { fresh: 750, aged: 450, total: 1200, coords: { x: 40, y: 55 } },
  'NV': { fresh: 650, aged: 400, total: 1050, coords: { x: 18, y: 55 } },
  'OR': { fresh: 600, aged: 350, total: 950, coords: { x: 12, y: 25 } },
  'MI': { fresh: 580, aged: 320, total: 900, coords: { x: 68, y: 30 } },
};

const USHeatMap = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'fresh' | 'aged' | 'total'>('total');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  const getStateIntensity = (stateCode: string) => {
    const data = stateData[stateCode as keyof typeof stateData];
    if (!data) return 0;
    
    const value = data[viewMode];
    const maxValue = Math.max(...Object.values(stateData).map(d => d[viewMode]));
    return value / maxValue;
  };

  const getStateColor = (stateCode: string) => {
    const intensity = getStateIntensity(stateCode);
    
    if (viewMode === 'fresh') {
      return `rgba(0, 212, 255, ${0.3 + intensity * 0.7})`;
    } else if (viewMode === 'aged') {
      return `rgba(57, 255, 20, ${0.3 + intensity * 0.7})`;
    } else {
      return `rgba(0, 255, 179, ${0.3 + intensity * 0.7})`;
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.5, 4));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.5, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedState(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <Card className="card-glass">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold gradient-text">Interactive US Lead Heat Map</CardTitle>
            <p className="text-gray-400">Zoom and explore lead distribution across states</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              className="border-electric-blue/30 hover:bg-electric-blue/10"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              className="border-electric-blue/30 hover:bg-electric-blue/10"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="border-electric-blue/30 hover:bg-electric-blue/10"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* View Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-dark-surface/50 rounded-lg p-1">
            {(['total', 'fresh', 'aged'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === mode
                    ? 'bg-electric-blue text-dark-bg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)} Leads
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Map Container */}
        <div className="relative overflow-hidden bg-dark-surface/30 rounded-xl h-96 cursor-grab active:cursor-grabbing">
          <div
            ref={mapRef}
            className="relative w-full h-full"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
              transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.2s ease-out'
            }}
          >
            {/* US Map SVG Outline */}
            <svg
              viewBox="0 0 1000 600"
              className="absolute inset-0 w-full h-full"
              style={{ filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.1))' }}
            >
              {/* Simplified US Map Path */}
              <path
                d="M200 200 L800 200 L800 400 L200 400 Z M150 180 L850 180 L850 420 L150 420 Z"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(0, 212, 255, 0.2)"
                strokeWidth="2"
              />
            </svg>

            {/* State Markers */}
            {Object.entries(stateData).map(([stateCode, data]) => (
              <div
                key={stateCode}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${data.coords.x}%`,
                  top: `${data.coords.y}%`,
                }}
                onMouseEnter={() => setHoveredState(stateCode)}
                onMouseLeave={() => setHoveredState(null)}
                onClick={() => setSelectedState(selectedState === stateCode ? null : stateCode)}
              >
                {/* State Circle */}
                <div
                  className="w-8 h-8 rounded-full border-2 border-white/20 transition-all duration-300 group-hover:scale-125 glow-effect"
                  style={{
                    backgroundColor: getStateColor(stateCode),
                    boxShadow: `0 0 20px ${getStateColor(stateCode)}`,
                  }}
                />
                
                {/* State Label */}
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity bg-dark-card px-2 py-1 rounded whitespace-nowrap z-10">
                  {stateCode}
                </div>

                {/* Tooltip */}
                {hoveredState === stateCode && (
                  <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-dark-card border border-electric-blue/30 rounded-lg p-3 z-20 min-w-48">
                    <h4 className="font-semibold text-electric-blue mb-2">{stateCode}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Fresh Leads:</span>
                        <span className="text-electric-blue font-medium">{data.fresh.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Aged Leads:</span>
                        <span className="text-electric-teal font-medium">{data.aged.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-600 pt-1">
                        <span>Total:</span>
                        <span className="text-white font-semibold">{data.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold mb-3">Lead Volume Intensity</h4>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getStateColor('CA') }}></div>
                <span>High</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getStateColor('CO') }}></div>
                <span>Medium</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getStateColor('OR') }}></div>
                <span>Low</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-lg bg-dark-surface/50">
              <div className="text-lg font-bold text-electric-blue">
                {Object.values(stateData).reduce((sum, state) => sum + state.fresh, 0).toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">Fresh Leads</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-dark-surface/50">
              <div className="text-lg font-bold text-electric-teal">
                {Object.values(stateData).reduce((sum, state) => sum + state.aged, 0).toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">Aged Leads</div>
            </div>
          </div>
        </div>

        {/* Selected State Details */}
        {selectedState && stateData[selectedState as keyof typeof stateData] && (
          <div className="mt-6 p-4 rounded-lg bg-electric-blue/10 border border-electric-blue/30">
            <h3 className="text-lg font-semibold text-electric-blue mb-3">
              {selectedState} - Detailed Breakdown
            </h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {stateData[selectedState as keyof typeof stateData].fresh.toLocaleString()}
                </div>
                <div className="text-gray-400">Fresh Leads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {stateData[selectedState as keyof typeof stateData].aged.toLocaleString()}
                </div>
                <div className="text-gray-400">Aged Leads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">
                  {stateData[selectedState as keyof typeof stateData].total.toLocaleString()}
                </div>
                <div className="text-gray-400">Total Available</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default USHeatMap;
