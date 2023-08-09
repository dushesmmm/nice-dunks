import React from 'react';
import classes from './Brands.module.css';
import nikesb from './images/nikesb.png';
import jordan from './images/jordan.png';
import nike from './images/nike.png';
import newbalance from './images/newbalance.png';

const Brands = () => {
  const brands = [
    { name: 'NIKE', image: nike, url: '/brands/nike' },
    { name: 'NIKE SB', image: nikesb, url: '/brands/nike-sb' },
    { name: 'NEW BALANCE', image: newbalance, url: '/brands/new-balance' },
    { name: 'JORDAN', image: jordan, url: '/brands/jordan' },
  ];

  const handleNavigationClick = (url) => {
    window.location.href = url;
  };

  return (
    <div>
      <div className={classes.brands__wrapper}>
        <div className={classes.brands__title}>БРЕНДЫ</div>
        <div className={classes.brands__title}>СМОТРЕТЬ ВСЕ</div>
      </div>
      <div style={{ display: 'flex' }}>
        {brands.map((brand, index) => (
          <div
            className={classes.brand__navigation}
            key={index}
            style={{ backgroundImage: `url(${brand.image})` }}
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
