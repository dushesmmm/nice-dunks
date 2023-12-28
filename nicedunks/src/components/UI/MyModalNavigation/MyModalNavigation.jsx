import React, { useState } from 'react';
import classes from './MyModalNavigation.module.css';
import logo from '../../UI/icons/nicedunkslogo.png'

const MyModalNavigation = ({ visible, setVisible }) => {
 
  const rootClasses = [classes.myModalNavigation];
  const [activeMenu, setActiveMenu] = useState('');

  const toggleMenu = (menuId) => {
    setActiveMenu((prevState) => (prevState === menuId ? '' : menuId));
  };

  const handleClick = () => {
    setVisible(false);
  };

  if (visible) {
    rootClasses.push(classes.active);
  }


  return (
    <div className={rootClasses.join(' ')}>
      <div className={classes.myModalNavigation__overlay} onClick={handleClick} />
      <div className={classes.myModalNavigation__line} style={{marginTop: 93}}></div>
      <div className={classes.myModalNavigation__title}>КАТЕГОРИИ</div>
      <div className={classes.myModalNavigation__line} style={{marginBottom: 15}}></div>
      <div className={classes.myModalNavigation__link}>НОВЫЕ ПОСТУПЛЕНИЯ</div>
      <div className={`${classes.myModalNavigation__link} ${classes.purple}`}>Б/У КРОССОВКИ</div>
      <div className={classes.myModalNavigation__link}>АКСЕССУАРЫ</div>
      <div className={classes.myModalNavigation__link}>ОДЕЖДА</div>
      <div className={classes.myModalNavigation__link}>БРЕНДЫ</div>
      <div className={`${classes.myModalNavigation__link} ${classes.purple}`}>ПРЕДЗАКАЗ</div>
      <div className={classes.myModalNavigation__link}>НОВЫЕ КРОССОВКИ</div>
      <div className={classes.myModalNavigation__line} style={{marginTop: 10}}></div>
      <div className={classes.myModalNavigation__title}>О НАС</div>
      <div className={classes.myModalNavigation__line} style={{marginBottom: 15}}></div>
      <div className={classes.myModalNavigation__accordion}>
      <ul>
        <li
          className={`${classes.myModalNavigation__link} ${
            activeMenu === 'delivery' ? classes.open : ''
          }`}
          onClick={() => toggleMenu('delivery')}
        >
          ДОСТАВКА И ОПЛАТА
        </li>
        <li
          className={`${classes.myModalNavigation__content} ${
            activeMenu === 'delivery' ? classes.open : ''
          }`}
        >
          <br />Самовывоз в городе Москва в районе метро Ботанический Сад <br />
          <br />Курьерская доставка по Москве осуществляется сервисами:
          <br />Яндекс Go и Достависта <br />
          <br />Доставка по России и СНГ осуществляется почтовыми службами: 
          <br />Сдэк, Почта РФ и Boxberry  <br />
          <br />Стоимость доставки рассчитывается отдельно <br />
          <br />Доставка по миру осуществляется курьерской службой EMS Почта России<br />
          <br />Стоимость доставки рассчитывается отдельно<br /><br />
        </li>
      </ul>
      <ul>
        <li
          className={`${classes.myModalNavigation__link} ${
            activeMenu === 'contacts' ? classes.open : ''
          }`}
          onClick={() => toggleMenu('contacts')}
        >
          КОНТАКТЫ
        </li>
        <li
          className={`${classes.myModalNavigation__content} ${
            activeMenu === 'contacts' ? classes.open : ''
          }`}
        >
          <br/><a href="https://t.me/NiceDunksOrder" className='classes.myModalNavigation__link'>ПОЗИЦИИ ПОД ЗАКАЗ</a><br />
          <br/><a href="https://www.instagram.com/_goba_/" className='classes.myModalNavigation__link'>личный аккаунт в инстаграме</a><br />
          <br/><a href="https://vk.com/nicedunks" className='classes.myModalNavigation__link'>основная страница в вк</a><br />
          <br/><a href="https://www.avito.ru/user/c560662529d1530f9fab8dd500a9934e/profile?src=sharing" className='classes.myModalNavigation__link'>мой профиль на авито</a><br />
          <br/><a href="https://instagram.com/donalddunks/" className='classes.myModalNavigation__link'>аккаунт для продаж в инстаграмме</a><br />
          <br/><a href="https://t.me/NiceDunksManager" className='classes.myModalNavigation__link'>менеджер по предзаказам</a><br /><br />
        </li>
      </ul>
      <ul>
        <li
          className={`${classes.myModalNavigation__link} ${
            activeMenu === 'faq' ? classes.open : ''
          }`}
          onClick={() => toggleMenu('faq')}
        >
          ВОПРОС - ОТВЕТ
        </li>
        <li
          className={`${classes.myModalNavigation__content} ${
            activeMenu === 'faq' ? classes.open : ''
          }`}
        >
          <br /><p>Все ваши товары оригинал?</p><br /><br />Да, у нас строго оригинальная продукция. Каждый товар проходит индивидуальную проверку.<br /><br />
          <p>Какие у вас гарантии?</p><br /><br />Более тысячи положительных отзывов с 2017 года в профиле <a href="https://vk.com/wall170701681_4583">вк</a> и  <a href="https://www.avito.ru/user/c560662529d1530f9fab8dd500a9934e/profile?src=sharing">авито</a>.<br /><br />
          <p>Как быстро приходит товар по предзаказу?</p><br /><br />Сроки доставки товаров по предзаказу составляют 14-21 день. Возможна экспресс доставка.<br /><br />
          <p>Что делать, если желаемого товара нет на сайте?</p><br /><br />Если интересующей позиции нет на сайте, она доступна по предзаказу. Обращайтесь по предзаказу к нашему <a href="https://t.me/NiceDunksManager">менеджеру</a>.<br /><br />
        </li>
      </ul>
      <ul>
        <li
          className={`${classes.myModalNavigation__link} ${
            activeMenu === 'telegram' ? classes.open : ''
          }`}
          onClick={() => toggleMenu('telegram')}
        >
          ТЕЛЕГРАМ КАНАЛ
        </li>
        <li style={{marginBottom: 10}}
          className={`${classes.myModalNavigation__content} ${
            activeMenu === 'telegram' ? classes.open : ''
          }`}
        >
          <br />В моём <a href="https://t.me/NiceDunks">телеграм канале</a> вы сможете одними из первых <br />узнавать не только о новых релизах, но и последних новостях из <br />сникер - индустрии. <br /><br /> Также в канале вы найдёте некоторые позиции, которых нет <br />на сайте и узнаете об историях, которые стоят за дизайнами кроссовок. <br />
        </li>
      </ul>
      <div className={classes.myModalNavigation__line}></div>
      <div className={classes.myModalNavigation__logo}>
        <img src={logo} alt="logo" />
      </div>
      </div>
    </div>
  );
};

export default MyModalNavigation;