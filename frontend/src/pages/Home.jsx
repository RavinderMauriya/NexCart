import React from 'react'
import CircularIcons from '../components/CircularIcons'
import SlideBackground from '../components/SlideBackground'
import PromoSection from '../components/PromoSection'
import LogoTicker from '../components/LogoTicker'
import HomeCategoryProduct from '../components/HomeCategoryProduct'

const Home = () => {
  return (
    <div className='bg-bg-main'>
      <SlideBackground/>
      <CircularIcons/>
      <PromoSection/>
      <LogoTicker/>
      <HomeCategoryProduct/>
    </div>
  )
}

export default Home