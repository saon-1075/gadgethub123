import React from 'react';
import { Truck, ShieldCheck, Clock, RotateCcw } from 'lucide-react';

const features = [
  {
    name: 'Fast Delivery',
    description: 'Free shipping over ₹2000',
    icon: Truck,
  },
  {
    name: 'Secure Payment',
    description: '100% protected checkout',
    icon: ShieldCheck,
  },
  {
    name: '24/7 Support',
    description: 'Dedicated support team',
    icon: Clock,
  },
  {
    name: 'Easy Returns',
    description: 'Simple 30-day policy',
    icon: RotateCcw,
  },
];

export default function TrustBar() {
  return (
    <div className="bg-gray-900 border-y-4 border-gray-800">
      <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {features.map((feature) => (
            <div key={feature.name} className="text-center sm:flex sm:text-left lg:block lg:text-center">
              <div className="sm:flex-shrink-0">
                <div className="flow-root">
                  <div className="border-2 border-green-400 p-3 inline-block bg-black/50" style={{ imageRendering: 'pixelated' }}>
                    <feature.icon className="h-8 w-8 text-green-400" aria-hidden="true" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-6 lg:mt-4 lg:ml-0">
                <h3 className="text-sm font-bold text-white tracking-wider uppercase font-mono" style={{ textShadow: '1px 1px #000' }}>
                  {feature.name}
                </h3>
                <p className="mt-1 text-sm text-gray-400 font-mono">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
