"use client";

export function Input({
  type = "text",
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${className}`}
      {...props}
    />
  );
}
