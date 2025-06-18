
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, UserPlus, RotateCcw } from 'lucide-react';

// Mock data for leads
const mockLeads = [
  { id: 1, name: "John Smith", email: "john@email.com", phone: "555-0101", state: "CA", status: "assigned", assignedTo: "Agent Smith", type: "Premium" },
  { id: 2, name: "Jane Doe", email: "jane@email.com", phone: "555-0102", state: "TX", status: "unassigned", assignedTo: null, type: "Standard" },
  { id: 3, name: "Bob Wilson", email: "bob@email.com", phone: "555-0103", state: "FL", status: "sold", assignedTo: "Agent Johnson", type: "Premium" },
  { id: 4, name: "Alice Brown", email: "alice@email.com", phone: "555-0104", state: "NY", status: "replaced", assignedTo: "Agent Davis", type: "Standard" },
];

const mockAgents = ["Agent Smith", "Agent Johnson", "Agent Davis", "Agent Wilson"];

export function LeadManagement() {
  const [leads, setLeads] = useState(mockLeads);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterState, setFilterState] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || lead.status === filterStatus;
    const matchesState = filterState === "all" || lead.state === filterState;
    return matchesSearch && matchesStatus && matchesState;
  });

  const handleAssignLead = (leadId: number, agentName: string) => {
    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, status: "assigned", assignedTo: agentName }
        : lead
    ));
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      assigned: "bg-blue-500/20 text-blue-400 border-blue-400/50",
      unassigned: "bg-yellow-500/20 text-yellow-400 border-yellow-400/50",
      sold: "bg-green-500/20 text-green-400 border-green-400/50",
      replaced: "bg-red-500/20 text-red-400 border-red-400/50"
    };
    return <Badge className={colors[status as keyof typeof colors] || "bg-gray-500/20 text-gray-400"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-cream-primary">
            Lead Management
          </h2>
          <p className="text-secondary-text">Manage and assign leads to agents</p>
        </div>
        <Button className="bg-cream-primary hover:bg-cream-hover text-dark-base font-semibold">
          <UserPlus className="w-4 h-4 mr-2" />
          Import Leads
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cream-primary">{leads.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text">Assigned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{leads.filter(l => l.status === 'assigned').length}</div>
          </CardContent>
        </Card>
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text">Unassigned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">{leads.filter(l => l.status === 'unassigned').length}</div>
          </CardContent>
        </Card>
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text">Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-theme-success">{leads.filter(l => l.status === 'sold').length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-elevated-bg border-input-border">
        <CardHeader>
          <CardTitle className="text-cream-primary">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-cream-primary" />
                <Input
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-section-bg border-input-border text-primary-text"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px] bg-section-bg border-input-border text-primary-text">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="replaced">Replaced</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterState} onValueChange={setFilterState}>
              <SelectTrigger className="w-[150px] bg-section-bg border-input-border text-primary-text">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="CA">California</SelectItem>
                <SelectItem value="TX">Texas</SelectItem>
                <SelectItem value="FL">Florida</SelectItem>
                <SelectItem value="NY">New York</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card className="bg-elevated-bg border-input-border">
        <CardHeader>
          <CardTitle className="text-cream-primary">All Leads</CardTitle>
          <CardDescription className="text-secondary-text">
            Showing {filteredLeads.length} of {leads.length} leads
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-input-border">
                  <TableHead className="text-cream-primary">Name</TableHead>
                  <TableHead className="text-cream-primary">Contact</TableHead>
                  <TableHead className="text-cream-primary">State</TableHead>
                  <TableHead className="text-cream-primary">Type</TableHead>
                  <TableHead className="text-cream-primary">Status</TableHead>
                  <TableHead className="text-cream-primary">Assigned To</TableHead>
                  <TableHead className="text-cream-primary">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id} className="border-input-border">
                    <TableCell className="text-primary-text font-medium">{lead.name}</TableCell>
                    <TableCell className="text-secondary-text">
                      <div className="text-sm">
                        <div>{lead.email}</div>
                        <div>{lead.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-primary-text">{lead.state}</TableCell>
                    <TableCell className="text-primary-text">{lead.type}</TableCell>
                    <TableCell>{getStatusBadge(lead.status)}</TableCell>
                    <TableCell className="text-primary-text">{lead.assignedTo || "Unassigned"}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {lead.status === 'unassigned' && (
                          <Select onValueChange={(agent) => handleAssignLead(lead.id, agent)}>
                            <SelectTrigger className="w-[120px] h-8 bg-section-bg border-input-border text-primary-text">
                              <SelectValue placeholder="Assign" />
                            </SelectTrigger>
                            <SelectContent>
                              {mockAgents.map(agent => (
                                <SelectItem key={agent} value={agent}>{agent}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                        <Button size="sm" variant="outline" className="border-input-border text-secondary-text hover:bg-cream-primary/20 hover:text-cream-primary">
                          <RotateCcw className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
