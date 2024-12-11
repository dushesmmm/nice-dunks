import React from 'react';
import classes from './CongratulationsModal.module.css'; 

const CongratulationsModal = ({ onClose, orderNumber }) => {
  return (
    <div className={classes.CongratulationsModalOverlay} onClick={onClose}>
      <div className={classes.CongratulationsModal} onClick={(e) => e.stopPropagation()}>
        <h2>Ваш номер заказа: #{orderNumber} </h2>
        <p>Ваш заказ успешно оформлен.  Наш менеджер свяжется с вами в ближайшее время. <br /> <br />Спасибо что выбрали нас!</p>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default CongratulationsModal;
