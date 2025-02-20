"use client";

import { useTheme } from "@/context/ThemeContext";
import InvoiceForm from "@/components/invoices/invoiceForm";

export default function AddInvoicePage() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`flex h-screen flex-col ${
        isDarkMode ? "bg-gray-800" : "bg-slate-200"
      }`}
    >
      <div className="ml-20 mr-20 mb-20">
        <h2
          className={`text-2xl font-semibold p-4 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Add Invoice
        </h2>
        <div className="p-8 bg-white shadow-md rounded-lg">
          <div className="text-black pb-8 font-bold">Invoice Form</div>
          <InvoiceForm />
        </div>
      </div>
    </div>
  );
}
