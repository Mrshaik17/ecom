import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Video, Package, XCircle, Mail, MessageCircle } from 'lucide-react';

const ReturnsRefunds = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Returns & Refunds Policy</CardTitle>
          <p className="text-center text-muted-foreground">
            Effective Date: {new Date().toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Policy Overview */}
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-destructive mb-3">Important: Limited Exchange Policy</h2>
                <p className="text-sm mb-4">
                  We only accept exchanges under very specific conditions. Please read this policy carefully before making a purchase.
                </p>
                <div className="bg-background/50 rounded p-3">
                  <p className="font-semibold text-destructive text-sm">
                    ❌ NO RETURNS if you simply don't like the product or changed your mind.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* When Exchange is Available */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Package className="h-6 w-6 text-green-600" />
              Exchange Available Only When:
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Wrong Size Dispatched:</strong> You ordered size 7, we sent size 8</li>
                <li><strong>Wrong Color Dispatched:</strong> You ordered black, we sent brown</li>
                <li><strong>Damaged Product:</strong> Product damaged due to our packaging or handling</li>
                <li><strong>Wrong Product:</strong> You received a completely different item</li>
              </ul>
              <div className="mt-4 p-3 bg-white rounded border-l-4 border-green-500">
                <p className="text-sm">
                  <strong>Verification Required:</strong> We will verify if the mistake was from our side. 
                  If confirmed, we'll exchange the product at no extra cost.
                </p>
              </div>
            </div>
          </section>

          {/* Video Requirement */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Video className="h-6 w-6 text-red-600" />
              Mandatory 360° Video Requirement
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-red-100 rounded-full p-2">
                    <Video className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800 mb-2">Video Requirements:</h3>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Complete 360-degree view of the product</li>
                      <li>Video must be continuous and uncut</li>
                      <li>No editing, cutting, or pausing allowed</li>
                      <li>Clear visibility of size tags, labels, and condition</li>
                      <li>Proper lighting to show actual product condition</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded border-l-4 border-red-500">
                  <p className="text-sm font-semibold text-red-700 mb-2">⚠️ Critical Requirements:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Video will be analyzed by our quality control team</li>
                    <li>• Any signs of editing or cutting will result in automatic rejection</li>
                    <li>• Video must be sent within 24 hours of delivery</li>
                    <li>• No exchange processed without genuine, uncut video</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* What's NOT Eligible */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <XCircle className="h-6 w-6 text-red-600" />
              NOT Eligible for Exchange
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Product doesn't fit your preference or style</li>
                <li>You changed your mind after purchase</li>
                <li>Size doesn't fit (when you ordered the correct size)</li>
                <li>Color looks different than expected on screen</li>
                <li>Product used or worn (even once)</li>
                <li>Damage caused by customer mishandling</li>
                <li>Missing original packaging or accessories</li>
                <li>Purchase made more than 7 days ago</li>
              </ul>
            </div>
          </section>

          {/* Exchange Process */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Exchange Process</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <p className="font-medium">Contact Us Within 24 Hours</p>
                  <p className="text-sm text-muted-foreground">Report the issue immediately after delivery</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <p className="font-medium">Send 360° Uncut Video</p>
                  <p className="text-sm text-muted-foreground">Record complete product inspection video</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <p className="font-medium">Team Verification</p>
                  <p className="text-sm text-muted-foreground">Our team will verify if the mistake was from our side</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <p className="font-medium">Exchange Approval</p>
                  <p className="text-sm text-muted-foreground">If verified, we'll arrange pickup and send correct item</p>
                </div>
              </div>
            </div>
          </section>

          {/* Refund Policy */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="font-semibold text-yellow-800 mb-2">⚠️ Refunds Generally Not Available</p>
              <p className="text-sm mb-3">
                We prefer exchanges over refunds. In exceptional cases where exchange is not possible, 
                refunds may be considered subject to:
              </p>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li>Management approval</li>
                <li>Detailed verification process</li>
                <li>Deduction of applicable charges</li>
                <li>7-14 business days processing time</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact for Returns & Exchanges</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Email Support</h3>
                </div>
                <p className="text-sm">returns@houseofstyles.com</p>
                <p className="text-xs text-muted-foreground">Response within 24 hours</p>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold">WhatsApp Support</h3>
                </div>
                <p className="text-sm">+91 12345 67890</p>
                <p className="text-xs text-muted-foreground">Instant support & video submission</p>
              </div>
            </div>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> This policy is designed to ensure fair practices for both customers and House Of Styles. 
              We appreciate your understanding and cooperation in following these guidelines.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReturnsRefunds;