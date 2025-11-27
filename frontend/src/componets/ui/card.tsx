import React from "react";
import type { ReactNode } from "react";

// Definindo props com children
interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={`border rounded p-4 shadow-sm bg-white ${className ?? ""}`}>
    {children}
  </div>
);

export const CardHeader: React.FC<CardProps> = ({ children, className }) => (
  <div className={`mb-2 ${className ?? ""}`}>{children}</div>
);

export const CardTitle: React.FC<CardProps> = ({ children, className }) => (
  <h2 className={`text-lg font-bold ${className ?? ""}`}>{children}</h2>
);

export const CardContent: React.FC<CardProps> = ({ children, className }) => (
  <div className={`${className ?? ""}`}>{children}</div>
);
