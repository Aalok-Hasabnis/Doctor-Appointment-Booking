import { Badge } from '@/components/ui/badge';
import Pricing from '@/components/ui/pricing';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const PricingPage = () => {
  return (
    <div className="container mx-auto my-2 px-4 py-12">
      {/* Back Button */}
      <div className="flex mb-8">
        <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md shadow hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
        >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
        </Link>
    </div>

      {/* Heading Section */}
      <div className="max-w-full mx-auto mb-16 text-center">
        <Badge
          variant="outline"
          className="bg-emerald-900/30 border-emerald-700/30 px-4 py-2 text-emerald-400 text-sm font-medium mb-4"
        >
          Affordable Healthcare Plans
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold gradient-title mb-4">
          Transparent & Flexible Pricing
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select the ideal consultation plan tailored to your health and wellness needs. No hidden fees, just care that fits your lifestyle.
        </p>
      </div>

      {/* Pricing Section */}
      <Pricing />

      {/* Static Help Text */}
      <div className="text-center mt-16">
        <p className="text-white font-semibold text-2xl">
          For any queries or assistance, 
          feel free to reach out to our support team.
        </p>
      </div>
    </div>
  );
};

export default PricingPage;
