import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Mail, MessageCircle, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect to home after 30 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 30000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600 mb-2">
            Order Placed Successfully!
          </CardTitle>
          <Badge variant="secondary" className="mx-auto bg-green-50 text-green-700">
            Order Confirmed
          </Badge>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground text-lg mb-4">
              Thank you for your purchase! Your order has been received and is being processed.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-muted/30 rounded-lg p-6 space-y-4">
            <h3 className="font-semibold text-lg mb-4">We'll Contact You Soon</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Email Updates</p>
                  <p className="text-sm text-muted-foreground">Order confirmation & tracking</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">Quick delivery updates</p>
                </div>
              </div>
            </div>
          </div>

          {/* What happens next */}
          <div className="text-left space-y-3">
            <h4 className="font-semibold">What happens next?</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                We'll review your order within 24 hours
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                You'll receive payment instructions via email or WhatsApp
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Once payment is confirmed, we'll process and ship your order
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Track your order status through our communication channels
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              asChild 
              className="flex-1"
              variant="outline"
            >
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
            
            <Button 
              asChild 
              className="flex-1"
            >
              <Link to="/contact">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Support
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="text-xs text-muted-foreground pt-4 border-t">
            Need help? Contact us anytime through WhatsApp or email
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;