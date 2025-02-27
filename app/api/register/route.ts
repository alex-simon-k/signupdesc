import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(2),
  schoolEmail: z.string().email(),
  personalEmail: z.string().email(),
  subjects: z.string().min(2),
  interests: z.string().min(10),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedData = formSchema.parse(body)

    const existingStudent = await prisma.student.findFirst({
      where: {
        OR: [{ schoolEmail: validatedData.schoolEmail }, { personalEmail: validatedData.personalEmail }],
      },
    })

    if (existingStudent) {
      return NextResponse.json({ error: "A student with this email already exists" }, { status: 400 })
    }

    const student = await prisma.student.create({
      data: validatedData,
    })

    return NextResponse.json({ data: student }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

