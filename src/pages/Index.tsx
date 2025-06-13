
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import LiveScoreboard from '@/components/LiveScoreboard';
import AgentTestimonials from '@/components/AgentTestimonials';
import StatePerformanceChart from '@/components/StatePerformanceChart';
import USHeatMap from '@/components/USHeatMap';
import PricingSection from '@/components/PricingSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-cream">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-cream/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold gradient-text">InsuranceElite</div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="hover:text-light-cream transition-colors">Features</a>
              <a href="#testimonials" className="hover:text-light-cream transition-colors">Testimonials</a>
              <a href="#pricing" className="hover:text-light-cream transition-colors">Pricing</a>
              <Link to="/about" className="hover:text-light-cream transition-colors">About Us</Link>
              <Link to="/contact" className="hover:text-light-cream transition-colors">Contact Us</Link>
            </div>
            <Button className="bg-cream hover:bg-light-cream text-black font-semibold">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Live Scoreboard */}
      <section className="py-16 bg-charcoal/30">
        <div className="container mx-auto px-6">
          <LiveScoreboard />
        </div>
      </section>

      {/* Performance Analytics */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Real-Time Performance Analytics</h2>
            <p className="text-xl text-cream/70 max-w-3xl mx-auto">
              Track live market data, agent performance, and lead opportunities across all 50 states
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <StatePerformanceChart />
            <USHeatMap />
          </div>
        </div>
      </section>

      {/* Agent Testimonials */}
      <section id="testimonials" className="py-20 bg-charcoal/30">
        <div className="container mx-auto px-6">
          <AgentTestimonials />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-6">
          <PricingSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-cream/20">
        <div className="container mx-auto px-6 text-center">
          <div className="text-2xl font-bold gradient-text mb-4">InsuranceElite</div>
          <p className="text-cream/70 mb-6">Empowering insurance agents with premium leads and real-time insights</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-cream/70 hover:text-cream transition-colors">Privacy Policy</a>
            <a href="#" className="text-cream/70 hover:text-cream transition-colors">Terms of Service</a>
            <Link to="/contact" className="text-cream/70 hover:text-cream transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
