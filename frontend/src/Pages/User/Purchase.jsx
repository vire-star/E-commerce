// src/pages/PurchaseSuccessPage.jsx
import { Button } from "@/components/ui/button";
import { usePaymentHook } from "@/hooks/Product/product.hook";
import React, { useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
// import { usePaymentHook } from "@/hooks/usePayment";

const PurchaseSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutate: confirmPayment, isLoading, isSuccess } = usePaymentHook();
  
  // ✅ YAHAN ADD KARO - Prevent duplicate API calls
//   const hasCalledRef = useRef(false);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    // ✅ Check: already call ho chuki hai kya?
    if (sessionId ) {
    //   hasCalledRef.current = true; // Mark as called
      console.log("Calling payment confirmation for:", sessionId);
      confirmPayment(sessionId);
    }
  }, [searchParams, confirmPayment]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => navigate("/"), 3000);
    }
  }, [isSuccess, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {isLoading && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium">Processing your order...</p>
        </div>
      )}

      
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-4">
            Your order has been placed and cart cleared.
          </p>
          <p className="text-sm text-gray-500">Redirecting to home</p>
          <Link to={'/'}>
          <Button>
            home
          </Button>
          </Link>
        </div>
      
    </div>
  );
};

export default PurchaseSuccessPage;
