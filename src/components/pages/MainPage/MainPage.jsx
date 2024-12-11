import React, { useState, useEffect } from 'react';
import classes from './MainPage.module.css';
import MyBurger from '../../UI/MyBurger/MyBurger';
import cartIcon from '../../UI/icons/cart.svg';
import Cart from '../../Cart/Cart';
import MyModalNavigation from '../../UI/MyModalNavigation/MyModalNavigation';
import Brands from '../../Brands/Brands';
import Footer from '../../Footer/Footer';
import ProductList from '../../ProductListMain/ProductListMain';
import searchIcon from '../../UI/icons/searchmain.svg'
import searchIconModal from '../../UI/icons/search.svg'
import { useCart } from '../../Cart/CartContext';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import Close from '../../UI/icons/close.svg'

const MainPage = ({cartItems}) => {
  const { cart } = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://nicedunks.ru/api/sneakers')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error('ошибка', error));
  }, []);

  const handleBurgerClick = () => {
    setModalVisible(!modalVisible);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const navigateTo = (word) => {
    if (word === 'cart' && cart.length > 0) {
      setIsCartOpen(true);
    } else if (word === 'cart' && cart.length === 0) {
      return;
    } 
  };

  const handleSearchInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() !== '') {
      try {
        const response = await fetch(`https://nicedunks.ru/api/search?query=${query}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleModalClose = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchModalOpen(false);
  };

  const redirectToProductPage = (vendorCode) => {
    const link = `/product/${vendorCode.toLowerCase()}`;
    navigate(link);
  };

  const formatBrand = (brand) => {
    const words = brand.split(/\s*,\s*/);
    if (words.length > 1) {
      return words.join(' X ');
    }
    return brand;
  };

  const handleSearchIconClick = () => {
    setIsSearchModalOpen(true);
  };

  return (
    <div>
      <Helmet>
        <title>NiceDunks - интернет-магазин оригинальных брендовых кроссовок.</title>
        <meta name="description" content="Оригинальная одежда и обувь по выгодным ценам! У нас вы можете купить: Nike, Nike SB, New Balance, Air Jordan, Supreme, Palace и многое другое. Доставка по всей России." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nicedunks.ru/" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:image" content="https://nicedunks.ru/static/media/nicedunkslogo.d3dccfbda9340ee34374.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://nicedunks.ru/static/media/nicedunkslogo.d3dccfbda9340ee34374.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:title" content="NiceDunks - интернет-магазин оригинальных брендовых кроссовок." />
        <meta property="og:description" content="Оригинальная одежда и обувь по выгодным ценам! У нас вы можете купить: Nike, Nike SB, New Balance, Air Jordan, Supreme, Palace и многое другое. Доставка по всей России." />
      </Helmet>
      <div className={classes.banner}>
        <MyBurger onClick={handleBurgerClick} />
        <div onClick={handleSearchIconClick} className={classes.SearchWrapper} style={{ cursor: 'pointer', display: 'flex'}}>
          <img src={searchIcon} alt="поиск" style={{ marginTop: 30, cursor: 'pointer'}} />
        </div>
        <div onClick={() => navigateTo('cart')} style={{cursor: 'pointer', height: 100}}>
          <img src={cartIcon} alt="иконка корзины" className={classes.cart} />
        </div>
        {isCartOpen && <Cart cartItems={cartItems} onClose={closeCart} />}
        {isSearchModalOpen && (
        <div className={classes.SearchModalContainer}>
          <div сlassName={classes.ModalContent}>
            <div className={classes.ModalSearch}>
              <img src={searchIconModal} alt="поиск" style={{ marginTop: 38, cursor: 'pointer', marginLeft: 10, marginRight: 0 }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  placeholder="Искать в каталоге"
                />
                <div className={classes.CloseButton} onClick={handleModalClose}>
                  <img src={Close} alt="закрыть" />
                </div>
            </div>
            {searchResults && searchResults.length > 0 ? (
              <div className={classes.Products__Wrapper}>
                  {searchResults.map((product, index) => (
                      <div key={index} className={classes.product__card} onClick={() => redirectToProductPage(product.vendorCode)}>
                          <h2>            
                              {formatBrand(product.brand) + ' ' + product.silhouette + ' ' + product.color}
                          </h2>
                          <h2>{product.price}₽</h2>
                          <img src={product.images[0]} alt={formatBrand(product.brand) + ' ' + product.silhouette + ' ' + product.color} />
                      </div>
                          ))}
                      </div>
                  ) : (           
                      <p> </p>
                  )}
                              </div>
                          </div>
                        )}
        <MyModalNavigation visible={modalVisible} setVisible={setModalVisible} />
      </div>
      <ProductList products={products} />
      <Brands />
      <Footer />
    </div>
  );
};

export default MainPage;
