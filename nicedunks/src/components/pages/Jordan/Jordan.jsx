import React from 'react'
import HeaderNavigation from '../../UI/HeaderNavigation/HeaderNavigation'
import Footer from '../../Footer/Footer'
import '../../../styles/brand.css'

const Jordan = () => {
  return (
    <div>
      <HeaderNavigation />
        <div className='info__wrapper'>
            <p className='info__name'>jordan</p>
            <p className='info__description'>
            1984 году компания Nike начала освоение рынка баскетбольных кроссовок. 
            Чтобы обеспечить обуви Nike место на игровой площадке, компания подписывает 5-летний контракт с новичком «Чикаго Буллз», 
            атакующим защитником Майклом Джорданом. Для того времени это было чем-то невероятным — заключить столь долговечный контракт лишь 
            с одним спортсменом. Менеджеры Nike верили в талант Джордана, они жили мечтой, что он оправдает ожидания скаутов «Быков» и поможет компании 
            сделать кроссовки Nike популярными среди любителей баскетбола.
            </p>
        </div>
      <Footer/>
    </div>
  )
}

export default Jordan
