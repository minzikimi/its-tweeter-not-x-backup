import React from "react";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`inline-block ${className}`}>
      <h1
        className="text-white text-3xl font-extrabold select-none tracking-widest"
        style={{ letterSpacing: "0.35em" }}
      >
        <span>ITS-</span>
        <motion.span
          className="border-b-4 border-white pb-2 px-1 inline-block"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          whileHover={{ scale: 1.08, color: "#7ff5dd" }}
        >
          TWEETER
        </motion.span>
        <span>-NOT-X</span>
      </h1>
    </div>
  );
}
