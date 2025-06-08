"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { XCircle } from "react-feather";

export default function CanceledPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  // Memoize the navigation function to prevent unnecessary re-renders
  const handleRedirect = useCallback(() => {
    router.push("/");
  }, [router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Use setTimeout to defer the navigation to the next tick
          setTimeout(() => {
            handleRedirect();
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const sendEmail = async () => {
      try {
        const savedDetails = JSON.parse(localStorage.getItem("productDetails"));
        if (!savedDetails) return;

        await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "cancel",
            address: savedDetails.address,
            email: savedDetails.email,
            productId: savedDetails.productId,
            price: savedDetails.price,
            name: savedDetails.name,
            productImg: savedDetails.image,
          }),
        });
      } catch (error) {
        console.error("Failed to send cancel email:", error);
      }
    };

    sendEmail();

    return () => clearInterval(timer);
  }, [handleRedirect]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", damping: 10 }}
          className="mx-auto mb-6"
        >
          <XCircle
            className="w-24 h-24 text-red-500 mx-auto"
            strokeWidth={1.5}
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-1 bg-red-200 mt-2 rounded-full"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="h-full bg-red-500 rounded-full"
            />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-gray-800 mb-4"
        >
          Payment Canceled
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 mb-6"
        >
          Your payment was not completed. You can try again if you wish.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-gray-500 mb-8"
        >
          Redirecting to homepage in {countdown} seconds...
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition-colors"
          >
            Return Home
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors"
          >
            Try Again
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
