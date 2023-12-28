import React, { useState } from 'react';
import classes from './HeaderNavigation.module.css';
import search from '../icons/search.svg';
import cart from '../icons/headercart.svg';

const HeaderNavigation = () => {
  const [headerWords] = useState([
    'НОВЫЕ ПОСТУПЛЕНИЯ',
    'ОДЕЖДА',
    'АКСЕССУАРЫ',
    'НОВЫЕ КРОССОВКИ',
    'БРЕНДЫ',
    'Б/У КРОССОВКИ',
    'ПРЕДЗАКАЗ',
    'НА ГЛАВНУЮ',
  ]);

  const navigateToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className={classes.HeaderNavigation__wrapper}>
      <img src={search} alt="поиск" style={{ marginTop: 36, cursor: 'pointer', marginLeft: 0, marginRight: 0 }} />
      {headerWords.map((word, index) => (
        <div
          className={`${classes.HeaderNavigation} ${
            word === 'ПРЕДЗАКАЗ' ? classes.preorderButton : ''
          }`}
          key={index}
          onClick={word === 'НА ГЛАВНУЮ' ? navigateToHome : undefined}
        >
          {word}
        </div>
      ))}
      <img src={cart} alt="корзина" style={{ marginTop: 36, cursor: 'pointer', marginLeft: 0, marginRight: 0}}  />
    </div>
  );
};

export default HeaderNavigation;
