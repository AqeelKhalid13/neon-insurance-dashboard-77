
import { useLocation } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AgentDashboard } from '@/components/agent/AgentDashboard';

const Dashboard = () => {
  const location = useLocation();
  const userRole = location.state?.role || 'agent';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          {userRole === 'admin' ? (
            <AdminDashboard />
          ) : (
            <AgentDashboard />
          )}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
