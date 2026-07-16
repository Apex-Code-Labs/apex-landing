import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProblemSolution from '@/components/ProblemSolution'
import Modules from '@/components/Modules'
import DteSection from '@/components/DteSection'
import RestaurantFlow from '@/components/RestaurantFlow'
import Pricing from '@/components/Pricing'
import Comparison from '@/components/Comparison'
import FAQ from '@/components/FAQ'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ProblemSolution />
      <Modules />
      <DteSection />
      <RestaurantFlow />
      <Pricing />
      <Comparison />
      <FAQ />
      <ContactForm />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
