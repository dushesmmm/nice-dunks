import React from 'react';
import classes from '../Faq.module.css';

const FAQBlock = ({ icon, title, description, onClick }) => {
  return (
    <div className={classes.faq__block} onClick={onClick}>
      <div className={classes.faq__blockWrapper}>
        <div className={classes.img__wrapper}>
          <img src={icon} alt={title} />
        </div>
        <h2 className={classes.block__title}>{title}</h2>
        <h3 className={classes.block__description}>{description}</h3>
      </div>
    </div>
  );
};

export default FAQBlock;
