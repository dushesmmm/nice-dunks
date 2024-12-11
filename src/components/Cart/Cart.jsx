import React, { useState, useEffect } from 'react';
import classes from './Cart.module.css';
import { useCart } from './CartContext';
import axios from 'axios';
import CongratulationsModal from './CongratulationsModal';
import Close from '../UI/icons/close.svg'

const Cart = ({ onClose }) => {
  const { cart, removeFromCart, clearCart, closeCart } = useCart();
  const [fullName, setFullName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(totalPrice);
    setShowCart(true); 
  }, [cart]);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleTelegramChange = (e) => {
    setTelegram(e.target.value);
  };

  const handleOverflow = () => {
    let none = 0
    window.innerWidth <= 765 ? document.body.style.overflow = isCartOpen ? 'auto' : 'hidden' : none += 0;
  };


  const handleOrderSubmit = async () => {
    try {
      const orderData = {
        fio: fullName,
        telegram: telegram,
        order: cart.map((item) => ({
          name: item.brand + ' ' + item.color,
          size: item.size + ' US',
          vendorCode: item.vendorCode,
          price: item.price + " ₽"
        })),
        total: totalPrice + " ₽"
      };
      
      const response = await axios.post('https://nicedunks.ru/api/cart', orderData);
      const orderNumber = response.data.order_number;
      setOrderNumber(orderNumber);
      setShowCongratulations(true);
    } catch (error) {
    }
  };

  const handleCongratulationsClose = () => {
    setShowCongratulations(false);
    clearCart();
    onClose();
  };
  

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleOpenCart = () => {
    setIsCartOpen(true);

    if (window.innerWidth <= 765) {document.body.style.overflow = 'auto' } 
  };

  useEffect(() => {
    handleOverflow();
    
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isCartOpen]);

  useEffect(() => {
    if (cart.length === 0) {
      onClose();
    }
  }, [cart, onClose]);

  return (
    <div className={`${classes.CartOverlay} ${showCart ? classes.show  : ''}`} onClick={handleOpenCart}>
      <div className={`${classes.Cart} ${showCart ? classes.show : ''}`}>
        <div onClick={onClose} className={classes.CartClose}>
          <img src={Close} alt='закрыть'/>
        </div>
        <div className={classes.CartItems}>
          {cart.map((item, index) => (
            <div key={index} className={classes.CartItem}>
              <div className={classes.CartImage__container}>
              <img src={item.img} alt="изображение товара" />
              </div>
              <div className={classes.CartItem__description}>
                <div>{item.brand}</div>
                <div style={{ marginTop: 10 }}>{item.color}</div>
                <p style={{ marginTop: 20, cursor: 'pointer' }} onClick={() => removeFromCart(index)}>
                  Удалить
                </p>
                <div className={classes.CartItemInfo}>
                  <div className={classes.CartItemSize}>{/^\d/.test(item.size) ? `${item.size} US` : item.size}</div>
                  <div>{item.price} ₽</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <form className={classes.Checkout}>
          <div>Заполните свои данные и мы сразу свяжемся с вами</div>
          <input
            type="text"
            placeholder="Джордан Майкл Первый"
            value={fullName}
            onChange={handleFullNameChange}
            className={classes.CheckoutInput}
            required
          />
          <input
            type="text"
            placeholder="@nicedunks"
            value={telegram}
            onChange={handleTelegramChange}
            className={classes.CheckoutInput}
            required
          />
          <div className={classes.Total}>
            <div>ИТОГО: </div>
            <div>{totalPrice} ₽</div>
          </div>
          <button type='button' onClick={handleOrderSubmit} className={classes.CheckoutButton}>
            ОФОРМИТЬ
          </button>
        </form>
      </div>
      {showCongratulations && <CongratulationsModal onClose={handleCongratulationsClose} orderNumber={orderNumber}/>}
    </div>
  );
};

export default Cart;
