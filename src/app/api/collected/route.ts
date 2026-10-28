import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const records = await prisma.collectedRecord.findMany({ orderBy: { scrapedAt: "desc" } });
  return NextResponse.json(records);
}

export async function PATCH(req: Request) {
  const b = await req.json();
  const record = await prisma.collectedRecord.update({ where: { id: b.id }, data: { status: b.status } });
  return NextResponse.json(record);
}
