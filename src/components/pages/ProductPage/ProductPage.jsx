import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HeaderNavigation from '../../UI/HeaderNavigation/HeaderNavigation';
import classes from './ProductPage.module.css';
import './SlickSlide.css';
import PrevArrow from '../../UI/MyArrows/PrevArrow';
import NextArrow from '../../UI/MyArrows/NextArrow';
import MyDropdownMenu from '../../UI/MyDropdownMenu/MyDropdownMenu';
import MySlider from '../../UI/MySlider/MySlider';
<<<<<<< HEAD
import Footer from '../../Footer/Footer';
import { useCart } from '../../Cart/CartContext';
import { Helmet } from 'react-helmet';
import MySizesPopup from '../../UI/MySizesPopup/MySizesPopup';
import plus from '../../UI/icons/plus.svg'
=======
import Footer from '../../Footer/Footer'
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67

const ProductPage = () => {
  const { vendorCode } = useParams();
  const [product, setProduct] = useState(null);
<<<<<<< HEAD
  const { addToCart } = useCart();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isHintOpen, setHintOpen] = useState(false)

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    const toggleHint = () => {
        setHintOpen(true);
        if (isHintOpen) {
          setHintOpen(false)
        }
    };


  useEffect(() => {
    fetch(`https://nicedunks.ru/api/sneakersById?id=${vendorCode.toUpperCase()}`)
=======

  useEffect(() => {
    fetch(`http://78.40.217.250:8081/api/sneakersById?id=${vendorCode.toUpperCase()}`)
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Ошибка', error));
  }, [vendorCode]);

  const formatBrand = brand => {
    const words = brand.split(/\s*,\s*/);
    return words.length > 1 ? words.join(' X ') : brand;
  };

<<<<<<< HEAD
  const metaImage = product && product.images[0]

  const metaDescription = product && product.description

  const metaName = product && product.silhouette + " " + product.color

=======
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

<<<<<<< HEAD

  return (
    <div>
      <Helmet>
        <title>{`${product && product.brand ? formatBrand(product.brand) : ''} ${metaName}`}</title>
        <meta name="description" content={`${metaDescription}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nicedunks.ru/" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:image" content={`${metaImage}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${metaImage}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:title" content={`${product && product.brand ? formatBrand(product.brand) : ''} ${metaName}`} />
        <meta property="og:description" content={`${metaDescription}`} />
      </Helmet>
=======
  return (
    <div>
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67
      <HeaderNavigation />
      <div className={classes.productPage__wrapper}>
        {product && product.images ? (
          product.images.length === 1 ? (
            <div className={classes.singleImage}>
<<<<<<< HEAD
              <img src={product.images[0]} alt={`${product && product.brand ? formatBrand(product.brand) : ''} ${metaName}`} />
=======
              <img src={product.images[0]} alt="Изображение кроссовок" />
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67
            </div>
          ) : (
            <MySlider className={classes.productPage__images} {...settings}>
              {product.images.map((image, index) => (
                <div key={index}>
<<<<<<< HEAD
                  <img src={image} alt={`${product && product.brand ? formatBrand(product.brand) : ''} ${metaName} ${index}`} />
=======
                  <img src={image} alt={`Изображение кроссовок ${index}`} />
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67
                </div>
              ))}
            </MySlider>
          )
        ) : (
          <p>Loading...</p>
        )}
        {product && (
<<<<<<< HEAD
          <div className={classes.ProductInfo_wrapper}>
=======
          <div>
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67
            <h1 className={classes.ProductPage__brand}>
              {product.brand.includes(',') ? (
                product.brand.split(',').map((brand, index, array) => (
                  <React.Fragment key={index}>
<<<<<<< HEAD
                    <Link to={`/all%20products?brands=${brand.trim()}`}>{formatBrand(brand)}</Link>
=======
                    <Link to={`/brands/${brand.trim()}`}>{formatBrand(brand)}</Link>
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67
                    {index !== array.length - 1 && <span className={classes.brandSeparator}> X </span>}
                  </React.Fragment>
                ))
              ) : (
<<<<<<< HEAD
                <Link to={`/all%20products?brands=${product.brand.trim()}`}>{formatBrand(product.brand)}</Link>
=======
                <Link to={`/brands/${product.brand.trim()}`}>{formatBrand(product.brand)}</Link>
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67
              )}
            </h1>
            <h2 className={classes.ProductPage__colorway}>
              {product.silhouette} {product.color}
            </h2>
            <h3 className={classes.ProductPage__price}>{product.price} ₽</h3>
            <div className={classes.description__block}>
              <div className={classes.description__title}>ОПИСАНИЕ</div>
              <div className={classes.description__text}>{product.description}</div>
            </div>
<<<<<<< HEAD
            <div style={{maxWidth: 576}}> 
              <div className={classes.hint} onClick={openPopup}>
                <div style={{fontSize: 'calc(12px + 8 * ((100vw - 320px) / 1600))'}}>Размерная сетка</div>
                <img src={plus} alt="плюс" className={isPopupOpen ? classes.active : ''} style={{maxWidth: "4%", margin: 0 }} />
              </div>
              <div className={classes.hint} onClick={toggleHint}>
                <div style={{fontSize: 'calc(12px + 8 * ((100vw - 320px) / 1600))'}}>Моего размера нет в наличии</div>
                <img src={plus} alt="плюс" className={isHintOpen ? classes.active : ''} style={{maxWidth: "4%", margin: 0, }} />
              </div>
              <div className={isHintOpen ? classes.SizeNotAvailable : classes.hidden}>
                <div className={classes.ContactUs}>
                    <>
                      Вашего размера не оказалось в наличии? Свяжитесь с нашим <a href="https://t.me/NiceDunksManager">менеджером</a> и он обязательно поможет вам в этом вопросе!
                    </>
                </div>
            </div>
            </div>
            {isPopupOpen && <MySizesPopup onClose={closePopup} />}
            {product.sizes ? (
              <MyDropdownMenu sizes={product.sizes} availableSizes={product.availableSizes} category={product.categories} vendorCode={vendorCode} addToCart={addToCart} img={product.images[0]} price={product.price} color={product.silhouette + ' ' + product.color} brand={formatBrand(product.brand)}/>
=======
            {product.sizes ? (
              <MyDropdownMenu sizes={product.sizes} availableSizes={product.availableSizes} category={product.categories}/>
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67
            ) : (
              <p>Loading sizes...</p>
            )}
          </div>
        )}
      </div>
      <div className={classes.ShippingInformation__wrapper}>
        <div className={classes.ShippingInformation__title}>ДОСТАВКА И ОПЛАТА</div>
          <ul style={{width: '100%', display: 'flex', cursor: 'default'}}>
            <li className={classes.ListWrapper}><div className={classes.ShippingInformation}>Самовывоз в городе Москва в районе метро Ботанический Сад.<br />Курьерская доставка по Москве осуществляется сервисами: <br /> Сдэк, Почта РФ и Boxberry. <br /> Стоимость доставки рассчитывается отдельно.</div></li>
<<<<<<< HEAD
            <li className={classes.ListWrapper}><div className={classes.ShippingInformation}>Оплата возможна переводом, наличными при самовывозе <br />или авито доставкой</div></li>
=======
            <li className={classes.ListWrapper}><div className={classes.ShippingInformation}>Самовывоз в городе Москва в районе метро Ботанический Сад. Курьерская доставка по Москве осуществляется сервисами: <br /> Сдэк, Почта РФ и Boxberry. <br /> Стоимость доставки рассчитывается отдельно.</div></li>
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67
          </ul>
      </div>
      <Footer />
    </div>
  );
};

<<<<<<< HEAD
export default ProductPage;

=======
export default ProductPage;
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67
