import React from 'react';
import classes from './Brands.module.css';
import nikesb from './images/nikesb.png';
import jordan from './images/jordan.png';
import nike from './images/nike.png';
import newbalance from './images/newbalance.png';

const Brands = () => {
  const brands = [
<<<<<<< HEAD
    { name: 'NIKE', image: nike, url: '/all products/?brand=Nike' },
    { name: 'NIKE SB', image: nikesb, url: '/all products/?brand=Nike%20SB' },
    { name: 'NEW BALANCE', image: newbalance, url: '/all products/?brand=New%20Balance' },
    { name: 'JORDAN', image: jordan, url: '/all products/?brand=Air%20Jordan' },
=======
    { name: 'NIKE', image: nike, url: '/brands/Nike' },
    { name: 'NIKE SB', image: nikesb, url: '/brands/Nike%20SB' },
    { name: 'NEW BALANCE', image: newbalance, url: '/brands/New%20Balance' },
    { name: 'JORDAN', image: jordan, url: '/brands/Air%20Jordan' },
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67
  ];

  const handleNavigationClick = (url) => {
    window.location.href = url;
  };

  return (
    <div>
<<<<<<< HEAD
      <div className={classes.navigation}>
        <div className={classes.title}>БРЕНДЫ</div>
        <div onClick={() => handleNavigationClick('/all products')} className={classes.title}>СМОТРЕТЬ ВСЕ</div>
=======
      <div className={classes.brands__navigation}>
        <div className={classes.brands__title}>Бренды</div>
        <div className={classes.brands__title}>СМОТРЕТЬ ВСЕ</div>
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67
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
