import Footer from '@/components/ui/HomePageComponents/Footer'
import Header from '@/components/ui/HomePageComponents/Header'
import React from 'react'

const Home = () => {
  return (
    <div className=''>
      <div className='top-1 fixed right-0 left-0 '>
        <Header />
      </div>
      <div className='bottom-0 fixed right-0 left-0 lg:left-0 lg:bottom-90 '>
        <Footer />
      </div>
    </div>
  )
}

export default Home
