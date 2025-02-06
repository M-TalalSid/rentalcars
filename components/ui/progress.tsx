import React from "react";
import { cn } from "@/lib/utils"; // Utility for conditional classNames

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // Progress value (0 to 100)
  label?: boolean; // Whether to show the label
  className?: string; // Additional custom classes
}

const Progress: React.FC<ProgressProps> = ({ value, label = false, className, ...props }) => {
  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="relative w-full h-4 bg-gray-200 rounded-lg overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300 ease-in-out"
          style={{ width: `${value}%` }}
        />
      </div>
      {label && (
        <div className="mt-2 text-sm text-center text-gray-700">
          {value}% Complete
        </div>
      )}
    </div>
  );
};

export default Progress;
