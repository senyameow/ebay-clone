'use client' // можем взаимодействовать с компонентом

import React, { useEffect, useState } from 'react'
import TopMenu from './includes/TopMenu'
import MainHeader from './includes/MainHeader'
import SubMenu from './includes/SubMenu'
import Footer from './includes/Footer'
import Loading from '../components/Loading'

const MainLayout = ({ children }) => {

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    window.addEventListener('storage', () => {
      let res = localStorage.getItem('isLoading')
      res === 'false' ? setIsLoading(false) : setIsLoading(true)
    })
  })

  return (
    <div id='Mainlayout' className='min-w-[1050px] max-w-[1300px] mx-auto'>
      <div>
        {isLoading && <Loading />}
        <TopMenu />
        <MainHeader />
        <SubMenu />

        {children}

        <Footer />
      </div>
    </div>
  )
}

export default MainLayout