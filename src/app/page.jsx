import React from 'react'
import Hero from '@/components/ui/Hero'
import AboutUs from '@/components/ui/AboutUs'
import WhatWeOffer from '@/components/ui/WhatWeOffer'
import WhyYouChoseUs from '@/components/ui/WhyYouChoseUs'
import WhatTheySayAboutUs from '@/components/WhatTheySayAboutUs'
import JourneyCTA from '@/components/JourneyCTA'
import FinancialSteps from '@/components/FinancialSteps'



const page = () => {
  return (
    <main className='relative'>
      <Hero/>
      <AboutUs/>
      <WhatWeOffer/>
      <WhyYouChoseUs/>
      <FinancialSteps/>
      <WhatTheySayAboutUs/>
      <JourneyCTA/>
    </main>
  )
}

export default page

