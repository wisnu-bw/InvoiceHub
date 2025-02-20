// components/InvoiceActions.tsx
"use client";

import { useRouter } from "next/navigation";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert, Edit, Delete } from "@mui/icons-material";
import { useState } from "react";

interface InvoiceActionsProps {
  invoiceId: string;
  onDelete: (id: string) => void;
}

const InvoiceActions: React.FC<InvoiceActionsProps> = ({
  invoiceId,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => router.push(`/invoices/edit/${invoiceId}`)}>
          <Edit fontSize="small" className="mr-2" /> Edit
        </MenuItem>

        <MenuItem onClick={() => onDelete(invoiceId)} sx={{ color: "red" }}>
          <Delete fontSize="small" className="mr-2" /> Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default InvoiceActions;
