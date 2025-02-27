import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Registration Complete!</h1>

        <p className="text-gray-600 mb-6">
          Thank you for expressing interest in our internship platform. We've received your information and will be in
          touch with opportunities that match your profile.
        </p>

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-md">
            <h2 className="font-medium text-blue-800 mb-2">What happens next?</h2>
            <ul className="text-sm text-blue-700 text-left space-y-2">
              <li>• Our team will review your application</li>
              <li>• You'll receive an email with access to your student dashboard</li>
              <li>• We'll match you with relevant internship opportunities</li>
              <li>• You can apply directly to positions through our platform</li>
            </ul>
          </div>

          <Link href="/" passHref>
            <Button className="w-full">Return to Homepage</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

