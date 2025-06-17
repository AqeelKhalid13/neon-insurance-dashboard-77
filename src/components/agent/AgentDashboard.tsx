
import { useState } from 'react';
import { AgentOverview } from './sections/AgentOverview';
import { AgentLeadsTable } from './sections/AgentLeadsTable';
import { AgentPerformanceAnalytics } from './sections/AgentPerformanceAnalytics';
import { AgentSubscriptionBilling } from './sections/AgentSubscriptionBilling';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function AgentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/30 backdrop-blur-md border-b border-cyan-400/30">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="text-cyan-300 hover:text-cyan-100" />
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Agent Dashboard
              </h1>
              <p className="text-cyan-100/70 text-sm">
                Manage your leads and track performance
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded border border-cyan-400/50">
              AGENT ACCESS
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/40 backdrop-blur-md border border-cyan-400/30">
            <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-100">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="leads" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-100">
              My Leads
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-100">
              Performance
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-100">
              Subscription
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <AgentOverview />
          </TabsContent>

          <TabsContent value="leads" className="mt-8">
            <AgentLeadsTable />
          </TabsContent>

          <TabsContent value="analytics" className="mt-8">
            <AgentPerformanceAnalytics />
          </TabsContent>

          <TabsContent value="billing" className="mt-8">
            <AgentSubscriptionBilling />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
