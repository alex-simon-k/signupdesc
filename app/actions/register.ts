"use server"

import { z } from "zod"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, addDoc } from "firebase/firestore"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  schoolEmail: z.string().email("Please enter a valid school email"),
  personalEmail: z.string().email("Please enter a valid personal email"),
  subjects: z.string().min(2, "Please enter your subjects"),
  interests: z.string().min(10, "Please tell us about your interests"),
  agreeToTerms: z.literal(true),
  contactApproval: z.literal(true),
})

// Add this test function
async function testConnection() {
  try {
    // Try to get a single document from registrations collection
    const querySnapshot = await getDocs(collection(db, "registrations"))
    console.log("Firebase connection successful. Collection exists.")
    return true
  } catch (error) {
    console.error("Firebase connection error:", error)
    return false
  }
}

export async function registerStudent(formData: z.infer<typeof formSchema>) {
  try {
    console.log("Starting registration process")
    const validatedData = formSchema.parse(formData)
    console.log("Data validated:", validatedData)

    // Test connection first
    const isConnected = await testConnection()
    if (!isConnected) {
      throw new Error("Could not connect to database")
    }

    // Check if student already exists
    const studentsRef = collection(db, "registrations")
    const q = query(
      studentsRef,
      where("schoolEmail", "==", validatedData.schoolEmail)
    )
    
    console.log("Checking for existing registration")
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      throw new Error("You have already registered with this school email")
    }

    // Store the registration
    const registrationData = {
      name: validatedData.name,
      schoolEmail: validatedData.schoolEmail,
      personalEmail: validatedData.personalEmail,
      subjects: validatedData.subjects,
      interests: validatedData.interests,
      submittedAt: new Date()
    }

    console.log("Saving registration data:", registrationData)
    await addDoc(collection(db, "registrations"), registrationData)
    console.log("Registration saved successfully")

    return { success: true }
  } catch (error) {
    console.error("Registration error:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid form data" }
    }
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Something went wrong" }
  }
}

