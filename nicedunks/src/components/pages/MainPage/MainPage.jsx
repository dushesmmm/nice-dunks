import React, { useState } from 'react';
import classes from './MainPage.module.css';
import MyBurger from '../../UI/MyBurger/MyBurger';
import cart from '../../UI/icons/cart.svg';
import MyModalNavigation from '../../UI/MyModalNavigation/MyModalNavigation';
import Brands from '../../Brands/Brands';
import Footer from '../../Footer/Footer';

const MainPage = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleBurgerClick = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <div>
      <div className={classes.banner}>
        <MyBurger onClick={handleBurgerClick} />
        <img src={cart} alt="cart" className={classes.cart} style={{cursor: 'pointer'}} />
        <MyModalNavigation visible={modalVisible} setVisible={setModalVisible} />
      </div> 
      <Brands />
      <Footer/>
    </div>
  );
};

export default MainPage;
