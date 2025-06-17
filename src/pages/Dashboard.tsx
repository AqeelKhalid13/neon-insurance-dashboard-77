
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import LeadDistributionChart from '@/components/dashboard/LeadDistributionChart';
import ConversionMetrics from '@/components/dashboard/ConversionMetrics';
import SubscriptionOverview from '@/components/dashboard/SubscriptionOverview';
import SalesReportingModal from '@/components/dashboard/SalesReportingModal';
import LeadPerformanceTable from '@/components/dashboard/LeadPerformanceTable';
import GeographicHeatMap from '@/components/dashboard/GeographicHeatMap';
import RealtimeMetrics from '@/components/dashboard/RealtimeMetrics';

const Dashboard = () => {
  const [showSalesModal, setShowSalesModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-cyan-400/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              InsuranceElite Dashboard
            </div>
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-cyan-300 hover:text-cyan-100 transition-colors">Home</Link>
              <Link to="/about-neon" className="text-cyan-300 hover:text-cyan-100 transition-colors">About Us</Link>
              <Link to="/contact-neon" className="text-cyan-300 hover:text-cyan-100 transition-colors">Contact</Link>
              <Link to="/auth" className="text-cyan-300 hover:text-cyan-100 transition-colors">Login</Link>
            </div>
            <Button 
              onClick={() => setShowSalesModal(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold shadow-lg shadow-green-500/25"
            >
              Mark Sale
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Real-time Metrics Bar */}
          <RealtimeMetrics />

          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" className="mt-8">
            <TabsList className="grid w-full grid-cols-4 bg-black/40 backdrop-blur-md border border-cyan-400/30">
              <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-100">
                Overview
              </TabsTrigger>
              <TabsTrigger value="leads" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-100">
                Lead Analytics
              </TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-100">
                Performance
              </TabsTrigger>
              <TabsTrigger value="subscription" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-100">
                Subscription
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <LeadDistributionChart />
                <ConversionMetrics />
              </div>
              <GeographicHeatMap />
            </TabsContent>

            <TabsContent value="leads" className="space-y-8">
              <LeadPerformanceTable />
              <GeographicHeatMap />
            </TabsContent>

            <TabsContent value="performance" className="space-y-8">
              <ConversionMetrics />
              <LeadPerformanceTable />
            </TabsContent>

            <TabsContent value="subscription" className="space-y-8">
              <SubscriptionOverview />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Sales Reporting Modal */}
      <SalesReportingModal 
        isOpen={showSalesModal} 
        onClose={() => setShowSalesModal(false)} 
      />
    </div>
  );
};

export default Dashboard;
