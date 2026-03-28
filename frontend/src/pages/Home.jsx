import React from 'react'
import CircularIcons from '../components/CircularIcons'
import SlideBackground from '../components/SlideBackground'
import PromoSection from '../components/PromoSection'
import LogoTicker from '../components/LogoTicker'

const Home = () => {
  return (
    <div>
      <SlideBackground/>
      <CircularIcons/>
      <PromoSection/>
      <LogoTicker/>
    </div>
  )
}

export default Home