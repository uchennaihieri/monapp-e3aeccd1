import Hero from '../components/sections/Hero'
import Ticker from '../components/sections/Ticker'
import WhatItIs from '../components/sections/WhatItIs'
import TheProblem from '../components/sections/TheProblem'
import TheSolution from '../components/sections/TheSolution'
import HowItWorks from '../components/sections/HowItWorks'
import FyndTeaser from '../components/sections/FyndTeaser'
import FinalCTA from '../components/sections/FinalCTA'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Ticker />
      <WhatItIs />
      <TheProblem />
      <TheSolution />
      <HowItWorks />
      <FyndTeaser />
      <FinalCTA />
      <Footer />
    </main>
  )
}
