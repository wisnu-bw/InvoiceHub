"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useInvoices } from "@/hooks/useInvoices";
import InvoiceTable from "@/components/invoices/invoiceTable";
import { useTheme } from "@/context/ThemeContext";

export default function MyInvoicesPage() {
  const { invoices, setInvoices } = useInvoices();
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    router.push(`?search=${query}&status=${filterStatus}`);
  };

  const handleStatusChange = (e: SelectChangeEvent<string>) => {
    const status = e.target.value;
    setFilterStatus(status);
    router.push(`?search=${searchQuery}&status=${status}`);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/invoices/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete invoice");
      setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`flex h-screen ${isDarkMode ? "bg-gray-800" : "bg-slate-200"}`}
    >
      <div className="flex-auto flex flex-col p-8 pr-20 pl-20 rounded-sm">
        <div className="flex items-center justify-between mb-4">
          <h2
            className={`text-2xl font-semibold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            My Invoices
          </h2>
          <div className="flex gap-4">
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">🔍</InputAdornment>
                ),
              }}
              sx={{
                width: 170,
                backgroundColor: "white",
                borderRadius: 3,
                "& .MuiOutlinedInput-root": {
                  height: 40,
                  borderRadius: 3,
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1565c0",
                    borderWidth: 2,
                  },
                },
              }}
            />
            <Select
              value={filterStatus}
              onChange={handleStatusChange}
              displayEmpty
              variant="outlined"
              sx={{
                height: 40,
                width: 150,
                backgroundColor: "white",
                borderRadius: 3,
              }}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="Unpaid">Unpaid</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </div>
        </div>

        <InvoiceTable invoices={invoices} onDelete={handleDelete} />
      </div>
    </div>
  );
}
