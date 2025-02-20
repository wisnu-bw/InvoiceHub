import { z } from "zod";

export const invoiceSchema = z.object({
  invoiceName: z
    .string()
    .min(3, "Invoice name must be at least 3 characters")
    .max(50, "Nama faktur tidak boleh lebih dari 50 karakter")
    .regex(/^[a-zA-Z0-9\s.,-]+$/, "Nama faktur tidak boleh mengandung karakter khusus"),
  invoiceNumber: z.string().nonempty(),
  dueDate: z.string().nonempty(),
  amount: z.coerce.number().min(1000, "Minimal amount adalah Rp 1.000").max(100000000, "Maksimal amount adalah Rp 100.000.000"),
  status: z.enum(["Paid", "Unpaid", "Pending"]),
});
