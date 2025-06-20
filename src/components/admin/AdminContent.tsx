
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AdminOverview } from './sections/AdminOverview';
import { UserManagement } from './sections/UserManagement';
import { LeadManagement } from './sections/LeadManagement';
import { ReplacementRequests } from './sections/ReplacementRequests';
import { PerformanceAnalytics } from './sections/PerformanceAnalytics';
import { SalesReporting } from './sections/SalesReporting';
import { SubscriptionManagement } from './sections/SubscriptionManagement';
import { NotificationCenter } from './sections/NotificationCenter';

interface AdminContentProps {
  activeSection: string;
}

export function AdminContent({ activeSection }: AdminContentProps) {
  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <AdminOverview />;
      case "users":
        return <UserManagement />;
      case "leads":
        return <LeadManagement />;
      case "replacements":
        return <ReplacementRequests />;
      case "analytics":
        return <PerformanceAnalytics />;
      case "sales":
        return <SalesReporting />;
      case "subscriptions":
        return <SubscriptionManagement />;
      case "notifications":
        return <NotificationCenter />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-elevated-bg/90 backdrop-blur-md border-b border-input-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="text-cream-primary hover:text-primary-text" />
            <div>
              <h1 className="text-2xl font-bold text-cream-primary">
                Admin Dashboard
              </h1>
              <p className="text-secondary-text text-sm">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace(/([A-Z])/g, ' $1')}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-xs bg-cream-primary/20 text-cream-primary px-3 py-1 rounded border border-cream-primary/50">
              ADMIN ACCESS
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-dark-base">
        {renderContent()}
      </main>
    </div>
  );
}
