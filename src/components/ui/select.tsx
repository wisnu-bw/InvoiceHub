"use client";

export function Select({
  children,
  className = "",

  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-red-300 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
