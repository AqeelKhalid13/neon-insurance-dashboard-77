
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Filter, DollarSign } from 'lucide-react';

interface AgedLead {
  id: string;
  clientName: string;
  leadAge: '3+' | '6+' | '9+';
  originalPrice: number;
  discountedPrice: number;
  leadType: string;
  state: string;
}

const mockAgedLeads: AgedLead[] = [
  {
    id: '1',
    clientName: 'John Smith',
    leadAge: '3+',
    originalPrice: 15,
    discountedPrice: 8,
    leadType: 'Auto Insurance',
    state: 'CA'
  },
  {
    id: '2',
    clientName: 'Sarah Johnson',
    leadAge: '6+',
    originalPrice: 15,
    discountedPrice: 5,
    leadType: 'Home Insurance',
    state: 'TX'
  },
  {
    id: '3',
    clientName: 'Mike Davis',
    leadAge: '9+',
    originalPrice: 15,
    discountedPrice: 3,
    leadType: 'Life Insurance',
    state: 'FL'
  }
];

export function AgedLeadsFilter() {
  const [selectedAgeFilter, setSelectedAgeFilter] = useState<string>('all');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const filteredLeads = selectedAgeFilter === 'all' 
    ? mockAgedLeads 
    : mockAgedLeads.filter(lead => lead.leadAge === selectedAgeFilter);

  const getAgeColor = (age: string) => {
    switch (age) {
      case '3+': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50';
      case '6+': return 'bg-orange-500/20 text-orange-300 border-orange-400/50';
      case '9+': return 'bg-red-500/20 text-red-300 border-red-400/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400/50';
    }
  };

  const handleLeadSelection = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const selectedLeadsData = filteredLeads.filter(lead => selectedLeads.includes(lead.id));
  const totalCost = selectedLeadsData.reduce((sum, lead) => sum + lead.discountedPrice, 0);
  const totalSavings = selectedLeadsData.reduce((sum, lead) => sum + (lead.originalPrice - lead.discountedPrice), 0);

  return (
    <Card className="bg-elevated border-[#3A3A3A]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary flex items-center gap-3">
          <Clock className="h-6 w-6" />
          Aged Leads - Discounted Pricing
        </CardTitle>
        <p className="text-secondary-text">
          Older leads at reduced prices - perfect for budget-conscious campaigns
        </p>
      </CardHeader>
      <CardContent>
        {/* Age Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            size="sm"
            variant={selectedAgeFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedAgeFilter('all')}
            className={selectedAgeFilter === 'all' 
              ? 'bg-primary text-dark-base' 
              : 'border-[#3A3A3A] text-secondary-text hover:bg-section-bg'
            }
          >
            <Filter className="h-3 w-3 mr-1" />
            All Ages
          </Button>
          {['3+', '6+', '9+'].map((age) => (
            <Button
              key={age}
              size="sm"
              variant={selectedAgeFilter === age ? 'default' : 'outline'}
              onClick={() => setSelectedAgeFilter(age)}
              className={selectedAgeFilter === age 
                ? 'bg-primary text-dark-base' 
                : 'border-[#3A3A3A] text-secondary-text hover:bg-section-bg'
              }
            >
              {age} Months Old
            </Button>
          ))}
        </div>

        {/* Leads List */}
        <div className="space-y-3 mb-6">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                selectedLeads.includes(lead.id)
                  ? 'border-primary bg-primary/10'
                  : 'border-[#3A3A3A] bg-section-bg hover:bg-section-bg/80'
              }`}
              onClick={() => handleLeadSelection(lead.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-primary">{lead.clientName}</h4>
                    <Badge className={getAgeColor(lead.leadAge)}>
                      {lead.leadAge} months old
                    </Badge>
                    <Badge variant="outline" className="border-primary/50 text-primary">
                      {lead.leadType}
                    </Badge>
                    <span className="text-secondary-text text-sm">{lead.state}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-secondary-text line-through">
                      ${lead.originalPrice}
                    </span>
                    <span className="text-lg font-bold text-success">
                      ${lead.discountedPrice}
                    </span>
                    <span className="text-sm text-success">
                      Save ${lead.originalPrice - lead.discountedPrice}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded border-2 ${
                    selectedLeads.includes(lead.id)
                      ? 'bg-primary border-primary'
                      : 'border-[#3A3A3A]'
                  }`}>
                    {selectedLeads.includes(lead.id) && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-dark-base rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Purchase Summary */}
        {selectedLeads.length > 0 && (
          <div className="p-4 bg-section-bg rounded-lg border border-[#3A3A3A]">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-primary flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Purchase Summary
              </h4>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-secondary-text">
                <span>Selected leads:</span>
                <span>{selectedLeads.length}</span>
              </div>
              <div className="flex justify-between text-secondary-text">
                <span>Total savings:</span>
                <span className="text-success">${totalSavings}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-primary">
                <span>Total cost:</span>
                <span>${totalCost}</span>
              </div>
            </div>
            <Button 
              className="w-full bg-primary text-dark-base hover:bg-primary/90"
              disabled={selectedLeads.length === 0}
            >
              Purchase {selectedLeads.length} Aged Lead{selectedLeads.length !== 1 ? 's' : ''} - ${totalCost}
            </Button>
          </div>
        )}

        {filteredLeads.length === 0 && (
          <div className="text-center py-8 text-secondary-text">
            No aged leads available for the selected filter.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
