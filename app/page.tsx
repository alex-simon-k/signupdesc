import { SignupForm } from "@/components/signup-form"
import { testConnection } from "@/app/actions/register"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0c0e17] text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-1">
          <div className="w-8 h-8">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 0L24.4903 15.5097L40 20L24.4903 24.4903L20 40L15.5097 24.4903L0 20L15.5097 15.5097L20 0Z"
                fill="#4D9DE0"
              />
            </svg>
          </div>
          <span className="text-xl font-semibold ml-2">Bidaaya</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Launch Your <br />
              Future with <br />
              <span className="text-[#4D9DE0]">Bidaaya</span>
            </h1>
            <p className="mt-6 text-gray-400 max-w-md">
              Bidaaya is a platform that allows students to apply to internship projects with leading companies. We
              connect, verify and enable the top talent!
            </p>
          </div>

          <div className="bg-[#131629] p-8 rounded-xl shadow-xl">
            <SignupForm />
          </div>
        </div>
      </section>
    </main>
  )
}

