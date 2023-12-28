import React from 'react';
import classes from './Brands.module.css';
import nikesb from './images/nikesb.png';
import jordan from './images/jordan.png';
import nike from './images/nike.png';
import newbalance from './images/newbalance.png';

const Brands = () => {
  const brands = [
    { name: 'NIKE', image: nike, url: '/brands/Nike' },
    { name: 'NIKE SB', image: nikesb, url: '/brands/Nike%20SB' },
    { name: 'NEW BALANCE', image: newbalance, url: '/brands/New%20Balance' },
    { name: 'JORDAN', image: jordan, url: '/brands/Air%20Jordan' },
  ];

  const handleNavigationClick = (url) => {
    window.location.href = url;
  };

  return (
    <div>
      <div className={classes.brands__navigation}>
        <div className={classes.brands__title}>Бренды</div>
        <div className={classes.brands__title}>СМОТРЕТЬ ВСЕ</div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap'}}>
        {brands.map((brand, index) => (
          <div
            className={classes.brand__navigation}
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
