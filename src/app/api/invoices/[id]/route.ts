import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


const getInvoiceIdFromUrl = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split("/").pop(); 
};


export async function GET(req: Request) {
  try {
    const id = getInvoiceIdFromUrl(req);
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const invoice = await prisma.invoice.findUnique({ where: { id } });
    if (!invoice) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

    return NextResponse.json(invoice, { status: 200 });
  } catch (error) {
    console.error("Fetch Invoice Error:", error);
    return NextResponse.json({ error: "Failed to fetch invoice" }, { status: 500 });
  }
}


export async function DELETE(req: Request) {
  try {
    const id = getInvoiceIdFromUrl(req);
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await prisma.invoice.delete({ where: { id } });

    return NextResponse.json({ message: "Invoice deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete Invoice Error:", error);
    return NextResponse.json({ error: "Failed to delete invoice" }, { status: 500 });
  }
}


export async function PUT(req: Request) {
  try {
    const id = getInvoiceIdFromUrl(req);
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const { invoiceName, status } = await req.json();

    
    if (!invoiceName || !status) {
      return NextResponse.json({ error: "Invoice name and status are required" }, { status: 400 });
    }

    if (!["Paid", "Unpaid", "Pending"].includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const updatedInvoice = await prisma.invoice.update({
      where: { id },
      data: { invoiceName, status },
    });

    return NextResponse.json(updatedInvoice, { status: 200 });
  } catch (error) {
    console.error("Update Invoice Error:", error);
    return NextResponse.json({ error: "Failed to update invoice" }, { status: 500 });
  }
}
