
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, DollarSign, Package, Phone, Shield } from 'lucide-react';

interface LeadCategory {
  id: string;
  name: string;
  type: 'mortgage-protection' | 'otp-non-otp' | 'otp-verified';
  description: string;
  included: string[];
  deliveryTime: string;
  pricePerLead: number;
  totalLeads: number;
  isExclusive: boolean;
  isHighIntent: boolean;
  isOtpVerified: boolean;
}

interface LeadCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: LeadCategory | null;
  onPurchase: (categoryId: string) => void;
}

export function LeadCategoriesModal({ isOpen, onClose, category, onPurchase }: LeadCategoriesModalProps) {
  if (!category) return null;

  const totalCost = category.pricePerLead * category.totalLeads;
  const discount = category.totalLeads >= 10 ? 0.1 : 0;
  const discountAmount = totalCost * discount;
  const finalCost = totalCost - discountAmount;

  const getTypeIcon = () => {
    switch (category.type) {
      case 'mortgage-protection':
        return <Shield className="h-5 w-5 text-primary" />;
      case 'otp-verified':
        return <Phone className="h-5 w-5 text-primary" />;
      default:
        return <Package className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-elevated border-[#3A3A3A] text-primary-text max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-3">
            {getTypeIcon()}
            {category.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Lead Type Badges */}
          <div className="flex flex-wrap gap-2">
            {category.isExclusive && (
              <Badge className="bg-success/20 text-success border-success/50">
                <CheckCircle className="h-3 w-3 mr-1" />
                Exclusive
              </Badge>
            )}
            {category.isHighIntent && (
              <Badge className="bg-primary/20 text-primary border-primary/50">
                High Intent
              </Badge>
            )}
            {category.isOtpVerified && (
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/50">
                <Phone className="h-3 w-3 mr-1" />
                OTP Verified
              </Badge>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">Description</h3>
            <p className="text-secondary-text">{category.description}</p>
          </div>

          {/* What's Included */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">What's Included</h3>
            <ul className="space-y-2">
              {category.included.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-secondary-text">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery Time */}
          <div className="flex items-center gap-3 p-4 bg-section-bg rounded-lg">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <h4 className="font-semibold text-primary">Estimated Delivery Time</h4>
              <p className="text-secondary-text">{category.deliveryTime}</p>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="p-4 bg-section-bg rounded-lg">
            <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Cost Breakdown
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-secondary-text">
                <span>Price per lead:</span>
                <span>${category.pricePerLead}</span>
              </div>
              <div className="flex justify-between text-secondary-text">
                <span>Total leads:</span>
                <span>{category.totalLeads}</span>
              </div>
              <div className="flex justify-between text-secondary-text">
                <span>Subtotal:</span>
                <span>${totalCost}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Bulk discount (10%):</span>
                  <span>-${discountAmount}</span>
                </div>
              )}
              <div className="border-t border-[#3A3A3A] pt-2">
                <div className="flex justify-between text-lg font-bold text-primary">
                  <span>Total:</span>
                  <span>${finalCost}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase Button */}
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={() => onPurchase(category.id)}
              className="flex-1 bg-primary text-dark-base hover:bg-primary/90"
            >
              Purchase Pack - ${finalCost}
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="border-[#3A3A3A] text-secondary-text hover:bg-section-bg"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
