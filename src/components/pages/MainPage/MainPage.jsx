import React, { useState, useEffect } from 'react';
import classes from './MainPage.module.css';
import MyBurger from '../../UI/MyBurger/MyBurger';
import cart from '../../UI/icons/cart.svg';
import MyModalNavigation from '../../UI/MyModalNavigation/MyModalNavigation';
import Brands from '../../Brands/Brands';
import Footer from '../../Footer/Footer';
import ProductList from '../../ProductListMain/ProductListMain';

const MainPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://78.40.217.250:8081/api/sneakers')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('ошибка', error));
  }, []);

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
      <ProductList products={products} />
      <Brands />
      <Footer />
    </div>
  );
};

export default MainPage;
