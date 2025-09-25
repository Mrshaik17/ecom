import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Clock, MapPin, Package } from 'lucide-react';

const ShippingInfo = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-2">
            <Truck className="h-8 w-8" />
            Shipping Information
          </CardTitle>
          <p className="text-center text-muted-foreground">
            All over India delivery available
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Delivery Coverage</h2>
            </div>
            <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-4">
              <p className="text-lg font-medium text-success">
                ✅ All Over India Delivery Available
              </p>
              <p className="text-muted-foreground mt-2">
                We deliver to all states and union territories across India, including remote locations.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Delivery Timeline</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Metro Cities</h3>
                <p className="text-muted-foreground">3-5 business days</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Other Cities</h3>
                <p className="text-muted-foreground">5-7 business days</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Remote Areas</h3>
                <p className="text-muted-foreground">7-10 business days</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Express Delivery</h3>
                <p className="text-muted-foreground">1-2 business days (select cities)</p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Shipping Charges</h2>
            </div>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Standard Shipping</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• ₹0 - Free shipping on orders above ₹1,000</li>
                  <li>• ₹99 - Orders below ₹1,000</li>
                  <li>• ₹149 - Cash on Delivery orders</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Express Shipping</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• ₹199 - Express delivery (1-2 days)</li>
                  <li>• Available in Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Order Tracking</h2>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="mb-2">
                <strong>Track Your Order:</strong> Once your order is shipped, you'll receive a tracking number via SMS and email.
              </p>
              <p className="text-muted-foreground">
                You can track your package in real-time using the tracking link provided.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Shipping Partners</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold">Blue Dart</h3>
                <p className="text-sm text-muted-foreground">Express delivery</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold">DTDC</h3>
                <p className="text-sm text-muted-foreground">Standard delivery</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold">India Post</h3>
                <p className="text-sm text-muted-foreground">Remote locations</p>
              </div>
            </div>
          </section>

          <section className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Important Notes</h2>
            <ul className="space-y-2 text-sm">
              <li>• Delivery times may vary during festivals and peak seasons</li>
              <li>• Accurate address and phone number required for successful delivery</li>
              <li>• Orders are processed Monday to Saturday (excluding public holidays)</li>
              <li>• Items will be carefully packed to prevent damage during transit</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
            <div className="bg-muted p-4 rounded-lg">
              <p><strong>Customer Support:</strong></p>
              <p><strong>Email:</strong> shipping@houseofstyles.com</p>
              <p><strong>Phone:</strong> +91 12345 67890</p>
              <p><strong>WhatsApp:</strong> +91 12345 67890</p>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingInfo;