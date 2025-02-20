"use client";

import Link from "next/link";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname(); // Dapatkan path saat ini
  return (
    <aside className="w-40 h-screen bg-gray-900 text-white flex flex-col p-4 center-items">
      <h1 className="text-xl font-extrabold  mb-6 ">InvoiceHub</h1>
      <h2 className="m-8">MENU</h2>
      <nav className="flex flex-col gap-4">
        <Link
          href="/invoices/add"
          className={`p-2 flex items-center  rounded transition ${
            pathname === "/invoices/add" ? "bg-gray-700" : "hover:bg-gray-500"
          }`}
        >
          <MenuOpenIcon />
          Add Invoice
        </Link>
        <Link
          href="/invoices/list"
          className={`p-2 flex items-center  rounded transition ${
            pathname === "/invoices/list" ? "bg-gray-700" : "hover:bg-gray-500"
          }`}
        >
          <MenuOpenIcon />
          My Invoices
        </Link>
      </nav>
    </aside>
  );
}
