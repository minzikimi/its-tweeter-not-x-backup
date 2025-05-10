"use client"; 

//if i have time refactor..

import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps {

  name: string;
  errors?: string[];
  icon?: ReactNode; 
  minLength?: number;  
  maxLength?: number;
}

export default function Input({
  type,
  placeholder,
  required = false,
  name,
  errors = [],
  icon,
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          id={name}
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className={`mt-1 p-3 w-full border border-neutral-700 bg-neutral-900 text-white rounded-md 
            focus:ring-neutral-300 focus:border-neutral-200 
            placeholder:text-neutral-400 transition
            ${icon ? "pl-10" : ""}`}
        />
      </div>

      {errors.map((error, index) => (
        <span key={index} className="text-red-500 text-sm">
          {error}
        </span>
      ))}
    </div>
  );
}
