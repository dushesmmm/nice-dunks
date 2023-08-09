import React from 'react';
import classes from './Footer.module.css';
import logo from '../UI/icons/nicedunkslogo.png';

const Footer = () => {
  const categories = ['НОВЫЕ ПОСТУПЛЕНИЯ', 'ПРЕДЗАКАЗ', 'ОДЕЖДА', 'АКСЕССУАРЫ', 'НОВЫЕ КРОССОВКИ', 'БРЕНДЫ', 'Б/У КРОССОВКИ'];
  const aboutUsLinks = ['ДОСТАВКА И ОПЛАТА', 'КОНТАКТЫ', 'ВОПРОС - ОТВЕТ', 'ТЕЛЕГРАММ КАНАЛ'];

  return (
    <div className={classes.footer__wrapper}>
      <div className={classes.footer__title}>КАТЕГОРИИ</div>
      <div className={classes.footer__links}>
        {categories.map((category, index) => (
          <div className={`${classes.footer__link} ${category === 'ПРЕДЗАКАЗ' ? classes.preorderLink : ''}`} key={index}>
            {category}
          </div>
        ))}
      </div>
      <div className={classes.footer__title} style={{ marginTop: 25 }}>
        О НАС
      </div>
      <div className={classes.footer__links}>
        {aboutUsLinks.map((link, index) => (
          <div className={`${classes.footer__link} ${link === 'КОНТАКТЫ' ? classes.contactsLink : ''}`} key={index}>
            {link}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 50, marginTop: 35 }}>
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default Footer;
