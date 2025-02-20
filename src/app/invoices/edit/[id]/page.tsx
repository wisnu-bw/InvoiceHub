"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  CircularProgress,
  SelectChangeEvent,
} from "@mui/material";

export default function EditInvoicePage() {
  const { id } = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState({
    invoiceName: "",
    status: "Pending",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(`/api/invoices/${id}`);
        if (!response.ok) throw new Error("Failed to fetch invoice");
        const data = await response.json();
        setInvoice({ invoiceName: data.invoiceName, status: data.status });
      } catch (error) {
        setError("Failed to load invoice data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvoice((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setInvoice((prev) => ({ ...prev, status: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/invoices/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoice),
      });

      if (!response.ok) throw new Error("Failed to update invoice");

      router.push("/invoices/list");
    } catch (error) {
      setError("Failed to update invoice.");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="gray">
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Edit Invoice
        </Typography>

        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Invoice Name"
            name="invoiceName"
            value={invoice.invoiceName}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />

          <Select
            name="status"
            value={invoice.status}
            onChange={handleSelectChange}
            fullWidth
            displayEmpty
            sx={{ mt: 2, mb: 2 }}
          >
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Unpaid">Unpaid</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>

          <Button type="submit" variant="contained" fullWidth>
            Save Changes
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
