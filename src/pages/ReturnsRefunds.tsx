import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, Shield, AlertTriangle, Video } from 'lucide-react';

const ReturnsRefunds = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-2">
            <RotateCcw className="h-8 w-8" />
            Returns & Refund Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Our Exchange Policy</h2>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4">
              <p className="font-medium mb-2">
                We only exchange products if there is a mistake from our side.
              </p>
              <p className="text-muted-foreground">
                This includes dispatching wrong size, wrong color, or wrong product from our end.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Exchange Conditions:</h3>
              <ul className="space-y-2 list-disc pl-6">
                <li>Wrong size dispatched (e.g., you ordered size 7, we sent size 8)</li>
                <li>Wrong color dispatched (e.g., you ordered black, we sent brown)</li>
                <li>Wrong product dispatched (completely different item)</li>
                <li>Damaged product received due to shipping</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <Video className="h-6 w-6 text-warning" />
              <h2 className="text-2xl font-semibold">Mandatory Video Requirement</h2>
            </div>
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">📹 100% Opening Video Required</h3>
              <p className="mb-2">
                <strong>IMPORTANT:</strong> You must record a complete 360-degree unboxing video without any cuts or stops.
              </p>
              <ul className="space-y-2 list-disc pl-6 text-sm">
                <li>Video must show the sealed package before opening</li>
                <li>Continuous recording - no cuts, stops, or editing</li>
                <li>Show all sides of the product (360-degree view)</li>
                <li>Clear visibility of size tags, color, and any defects</li>
                <li>Video must be taken in good lighting</li>
              </ul>
              <p className="mt-3 text-sm font-medium">
                ⚠️ Without proper unboxing video, exchange/return requests will not be processed.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <h2 className="text-2xl font-semibold">What We DON'T Exchange</h2>
            </div>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <h3 className="font-semibold mb-3">❌ No Returns/Exchanges For:</h3>
              <ul className="space-y-2 list-disc pl-6">
                <li><strong>Change of mind:</strong> "I don't like it anymore"</li>
                <li><strong>Wrong size selection:</strong> If you ordered the wrong size yourself</li>
                <li><strong>Color preference:</strong> "It looks different than expected"</li>
                <li><strong>Fit issues:</strong> Personal fit preferences</li>
                <li><strong>Style issues:</strong> "It doesn't suit me"</li>
                <li><strong>Buyer's remorse:</strong> Any regret after purchase</li>
              </ul>
              <p className="mt-3 font-medium">
                Please check sizes, colors, and product details carefully before ordering.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Exchange Process</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h3 className="font-semibold">Contact Us</h3>
                    <p className="text-sm text-muted-foreground">Within 24 hours of delivery via WhatsApp or email</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h3 className="font-semibold">Send Video</h3>
                    <p className="text-sm text-muted-foreground">Share the complete unboxing video</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h3 className="font-semibold">Verification</h3>
                    <p className="text-sm text-muted-foreground">We'll verify if it's our mistake</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h3 className="font-semibold">Exchange</h3>
                    <p className="text-sm text-muted-foreground">If verified, we'll arrange exchange</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Timeline</h2>
            <div className="bg-muted p-4 rounded-lg">
              <ul className="space-y-2">
                <li><strong>Report Issue:</strong> Within 24 hours of delivery</li>
                <li><strong>Video Submission:</strong> Within 48 hours of delivery</li>
                <li><strong>Verification:</strong> 1-2 business days</li>
                <li><strong>Exchange Processing:</strong> 3-5 business days (if approved)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>
            <div className="bg-info/10 border border-info/20 rounded-lg p-4">
              <p className="mb-2">
                <strong>Refunds are processed only in case of:</strong>
              </p>
              <ul className="space-y-1 list-disc pl-6">
                <li>Product is damaged beyond exchange</li>
                <li>Incorrect product cannot be exchanged</li>
                <li>Product is defective from manufacturer</li>
              </ul>
              <p className="mt-3 text-sm">
                Refunds will be processed to the original payment method within 5-7 business days after approval.
              </p>
            </div>
          </section>

          <section className="bg-gradient-to-r from-primary/5 to-secondary/5 border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Contact for Returns/Exchanges</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">📧 Email Support</h3>
                <p>returns@houseofstyles.com</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📱 WhatsApp Support</h3>
                <p>+91 12345 67890</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Please include your order number, contact details, and unboxing video when contacting us.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReturnsRefunds;