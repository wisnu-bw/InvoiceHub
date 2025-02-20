import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newInvoice = await prisma.invoice.create({
      data: {
        invoiceName: body.invoiceName,
        invoiceNumber: body.invoiceNumber,
        dueDate: new Date(body.dueDate),
        amount: body.amount,
        status: body.status,
      },
    });

    return NextResponse.json(newInvoice, { status: 201 });
  } catch (error) {
    console.error("Delete Invoice Error:", error);
    return NextResponse.json(
      { error: "Failed to create invoice" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(invoices, { status: 200 });
  } catch (error) {
    console.error("Delete Invoice Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}
