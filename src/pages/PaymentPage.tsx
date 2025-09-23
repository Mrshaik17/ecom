import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";

interface PaymentPageProps {
  amount: number;
}

const PaymentPage = ({ amount }: PaymentPageProps) => {
  const [upiUrl, setUpiUrl] = useState("");

  useEffect(() => {
    // ✅ Get saved address from localStorage
    const savedAddress = localStorage.getItem("checkoutAddress");
    console.log("User Details:", savedAddress);

    // ✅ Replace with your UPI ID
    const upiId = "yourupiid@upi";

    // ✅ Auto-generate UPI Payment Link
    const url = `upi://pay?pa=${upiId}&pn=Your+Store&am=${amount}&cu=INR`;
    setUpiUrl(url);
  }, [amount]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
      
      {/* QR Code */}
      <QRCodeSVG value={upiUrl} size={200} />

      <p className="mt-4">Scan QR or click below:</p>

      {/* UPI Redirect */}
      <Button className="mt-4" onClick={() => window.location.href = upiUrl}>
        Pay with PhonePe / Google Pay / Paytm
      </Button>
    </div>
  );
};

export default PaymentPage;
