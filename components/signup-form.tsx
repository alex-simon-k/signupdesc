"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CheckCircle2, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { registerStudent } from "@/app/actions/register"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  schoolEmail: z.string().email("Please enter a valid school email"),
  personalEmail: z.string().email("Please enter a valid personal email"),
  subjects: z.string().min(2, "Please enter your subjects"),
  interests: z.string().min(10, "Please tell us about your interests (minimum 10 characters)"),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
  contactApproval: z.literal(true, {
    errorMap: () => ({ message: "You must approve to being contacted" }),
  }),
})

export function SignupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      schoolEmail: "",
      personalEmail: "",
      subjects: "",
      interests: "",
      agreeToTerms: false,
      contactApproval: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      console.log("Submitting form with values:", values)
      const result = await registerStudent(values)
      console.log("Registration result:", result)

      if (!result.success) {
        toast.error(result.error || "Something went wrong")
        return
      }

      setIsSuccess(true)
      toast.success("Registration successful!")
    } catch (error) {
      console.error("Form submission error:", error)
      toast.error("Failed to register. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="rounded-full bg-[#4D9DE0]/20 p-3 mb-4">
          <CheckCircle2 className="h-8 w-8 text-[#4D9DE0]" />
        </div>
        <h3 className="text-xl font-medium text-white">Registration Successful!</h3>
        <p className="mt-2 text-center text-gray-400">
          Thank you for signing up. We'll be in touch with internship opportunities soon.
        </p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Express Interest</h2>
        <p className="text-gray-400 mt-1">Sign up to discover internship opportunities</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input className="text-black" placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="schoolEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School Email</FormLabel>
              <FormControl>
                <Input type="email" className="text-black" placeholder="your.name@school.edu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personalEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personal Email</FormLabel>
              <FormControl>
                <Input type="email" className="text-black" placeholder="your.name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subjects"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subjects Studying (A-level/BTEC)</FormLabel>
              <FormControl>
                <Input
                  className="text-black"
                  placeholder="Enter your subjects (e.g., A-level Maths, Physics, BTEC Business)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interests</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-[80px] text-black"
                  placeholder="Tell us about your career interests and what you're looking to gain from an internship..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agreeToTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal">I agree to the terms and conditions</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactApproval"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal">
                  I approve to being contacted by Bidaaya for these opportunities
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-[#4D9DE0] hover:bg-[#3a89c9]" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Register Interest"
          )}
        </Button>
      </form>
    </Form>
  )
}

