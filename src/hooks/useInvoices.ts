import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface Invoice {
  id: string;
  invoiceName: string;
  invoiceNumber: string;
  dueDate: string;
  status: "Paid" | "Unpaid" | "Pending";
  amount: number;
}

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const searchParams = useSearchParams();
  const filterStatus = searchParams.get("status") || "";
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("/api/invoices");
        if (!response.ok) throw new Error("Failed to fetch invoices");
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInvoices();
  }, []);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus ? invoice.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  return { invoices: filteredInvoices, setInvoices };
}
