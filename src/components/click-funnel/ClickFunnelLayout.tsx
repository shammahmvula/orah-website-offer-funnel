import { ReactNode } from 'react';
import clickFunnelBg from '@/assets/click-funnel-bg.jpg';
import orahLogo from '@/assets/orah-logo.png';

interface ClickFunnelLayoutProps {
  children: ReactNode;
}

export function ClickFunnelLayout({ children }: ClickFunnelLayoutProps) {
  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${clickFunnelBg})` }}
      />
      <div className="absolute inset-0 bg-primary/80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Logo */}
        <div className="flex justify-center pt-6 pb-2">
          <img src={orahLogo} alt="Orah" className="h-10 md:h-12" />
        </div>

        {/* Headline */}
        <div className="text-center px-4 pb-4">
          <h1 className="font-serif text-2xl md:text-4xl text-primary-foreground font-bold leading-tight max-w-2xl mx-auto">
            Every Day Your Website Looks Like It Was Made In 2012, You're Losing Money
          </h1>
          <p className="text-primary-foreground/80 mt-3 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Your website can be your best salesperson, or your worst enemy. That's why businesses with worse service than yours are getting all the customers... because your work is 5 stars but your website is 2 stars. That's the problem.
          </p>
          <p className="text-primary-foreground/90 mt-3 text-sm md:text-base max-w-xl mx-auto font-medium">
            Answer a few quick questions and see if you qualify for a free web design mockup for your business from us. Your dream website is closer than you think!
          </p>
        </div>

        {/* Survey card area */}
        <div className="flex-1 flex items-start justify-center px-4 pb-6">
          {children}
        </div>

        {/* Facebook disclaimer */}
        <div className="relative z-10 text-center px-4 py-4">
          <p className="text-primary-foreground/50 text-[10px] md:text-xs max-w-lg mx-auto leading-relaxed">
            This site is not a part of the Facebook website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
          </p>
        </div>
      </div>
    </div>
  );
}
