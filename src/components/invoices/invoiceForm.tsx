"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useCallback } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { DatePicker } from "@mui/x-date-pickers";
import {
  Button,
  InputAdornment,
  MenuItem,
  TextField,
  Alert,
  AlertTitle,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

// Import helper & schema
import { formatCurrency } from "@/utils/formatCurrency";
import { invoiceSchema } from "@/lib/schemas/invoiceSchema";

// Tipe data dari schema
type InvoiceFormData = z.infer<typeof invoiceSchema>;

export default function InvoiceForm() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [amountDisplay, setAmountDisplay] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      invoiceNumber: `INV${Date.now()}`,
      status: "Pending",
    },
  });

  // Format amount
  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const cleanedValue = rawValue.replace(/\D/g, "");
      const numericValue = parseFloat(cleanedValue) || 0;
      setAmountDisplay(formatCurrency(cleanedValue));
      setValue("amount", numericValue, { shouldValidate: true });
    },
    [setValue]
  );

  // Submit data ke API
  const onSubmit = async (data: InvoiceFormData) => {
    try {
      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create invoice");
      }

      setSuccess(true);
      setTimeout(() => router.push("/invoices/list"), 1500);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-6">
        {/* Kiri */}
        <div className="space-y-4">
          {/* Invoice Name */}
          <TextField
            label="Invoice Name"
            fullWidth
            {...register("invoiceName")}
            error={!!errors.invoiceName}
            helperText={errors.invoiceName?.message}
          />

          {/* Due Date */}
          <DatePicker
            label="Due Date"
            value={watch("dueDate") ? new Date(watch("dueDate")) : null}
            onChange={(date) =>
              setValue("dueDate", date ? date.toISOString() : "")
            }
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!errors.dueDate,
                helperText: errors.dueDate?.message,
              },
            }}
          />

          {/* Status */}
          <TextField
            select
            label="Status"
            fullWidth
            {...register("status")}
            defaultValue="Pending"
            error={!!errors.status}
            helperText={errors.status?.message}
          >
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Unpaid">Unpaid</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </TextField>
        </div>

        {/* Kanan */}
        <div className="space-y-4">
          {/* Invoice Number */}
          <TextField
            label="Invoice Number"
            fullWidth
            {...register("invoiceNumber")}
            disabled
            InputProps={{ readOnly: true }}
          />

          {/* Amount */}
          <TextField
            label="Amount"
            fullWidth
            value={amountDisplay}
            onChange={handleAmountChange}
            error={!!errors.amount}
            helperText={errors.amount?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp.</InputAdornment>
              ),
            }}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="contained" color="primary">
          + Add Invoice
        </Button>
      </div>

      {/* Success Alert */}
      {success && (
        <Alert
          icon={<CheckBoxIcon />}
          severity="success"
          sx={{ backgroundColor: "#ecfdf5", color: "#166534" }}
        >
          <AlertTitle>
            <strong>Invoice added successfully!</strong>
          </AlertTitle>
          You can view and manage your invoice in the `My Invoices` section.
        </Alert>
      )}
    </form>
  );
}
