
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, CheckCircle, RotateCcw, DollarSign, MapPin } from 'lucide-react';

// Mock data for agent overview
const mockStats = {
  totalLeadsAssigned: 45,
  leadsMarkedAsSold: 12,
  pendingReplacements: 3,
  conversionRate: 26.7,
  annualSubmitTotal: 89500,
  topPerformingStates: [
    { state: 'CA', conversions: 8, rate: 35.2 },
    { state: 'TX', conversions: 6, rate: 28.1 },
    { state: 'FL', conversions: 4, rate: 22.3 }
  ]
};

export function AgentOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          Dashboard Overview
        </h2>
        <p className="text-cyan-100/70">Your real-time performance statistics</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-black/40 border-cyan-400/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-cyan-100">Total Leads Assigned</CardTitle>
            <Users className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-400">{mockStats.totalLeadsAssigned}</div>
            <p className="text-xs text-cyan-100/70">Active assignments</p>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-green-400/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-cyan-100">Leads Marked as Sold</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{mockStats.leadsMarkedAsSold}</div>
            <p className="text-xs text-cyan-100/70">Successful conversions</p>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-orange-400/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-cyan-100">Pending Replacements</CardTitle>
            <RotateCcw className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-400">{mockStats.pendingReplacements}</div>
            <p className="text-xs text-cyan-100/70">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-purple-400/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-cyan-100">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">{mockStats.conversionRate}%</div>
            <p className="text-xs text-cyan-100/70">Leads to sales ratio</p>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-yellow-400/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-cyan-100">Annual Submit Total</CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">${mockStats.annualSubmitTotal.toLocaleString()}</div>
            <p className="text-xs text-cyan-100/70">Total sales value</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing States */}
      <Card className="bg-black/40 border-cyan-400/30">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Top 3 Performing States
          </CardTitle>
          <p className="text-cyan-100/70">Based on your conversion rates</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockStats.topPerformingStates.map((state, index) => (
              <div key={state.state} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
                <div className="flex items-center space-x-3">
                  <Badge className={`${
                    index === 0 ? 'bg-yellow-500/20 text-yellow-300' :
                    index === 1 ? 'bg-gray-500/20 text-gray-300' :
                    'bg-orange-500/20 text-orange-300'
                  } border-transparent`}>
                    #{index + 1}
                  </Badge>
                  <MapPin className="h-4 w-4 text-cyan-400" />
                  <span className="font-medium text-white">{state.state}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-cyan-100/70">
                    {state.conversions} conversions
                  </div>
                  <div className="text-sm font-bold text-green-400">
                    {state.rate}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
