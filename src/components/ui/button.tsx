"use client";

export function Button({
  children,
  onClick,
  className = "",
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 w-40 rounded-sm text-white bg-blue-700 hover:bg-blue-800 transition ${className}`}
    >
      {children}
    </button>
  );
}
