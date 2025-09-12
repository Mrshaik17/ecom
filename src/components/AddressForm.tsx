import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, User, QrCode } from 'lucide-react';

interface AddressFormData {
  fullName: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  alternatePhone: string;
  size?: string;
  color?: string;
}

interface AddressFormProps {
  productName: string;
  productPrice: number;
  onCancel: () => void;
  productVariants?: {
    colors?: string[];
    sizes?: string[];
  };
}

const AddressForm = ({ productName, productPrice, onCancel, productVariants }: AddressFormProps) => {
  const [formData, setFormData] = useState<AddressFormData>({
    fullName: '',
    address: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    alternatePhone: '',
    size: '',
    color: ''
  });

  const [showPayment, setShowPayment] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPayment(true); // ✅ switch to payment section
  };

  const handleInputChange = (field: keyof AddressFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  if (showPayment) {
    // ✅ Payment Screen
    const upiId = "9885522948@ybl"; // 🔹 Your UPI ID
    const upiLink = `upi://pay?pa=${upiId}&pn=Store&am=${productPrice}&cu=INR&tn=${encodeURIComponent(productName)}`;

    return (
      <Card className="w-full max-w-lg mx-auto text-center p-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-center">
            <QrCode className="h-5 w-5" />
            Complete Payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 font-medium">
            Pay ₹{productPrice} for <span className="text-blue-600">{productName}</span>
          </p>

          {/* ✅ QR Code */}
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
              upiLink
            )}&size=220x220`}
            alt="UPI QR Code"
            className="mx-auto mb-4 rounded-lg border p-2"
          />

          {/* ✅ Show UPI ID */}
          <p className="mb-2 font-semibold">UPI ID: {upiId}</p>

          <div className="flex flex-col gap-3">
            {/* UPI Link Button */}
            <Button asChild>
              <a href={upiLink}>
                Try Paying with UPI App
              </a>
            </Button>

            {/* Copy UPI ID fallback */}
            <Button
              variant="outline"
              onClick={() => navigator.clipboard.writeText(upiId)}
            >
              Copy UPI ID
            </Button>

            <Button variant="outline" onClick={() => setShowPayment(false)}>
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ✅ Shipping Form Screen
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Shipping Address
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Variants */}
          {productVariants && (productVariants.colors || productVariants.sizes) && (
            <div className="space-y-4">
              <h3 className="font-medium">Product Variants *</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {productVariants.colors && (
                  <div>
                    <Label htmlFor="color">Color *</Label>
                    <select
                      id="color"
                      value={formData.color}
                      onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                      className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                      required
                    >
                      <option value="">Select Color</option>
                      {productVariants.colors.map((color) => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>
                  </div>
                )}
                {productVariants.sizes && (
                  <div>
                    <Label htmlFor="size">Size *</Label>
                    <select
                      id="size"
                      value={formData.size}
                      onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                      className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                      required
                    >
                      <option value="">Select Size</option>
                      {productVariants.sizes.map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange('fullName')}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange('phone')}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="alternatePhone">Alternate Number</Label>
                  <Input
                    id="alternatePhone"
                    type="tel"
                    value={formData.alternatePhone}
                    onChange={handleInputChange('alternatePhone')}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Shipping Address
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange('address')}
                  placeholder="Enter your complete address"
                  rows={2}
                  required
                />
              </div>
              <div>
                <Label htmlFor="landmark">Landmark</Label>
                <Input
                  id="landmark"
                  value={formData.landmark}
                  onChange={handleInputChange('landmark')}
                  placeholder="Near famous landmark"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={handleInputChange('city')}
                    placeholder="Enter city"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={handleInputChange('state')}
                    placeholder="Enter state"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange('pincode')}
                  placeholder="123456"
                  required
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
            >
              Continue to Payment
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddressForm;
