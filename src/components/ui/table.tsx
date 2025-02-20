"use client";

export function Table({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <table className={`w-full border-collapse ${className}`}>{children}</table>
  );
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return <thead className="bg-gray-100">{children}</thead>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className="border-t">{children}</tr>;
}

export function TableHeaderCell({ children }: { children: React.ReactNode }) {
  return <th className="p-2 text-left font-medium">{children}</th>;
}

export function TableCell({ children }: { children: React.ReactNode }) {
  return <td className="p-2 text-gray-800">{children}</td>;
}
