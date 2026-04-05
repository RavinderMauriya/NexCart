import React from 'react'
import CircularIcons from '../components/home/CircularIcons'
import SlideBackground from '../components/home/SlideBackground'
import PromoSection from '../components/home/PromoSection'
import LogoTicker from '../components/home/LogoTicker'
import HomeCategoryProduct from '../components/home/HomeCategoryProduct'
import ScrollSection from '../components/home/ScrollSection'
import Section from '../components/home/Section'

const Home = () => {
  return (
    <div className='bg-bg-main'>
      <SlideBackground/>
      <CircularIcons/>
      <Section/>
      <PromoSection/>
      <LogoTicker/>
      <ScrollSection/>
      <HomeCategoryProduct/>
    </div>
  )
}

export default Home