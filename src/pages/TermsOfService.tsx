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
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Order Process</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>All orders are subject to availability and confirmation</li>
              <li>We reserve the right to refuse or cancel any order</li>
              <li>Prices are subject to change without notice</li>
              <li>Payment must be completed before order processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
            <p className="mb-4">You agree to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Use our services only for lawful purposes</li>
              <li>Not engage in any fraudulent activities</li>
            </ul>
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
            <h2 className="text-2xl font-semibold mb-4">Modifications</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. 
              Your continued use of our services constitutes acceptance of the modified terms.
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