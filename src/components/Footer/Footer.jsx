import React from 'react';
import classes from './Footer.module.css';
import logo from '../UI/icons/nicedunkslogo.png';

const Footer = () => {
  const categoryMapping = {
    'НОВЫЕ ПОСТУПЛЕНИЯ': '',
    'ПРЕДЗАКАЗ': 'preorder',
    'ОДЕЖДА': 'clothes',
    'АКСЕССУАРЫ': 'accessories',
    'НОВЫЕ КРОССОВКИ': 'newSneakers',
    'Б/У КРОССОВКИ': 'used',
  };

  const aboutUsLinks = ['ДОСТАВКА', 'КОНТАКТЫ', 'ВОПРОС - ОТВЕТ'];

  const handleCategoryClick = (category) => {
    const englishCategory = categoryMapping[category] || '';
    window.location.href = `/all%20products?category=${englishCategory}`;
  };

  const handleTelegramClick = () => {
    window.location.href = 'https://t.me/NiceDunks';
  };

  return (
    <div className={classes.footer__wrapper}>
      <div className={classes.footer__title}>КАТЕГОРИИ</div>
      <div className={classes.footer__links}>
        {Object.keys(categoryMapping).map((category, index) => (
          <div
            className={`${classes.footer__link} ${category === 'ПРЕДЗАКАЗ' ? classes.preorderLink : ''}`}
            key={index}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </div>
        ))}
      </div>
      <div className={classes.footer__title} style={{ marginTop: 25 }}>
        О НАС
      </div>
      <div className={classes.footer__links}>
        {aboutUsLinks.map((link, index) => (
          <div
            className={`${classes.footer__link} ${link === 'КОНТАКТЫ' ? classes.contactsLink : ''}`}
            key={index}
            onClick={() => window.location.href = `/faq`}
          >
            {link}
          </div>
        ))}
        <div className={classes.footer__link} onClick={handleTelegramClick}>
          ТЕЛЕГРАМ КАНАЛ
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12vh', marginTop: '7vh' }}>
        <img src={logo} alt="логотип NiceDunks" />
      </div>
    </div>
  );
};

export default Footer;
