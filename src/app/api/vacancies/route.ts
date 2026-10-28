import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const jobs = await prisma.vacancy.findMany({ include: { school: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  const b = await req.json();
  let school = await prisma.school.findFirst({ where: { phone: b.phone } });
  if (!school) {
    school = await prisma.school.create({
      data: {
        name: b.schoolName,
        type: b.schoolType || "Private School",
        city: b.city,
        contactPerson: b.contactPerson || null,
        phone: b.phone,
        email: b.email || null,
        verified: false,
      },
    });
  }
  const vacancy = await prisma.vacancy.create({
    data: {
      schoolId: school.id,
      subject: b.subject,
      level: b.level,
      educationStage: b.educationStage,
      location: b.location,
      salaryMin: b.salaryMin ? parseInt(b.salaryMin) : null,
      salaryMax: b.salaryMax ? parseInt(b.salaryMax) : null,
      requirements: b.requirements || null,
      status: "Open",
    },
  });
  return NextResponse.json(vacancy);
}

export async function PATCH(req: Request) {
  const b = await req.json();
  const vacancy = await prisma.vacancy.update({ where: { id: b.id }, data: { status: b.status } });
  return NextResponse.json(vacancy);
}
