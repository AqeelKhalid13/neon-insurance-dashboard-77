
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Phone, Package, CheckCircle, Clock, DollarSign, ArrowRight } from 'lucide-react';
import { LeadCategoriesModal } from './LeadCategoriesModal';
import { useToast } from '@/hooks/use-toast';

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
  shortDescription: string;
}

const leadCategories: LeadCategory[] = [
  {
    id: '1',
    name: 'Mortgage Protection Leads',
    type: 'mortgage-protection',
    shortDescription: 'Exclusive high intent leads for mortgage protection insurance',
    description: 'Premium mortgage protection leads from people who actively requested information about protecting their mortgage payments. These leads show strong intent to purchase and are exclusively yours.',
    included: [
      'Verified contact information',
      'Mortgage details and loan amount',
      'Income verification status',
      'Best time to contact preferences',
      'Lead source and campaign details',
      'TCPA compliant consent records'
    ],
    deliveryTime: 'Instantly upon purchase',
    pricePerLead: 25,
    totalLeads: 10,
    isExclusive: true,
    isHighIntent: true,
    isOtpVerified: false
  },
  {
    id: '2',
    name: 'OTP & Non-OTP Mix',
    type: 'otp-non-otp',
    shortDescription: 'Balanced pack of verified and non-verified high intent leads',
    description: 'A cost-effective mix of OTP verified and non-OTP verified leads. All leads are exclusive and show high intent, giving you variety in your outreach strategy.',
    included: [
      '50% OTP verified phone numbers',
      '50% non-verified but validated leads',
      'Email addresses for all leads',
      'Geographic and demographic data',
      'Interest level scoring',
      'Compliance documentation'
    ],
    deliveryTime: 'Within 2 hours of purchase',
    pricePerLead: 18,
    totalLeads: 15,
    isExclusive: true,
    isHighIntent: true,
    isOtpVerified: false
  },
  {
    id: '3',
    name: 'OTP Verified Leads',
    type: 'otp-verified',
    shortDescription: 'Premium leads with verified phone numbers and high intent',
    description: 'Top-tier leads with OTP verified phone numbers. These prospects not only showed interest but also confirmed their contact information, ensuring maximum reachability.',
    included: [
      '100% OTP verified phone numbers',
      'Real-time lead validation',
      'Multiple contact attempts data',
      'Demographic and psychographic profiles',
      'Purchase intent scoring',
      'Full compliance audit trail'
    ],
    deliveryTime: 'Instantly upon purchase',
    pricePerLead: 30,
    totalLeads: 8,
    isExclusive: true,
    isHighIntent: true,
    isOtpVerified: true
  }
];

export function LeadCategoriesSection() {
  const [selectedCategory, setSelectedCategory] = useState<LeadCategory | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { toast } = useToast();

  const handleCategoryClick = (category: LeadCategory) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handlePurchase = (categoryId: string) => {
    const category = leadCategories.find(c => c.id === categoryId);
    if (category) {
      toast({
        title: "Purchase Successful",
        description: `You have successfully purchased ${category.name}. Leads will be delivered ${category.deliveryTime.toLowerCase()}.`,
      });
    }
    setShowModal(false);
    setSelectedCategory(null);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'mortgage-protection':
        return <Shield className="h-6 w-6 text-primary" />;
      case 'otp-verified':
        return <Phone className="h-6 w-6 text-primary" />;
      default:
        return <Package className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <>
      <Card className="bg-elevated border-[#3A3A3A]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Lead Categories
          </CardTitle>
          <p className="text-secondary-text">
            Choose from our premium lead packages designed for maximum conversion
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
            {leadCategories.map((category) => (
              <div
                key={category.id}
                className="p-6 bg-section-bg rounded-lg border border-[#3A3A3A] hover:border-primary/50 transition-colors cursor-pointer group"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(category.type)}
                    <div>
                      <h3 className="font-bold text-primary text-lg group-hover:text-primary/90">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-secondary-text group-hover:text-primary transition-colors" />
                </div>

                <p className="text-secondary-text text-sm mb-4 line-clamp-2">
                  {category.shortDescription}
                </p>

                {/* Lead Type Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.isExclusive && (
                    <Badge className="bg-success/20 text-success border-success/50 text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Exclusive
                    </Badge>
                  )}
                  {category.isHighIntent && (
                    <Badge className="bg-primary/20 text-primary border-primary/50 text-xs">
                      High Intent
                    </Badge>
                  )}
                  {category.isOtpVerified && (
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/50 text-xs">
                      OTP Verified
                    </Badge>
                  )}
                </div>

                {/* Quick Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary-text flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      Price per lead:
                    </span>
                    <span className="text-primary font-semibold">${category.pricePerLead}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary-text flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      Total leads:
                    </span>
                    <span className="text-primary font-semibold">{category.totalLeads}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary-text flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Delivery:
                    </span>
                    <span className="text-primary font-semibold">
                      {category.deliveryTime.includes('Instantly') ? 'Instant' : '2 hours'}
                    </span>
                  </div>
                </div>

                {/* Total Cost */}
                <div className="pt-4 border-t border-[#3A3A3A]">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">Total Cost:</span>
                    <span className="text-xl font-bold text-primary">
                      ${category.pricePerLead * category.totalLeads}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <LeadCategoriesModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedCategory(null);
        }}
        category={selectedCategory}
        onPurchase={handlePurchase}
      />
    </>
  );
}
