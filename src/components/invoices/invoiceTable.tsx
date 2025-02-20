import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  Chip,
} from "@mui/material";
import { formatDate } from "@/utils/dateFormatter";
import { formatCurrency } from "@/utils/format";
import InvoiceActions from "@/components/invoices/InvoiceActions";

interface Invoice {
  id: string;
  invoiceName: string;
  invoiceNumber: string;
  dueDate: string;
  status: "Paid" | "Unpaid" | "Pending";
  amount: number;
}

interface InvoiceTableProps {
  invoices: Invoice[];
  onDelete: (id: string) => void;
}

export default function InvoiceTable({
  invoices,
  onDelete,
}: InvoiceTableProps) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Invoice</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>
                <div>
                  <span className="font-medium">{invoice.invoiceName}</span>
                  <br />
                  <span className="text-gray-500 text-sm">
                    {invoice.invoiceNumber}
                  </span>
                </div>
              </TableCell>
              <TableCell>{formatDate(invoice.dueDate)}</TableCell>
              <TableCell>
                <Chip
                  label={invoice.status}
                  size="small"
                  sx={{
                    fontWeight: "bold",
                    backgroundColor:
                      invoice.status === "Paid"
                        ? "rgba(134, 239, 172, 0.5)"
                        : invoice.status === "Unpaid"
                        ? "rgba(254, 202, 202, 0.5)"
                        : "rgba(253, 230, 138, 0.5)",
                    color:
                      invoice.status === "Paid"
                        ? "#16a34a"
                        : invoice.status === "Unpaid"
                        ? "#dc2626"
                        : "#ca8a04",
                  }}
                />
              </TableCell>
              <TableCell>{formatCurrency(invoice.amount)}</TableCell>
              <TableCell>
                <InvoiceActions invoiceId={invoice.id} onDelete={onDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
