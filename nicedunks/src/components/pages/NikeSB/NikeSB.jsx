import React from 'react'
import HeaderNavigation from '../../UI/HeaderNavigation/HeaderNavigation'
import Footer from '../../Footer/Footer'
import '../../../styles/brand.css'

const NikeSB = () => {
  return (
    <div>
      <HeaderNavigation />
        <div className='info__wrapper'>
            <p className='info__name'>NIKE<br />sb</p>
            <p className='info__description'>
                В 1985 году Питер Мур, один из главных дизайнеров Nike, выпустил высокие баскетбольные кроссовки Nike Dunk. 
                Они получили детали от моделей Air Jordan и Terminator, созданных в том же году той же командой бренда. 
                Особенностью обуви были бесконечные цветовые решения, так как она предоставлялась спортивным командам американских колледжей. 
                Nike поставлял обувь в их фирменных цветах, позволяя болельщикам поддерживать свои любимые клубы «с ног до головы».
            </p>
        </div>
      <Footer/>
    </div>
  )
}

export default NikeSB;
