import React from 'react'
import HeaderNavigation from '../../UI/HeaderNavigation/HeaderNavigation'
import Footer from '../../Footer/Footer'
import '../../../styles/brand.css'


const NewBalance = () => {
  return (
    <div>
      <HeaderNavigation />
        <div className='info__wrapper'>
            <p className='info__name'>New<br />Balance</p>
            <p className='info__description'>
                История New Balance началась в 1906 году в Белмонте в США. У англичанина-эмигранта Уильяма Райли была небольшая мануфактура 
                по производству супинаторов. Как-то Райли наблюдал за курицей и заметил, что она отлично балансирует при ходьбе. Так идея устойчивости 
                куриной лапки легла в основу будущей конструкции обуви. Он разработал стельку, которая создавала опору в пятке на три точки. Это изобретение 
                принесло известность мастеру, и его лаборатория превратилась в серьезную компанию New Balance Arch Company.
            </p>
        </div>
      <Footer/>
    </div>
  )
}

export default NewBalance
