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
import Footer from '../../Footer/Footer';
import { useCart } from '../../Cart/CartContext';
import { Helmet } from 'react-helmet';
import MySizesPopup from '../../UI/MySizesPopup/MySizesPopup';
import plus from '../../UI/icons/plus.svg'

const ProductPage = () => {
  const { vendorCode } = useParams();
  const [product, setProduct] = useState(null);
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
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Ошибка', error));
  }, [vendorCode]);

  const formatBrand = brand => {
    const words = brand.split(/\s*,\s*/);
    return words.length > 1 ? words.join(' X ') : brand;
  };

  const metaImage = product && product.images[0]

  const metaDescription = product && product.description

  const metaName = product && product.silhouette + " " + product.color

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };


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
      <HeaderNavigation />
      <div className={classes.productPage__wrapper}>
        {product && product.images ? (
          product.images.length === 1 ? (
            <div className={classes.singleImage}>
              <img src={product.images[0]} alt={`${product && product.brand ? formatBrand(product.brand) : ''} ${metaName}`} />
            </div>
          ) : (
            <MySlider className={classes.productPage__images} {...settings}>
              {product.images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`${product && product.brand ? formatBrand(product.brand) : ''} ${metaName} ${index}`} />
                </div>
              ))}
            </MySlider>
          )
        ) : (
          <p>Loading...</p>
        )}
        {product && (
          <div className={classes.ProductInfo_wrapper}>
            <h1 className={classes.ProductPage__brand}>
              {product.brand.includes(',') ? (
                product.brand.split(',').map((brand, index, array) => (
                  <React.Fragment key={index}>
                    <Link to={`/all%20products?brands=${brand.trim()}`}>{formatBrand(brand)}</Link>
                    {index !== array.length - 1 && <span className={classes.brandSeparator}> X </span>}
                  </React.Fragment>
                ))
              ) : (
                <Link to={`/all%20products?brands=${product.brand.trim()}`}>{formatBrand(product.brand)}</Link>
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
            <li className={classes.ListWrapper}><div className={classes.ShippingInformation}>Оплата возможна переводом, наличными при самовывозе <br />или авито доставкой</div></li>
          </ul>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;

