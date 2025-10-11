import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Terms of Service</CardTitle>
          <p className="text-center text-muted-foreground">
            Effective Date: {new Date().toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using House Of Styles website and services, you accept and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Products and Services</h2>
            <p className="mb-4">
              House Of Styles specializes in premium imported watches, shoes, clothing, and gadgets for men. We strive to provide 
              accurate product descriptions and images, but we do not guarantee that all details are completely accurate.
            </p>
            <div className="bg-muted/50 border border-muted-foreground/20 rounded-lg p-4 mb-4">
              <h3 className="font-semibold mb-2">🏷️ Product Quality & Authenticity</h3>
              <p className="mb-2">
                At House Of Styles, we pride ourselves on offering diverse product ranges to meet various customer preferences and budgets:
              </p>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li><strong>Master Copy Products:</strong> High-quality replicas that closely resemble premium branded items at affordable prices. These products offer excellent value and aesthetic appeal while maintaining good quality standards.</li>
                <li><strong>Copy Version Products:</strong> Budget-friendly alternatives inspired by popular brands, providing style-conscious options for value seekers.</li>
                <li><strong>Original Branded Products:</strong> 100% authentic products from renowned international and national brands, complete with proper documentation, warranty, and brand certification.</li>
              </ul>
              <p className="text-xs mt-2 text-muted-foreground">
                <strong>Note:</strong> Each product listing clearly indicates its category. We are transparent about product authenticity and encourage customers to review product descriptions carefully before purchasing.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Order Process</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>All orders are subject to availability and confirmation</li>
              <li>We reserve the right to refuse or cancel any order</li>
              <li>Prices are subject to change without notice</li>
              <li>Payment must be completed before order processing</li>
              <li>No returns accepted if you simply don't like the product</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Returns & Exchange Policy</h2>
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-warning mb-2">⚠️ Important Return Policy</h3>
              <p className="mb-2">Returns and exchanges are ONLY available if:</p>
              <ul className="list-disc pl-6 mb-2">
                <li>We dispatch wrong size or color from our side</li>
                <li>Product is damaged due to our packaging/handling</li>
                <li>You receive a different product than ordered</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                <strong>No returns if you don't like the product or it's your fault.</strong>
              </p>
            </div>
            
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <h3 className="font-semibold text-destructive mb-2">📹 360° Video Required</h3>
              <p className="mb-2">For ANY return or exchange request:</p>
              <ul className="list-disc pl-6 text-sm">
                <li>Mandatory 360-degree uncut video of the product required</li>
                <li>Video must be continuous without any cuts or editing</li>
                <li>Our team will verify the video for authenticity</li>
                <li>No returns/exchanges processed without genuine video</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
            <p className="mb-4">You agree to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Use our services only for lawful purposes</li>
              <li>Not engage in any fraudulent activities</li>
              <li>Provide uncut 360° video for any return/exchange claims</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>
            <p className="mb-4 text-destructive font-semibold">
              Refunds are generally not available. We prefer exchanges when eligible.
            </p>
            <p className="mb-4">
              In exceptional cases where refund is considered, it will be subject to our verification process 
              and management approval.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <p className="mb-4">
              All content on this website, including but not limited to text, graphics, logos, images, and software, 
              is the property of House Of Styles and is protected by intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="mb-4">
              House Of Styles shall not be liable for any indirect, incidental, special, or consequential damages 
              resulting from the use or inability to use our services or products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <div className="bg-muted p-4 rounded-lg">
              <p><strong>Email:</strong> support@houseofstyles.com</p>
              <p><strong>Phone:</strong> +91 12345 67890</p>
              <p><strong>Address:</strong> House Of Styles, Mumbai, India</p>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfService;