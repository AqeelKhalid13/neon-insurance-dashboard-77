
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardContent } from '@/components/dashboard/DashboardContent';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          <DashboardContent />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
