import React from 'react';
import classes from './Brands.module.css';
import nikesb from './images/nikesb.png';
import jordan from './images/jordan.png';
import nike from './images/nike.png';
import newbalance from './images/newbalance.png';

const Brands = () => {
  const brands = [
    { name: 'NIKE', image: nike, url: '/all products/?brand=Nike' },
    { name: 'NIKE SB', image: nikesb, url: '/all products/?brand=Nike%20SB' },
    { name: 'NEW BALANCE', image: newbalance, url: '/all products/?brand=New%20Balance' },
    { name: 'JORDAN', image: jordan, url: '/all products/?brand=Air%20Jordan' },
  ];

  const handleNavigationClick = (url) => {
    window.location.href = url;
  };

  return (
    <div>
      <div className={classes.navigation}>
        <div className={classes.title}>БРЕНДЫ</div>
        <div onClick={() => handleNavigationClick('/all products')} className={classes.title}>СМОТРЕТЬ ВСЕ</div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap'}}>
        {brands.map((brand, index) => (
          <div
            className={classes.banner__navigation}
            key={index}
            style={{ backgroundImage: `url(${brand.image})`, backgroundSize: 'cover' }}
            onClick={() => handleNavigationClick(brand.url)}
          >
            {brand.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
