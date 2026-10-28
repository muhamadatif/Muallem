import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const teachers = await prisma.teacher.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(teachers);
}

export async function POST(req: Request) {
  const b = await req.json();
  const teacher = await prisma.teacher.create({
    data: {
      fullName: b.fullName,
      phone: b.phone,
      email: b.email || null,
      subjects: b.subjects,
      levels: b.levels,
      educationStage: b.educationStage,
      city: b.city,
      yearsExperience: parseInt(b.yearsExperience) || 0,
      salaryMin: b.salaryMin ? parseInt(b.salaryMin) : null,
      salaryMax: b.salaryMax ? parseInt(b.salaryMax) : null,
      availability: b.availability || "Immediate",
      verified: false,
    },
  });
  return NextResponse.json(teacher);
}

export async function PATCH(req: Request) {
  const b = await req.json();
  const teacher = await prisma.teacher.update({ where: { id: b.id }, data: { verified: b.verified } });
  return NextResponse.json(teacher);
}
