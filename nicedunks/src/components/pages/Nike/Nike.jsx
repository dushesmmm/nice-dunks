import React from 'react'
import HeaderNavigation from '../../UI/HeaderNavigation/HeaderNavigation'
import Footer from '../../Footer/Footer'
import '../../../styles/brand.css'

const Nike = () => {
  return (
    <div>
      <HeaderNavigation />
        <div className='info__wrapper'>
            <p className='info__name'>NIKE</p>
            <p className='info__description'>
                Компания Nike была основана Биллом Бауэрманом и Филом Найтом в 1964 году и 
                ассоциируется с высоким качеством и инновациями. Вместе с одеждой, этот гигант 
                спортивной одежды отвечает за создание нескольких культовых кроссовок, включая Air Force 1, франшизу Air Max и многие другие. Сегодня Nike является одним из самых 
                узнаваемых брендов в мире, который можно узнать по своему логотипу - 
                словесной марке и символу Swoosh.
            </p>
        </div>
      <Footer/>
    </div>
  )
}

export default Nike;
