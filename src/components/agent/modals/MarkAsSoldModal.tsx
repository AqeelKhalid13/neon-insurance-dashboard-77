
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface MarkAsSoldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SaleData) => void;
  leadId: string | null;
}

interface SaleData {
  zipCode: string;
  annualSubmitAmount: string;
  insuranceCompany: string;
  product: string;
  notes: string;
}

export function MarkAsSoldModal({ isOpen, onClose, onSubmit, leadId }: MarkAsSoldModalProps) {
  const [formData, setFormData] = useState<SaleData>({
    zipCode: '',
    annualSubmitAmount: '',
    insuranceCompany: '',
    product: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      zipCode: '',
      annualSubmitAmount: '',
      insuranceCompany: '',
      product: '',
      notes: ''
    });
  };

  const handleInputChange = (field: keyof SaleData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/90 border border-cyan-400/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Mark as Sold
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="zipCode" className="text-cyan-100">Client ZIP Code *</Label>
            <Input
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              className="bg-gray-800/50 border-cyan-400/30 text-white"
              placeholder="12345"
              required
            />
          </div>

          <div>
            <Label htmlFor="annualSubmitAmount" className="text-cyan-100">Annual Submit Amount *</Label>
            <Input
              id="annualSubmitAmount"
              type="number"
              value={formData.annualSubmitAmount}
              onChange={(e) => handleInputChange('annualSubmitAmount', e.target.value)}
              className="bg-gray-800/50 border-cyan-400/30 text-white"
              placeholder="25000"
              required
            />
          </div>

          <div>
            <Label htmlFor="insuranceCompany" className="text-cyan-100">Insurance Company *</Label>
            <Input
              id="insuranceCompany"
              value={formData.insuranceCompany}
              onChange={(e) => handleInputChange('insuranceCompany', e.target.value)}
              className="bg-gray-800/50 border-cyan-400/30 text-white"
              placeholder="ABC Insurance Co."
              required
            />
          </div>

          <div>
            <Label htmlFor="product" className="text-cyan-100">Product *</Label>
            <select
              id="product"
              value={formData.product}
              onChange={(e) => handleInputChange('product', e.target.value)}
              className="w-full bg-gray-800/50 border border-cyan-400/30 text-white rounded-md px-3 py-2"
              required
            >
              <option value="">Select Product</option>
              <option value="Auto Insurance">Auto Insurance</option>
              <option value="Home Insurance">Home Insurance</option>
              <option value="Life Insurance">Life Insurance</option>
              <option value="Health Insurance">Health Insurance</option>
              <option value="Business Insurance">Business Insurance</option>
            </select>
          </div>

          <div>
            <Label htmlFor="notes" className="text-cyan-100">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="bg-gray-800/50 border-cyan-400/30 text-white resize-none"
              placeholder="Additional notes about this sale..."
              rows={3}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 border-gray-600 text-gray-300">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400">
              Mark as Sold
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
