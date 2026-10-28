const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.teacher.createMany({
    data: [
      { fullName: "Ahmed Hassan", phone: "+20 101 111 2222", email: "ahmed@mail.com", subjects: "Math,Physics", levels: "Grade 9,Grade 10,Grade 11", educationStage: "Secondary", city: "Obour City", yearsExperience: 5, salaryMin: 8000, salaryMax: 12000, availability: "Immediate", verified: true },
      { fullName: "Sara Ali", phone: "+20 102 222 3333", email: "sara@mail.com", subjects: "English", levels: "Grade 7,Grade 8", educationStage: "Prep", city: "Nasr City", yearsExperience: 3, salaryMin: 6000, salaryMax: 9000, availability: "1 month", verified: true },
      { fullName: "Mona Youssef", phone: "+20 103 333 4444", subjects: "Arabic", levels: "Grade 1,Grade 2,Grade 3", educationStage: "Primary", city: "New Cairo", yearsExperience: 7, salaryMin: 7000, salaryMax: 10000, availability: "Immediate", verified: false },
    ],
  });

  const school = await prisma.school.create({
    data: { name: "Al-Noor Private School", type: "Private School", city: "Nasr City", contactPerson: "Mrs. Sara", phone: "+20 111 000 1111", email: "school@alnoor.com", verified: true },
  });

  await prisma.vacancy.createMany({
    data: [
      { schoolId: school.id, subject: "English", level: "Grade 7", educationStage: "Prep", location: "Nasr City", salaryMin: 10000, salaryMax: 15000, requirements: "B.Ed, 3+ years", status: "Open" },
      { schoolId: school.id, subject: "Math", level: "Grade 9", educationStage: "Secondary", location: "Nasr City", salaryMin: 12000, salaryMax: 18000, requirements: "B.Sc + teaching diploma", status: "Open" },
    ],
  });

  await prisma.payment.createMany({
    data: [
      { schoolName: "Al-Noor Private School", type: "Lead", amount: 300, method: "Instapay", status: "Paid" },
      { schoolName: "Al-Noor Private School", type: "Success", amount: 2500, method: "Fawry", status: "Pending" },
    ],
  });

  await prisma.collectedRecord.createMany({
    data: [
      { source: "Facebook group", kind: "Teacher", name: "Khaled Omar", subject: "Physics", city: "Obour City", phone: "+20 104 444 5555", status: "Pending" },
      { source: "Job board", kind: "Vacancy", name: "English Teacher - Al-Amal School", subject: "English", city: "New Cairo", status: "Pending" },
    ],
  });

  console.log("Seed done");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
