import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProblemSolution from '@/components/ProblemSolution'
import DteSection from '@/components/DteSection'
import Modules from '@/components/Modules'
import Pricing from '@/components/Pricing'
import DevTeaser from '@/components/DevTeaser'
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
      <DteSection />
      <Modules />
      <Pricing />
      <DevTeaser />
      <FAQ />
      <ContactForm />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
