import React, { useEffect, useState, useRef } from 'react';
import classes from './HeaderNavigation.module.css';
import searchIcon from '../icons/search.svg';
import cartIcon from '../icons/headercart.svg';
import Cart from '../../Cart/Cart';
import { useCart } from '../../Cart/CartContext';
import { useNavigate } from 'react-router-dom';
import Close from '../icons/close.svg'

const HeaderNavigation = ({ cartItems }) => {
  const { cart } = useCart();
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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [brandsModalOpen, setBrandsModalOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [isFixedTriggered, setIsFixedTriggered] = useState(false);
  const screenWidth = window.innerWidth;
  const modalRef = useRef(null);
  const [isProductsWrapperVisible, setIsProductsWrapperVisible] = useState(true);

  const wordMapping = {
    'НОВЫЕ ПОСТУПЛЕНИЯ': '',
    'ОДЕЖДА': 'clothes',
    'АКСЕССУАРЫ': 'accessories',
    'НОВЫЕ КРОССОВКИ': 'newSneakers',
    'БРЕНДЫ': '',
    'Б/У КРОССОВКИ': 'used',
    'ПРЕДЗАКАЗ': 'preorder',
    'НА ГЛАВНУЮ': '/',
  };

  const handleScrollFixed = () => {
    const currentScrollPos = window.scrollY;
    const isMobile = screenWidth <= 486;
  
    if (isMobile) {
      setIsFixed(prevScrollPos > currentScrollPos);
      if (currentScrollPos < 100) {
        setIsFixed(false);
      }
      setPrevScrollPos(currentScrollPos);
    }
  };

  useEffect(() => {
    if (isFixed) {
      setIsFixedTriggered(true);
    } if (window.scrollY < 200) {
      setIsFixedTriggered(false)
    }
  }, [isFixed]);


  useEffect(() => {
    window.addEventListener('scroll', handleScrollFixed);
    return () => window.removeEventListener('scroll', handleScrollFixed);
  }, [prevScrollPos]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsSearchModalOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.keyCode === 27) {
        setIsSearchModalOpen(false);
      }
    };

    if (isSearchModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isSearchModalOpen]);


  const navigateTo = (word) => {
    if (word === 'НА ГЛАВНУЮ') {
      window.location.href = '/';
    } else if (word === 'cart' && cart.length > 0) {
      setIsCartOpen(true);
    } else if (word === 'cart' && cart.length === 0) {
      return;
    } else if (word === 'БРЕНДЫ') {
      toggleBrandsModal(); 
    } else {
      const englishWord = wordMapping[word] || '';
      window.location.href = `/all%20products?category=${englishWord}`;
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch('https://nicedunks.ru/api/brands');
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Ошибка при загрузке брендов:', error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleSearchIconClick = () => {
    setIsSearchModalOpen(true);
    setIsProductsWrapperVisible(true);
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
      setIsProductsWrapperVisible(true);
    }
  };

  const closeCart = () => {
    setIsCartOpen(false);
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

  const handleModalClose = () => {
    setSearchQuery('');
    setSearchResults([]);
    
    if (window.innerWidth <= 765) {
      setIsProductsWrapperVisible(false);
    } else {
      setIsSearchModalOpen(false);
    }

    handleSearchInputChange({ target: { value: '' }});
  };
  
  

  const handleBrandOptionClick = (brand) => {
    const link = `/all products/?brand=${brand}`;
    navigate(link);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 767) {
        setIsSearchModalOpen(true);
      } else {
        setIsSearchModalOpen(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleBrandsModal = () => {
    setBrandsModalOpen(!brandsModalOpen);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  return (
    <div className={`${classes.HeaderNavigation__wrapper} ${isFixed ? classes.fixed : (screenWidth <= 486 && isFixedTriggered ? classes.notfixed : '')}`}>
      <div
        className={classes.SearchWrapper}
        onClick={handleSearchIconClick}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={searchIcon}
          alt="поиск"
          style={{ marginTop: 39, cursor: 'pointer', marginLeft: 0, marginRight: 0, maxWidth: 100 }}
        />
      </div>
      {headerWords.map((word, index) => (
        <div
          className={`${classes.HeaderNavigation} ${word === 'ПРЕДЗАКАЗ' ? classes.preorderButton : ''}`}
          key={index}
          onClick={() => navigateTo(word)}
        >
          {word}
        </div>
      ))}
      <div
        className={classes.CartWrapper}
        onClick={() => navigateTo('cart')}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={cartIcon}
          className={classes.iconWrapper}
          alt="корзина"
          style={{ marginTop: 38, cursor: 'pointer', marginLeft: 0, marginRight: 0, maxWidth: 100 }}
        />
        {cart.length !== 0 ? ' ' + cart.length : ' '}
      </div>
      {isCartOpen && <Cart cartItems={cartItems} onClose={closeCart} />}
      {isSearchModalOpen && (
        <div className={classes.SearchModalContainer}>
          <div сlassName={classes.ModalContent}>
            <div className={classes.ModalSearch}>
              <img
                src={searchIcon}
                alt="поиск"
                style={{ marginTop: 38, cursor: 'pointer', marginLeft: 10, marginRight: 0 }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyPress={handleInputKeyPress}
                placeholder="Искать в каталоге"
              />
              <div className={classes.CloseButton} onClick={handleModalClose}>
                <img src={Close} alt="закрыть" />
              </div>
            </div>
            {isProductsWrapperVisible && searchResults && searchResults.length > 0 ? (
              <div className={classes.Products__Wrapper}>
                {searchResults.map((product, index) => (
                  <div
                    key={index}
                    className={classes.product__card}
                    onClick={() => redirectToProductPage(product.vendorCode)}
                  >
                    <h2>{formatBrand(product.brand) + ' ' + product.silhouette + ' ' + product.color}</h2>
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
      {brandsModalOpen && (
        <div className={classes.BrandsModalContainer}>
          <h2>СПИСОК БРЕНДОВ:</h2>
          <div className={classes.BrandsModalContent}>
            {brands.map((brand, index) => (
              <p key={index} onClick={() => handleBrandOptionClick(brand)}>
                {brand}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderNavigation;