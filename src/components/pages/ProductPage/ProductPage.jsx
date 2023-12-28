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
import Footer from '../../Footer/Footer'

const ProductPage = () => {
  const { vendorCode } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://78.40.217.250:8081/api/sneakersById?id=${vendorCode.toUpperCase()}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Ошибка', error));
  }, [vendorCode]);

  const formatBrand = brand => {
    const words = brand.split(/\s*,\s*/);
    return words.length > 1 ? words.join(' X ') : brand;
  };

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
      <HeaderNavigation />
      <div className={classes.productPage__wrapper}>
        {product && product.images ? (
          product.images.length === 1 ? (
            <div className={classes.singleImage}>
              <img src={product.images[0]} alt="Изображение кроссовок" />
            </div>
          ) : (
            <MySlider className={classes.productPage__images} {...settings}>
              {product.images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Изображение кроссовок ${index}`} />
                </div>
              ))}
            </MySlider>
          )
        ) : (
          <p>Loading...</p>
        )}
        {product && (
          <div>
            <h1 className={classes.ProductPage__brand}>
              {product.brand.includes(',') ? (
                product.brand.split(',').map((brand, index, array) => (
                  <React.Fragment key={index}>
                    <Link to={`/brands/${brand.trim()}`}>{formatBrand(brand)}</Link>
                    {index !== array.length - 1 && <span className={classes.brandSeparator}> X </span>}
                  </React.Fragment>
                ))
              ) : (
                <Link to={`/brands/${product.brand.trim()}`}>{formatBrand(product.brand)}</Link>
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
            {product.sizes ? (
              <MyDropdownMenu sizes={product.sizes} availableSizes={product.availableSizes} category={product.categories}/>
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
            <li className={classes.ListWrapper}><div className={classes.ShippingInformation}>Самовывоз в городе Москва в районе метро Ботанический Сад. Курьерская доставка по Москве осуществляется сервисами: <br /> Сдэк, Почта РФ и Boxberry. <br /> Стоимость доставки рассчитывается отдельно.</div></li>
          </ul>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;