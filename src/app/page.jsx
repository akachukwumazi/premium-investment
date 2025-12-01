import React from 'react'
import Hero from '@/components/ui/Hero'
import AboutUs from '@/components/ui/AboutUs'
import WhatWeOffer from '@/components/ui/WhatWeOffer'
import WhyYouChoseUs from '@/components/ui/WhyYouChoseUs'


const page = () => {
  return (
    <main className='relative'>
      <Hero/>
      <AboutUs/>
      <WhatWeOffer/>
      <WhyYouChoseUs/>
    </main>
  )
}

export default page

