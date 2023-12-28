import React from 'react';
import ProductCardMain from '../ProductCard/ProductCardMain';
import classes from './ProductListMain.module.css';

const ProductListMain = ({ products }) => {
  const sortedProducts = products.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const limitedProducts = sortedProducts.slice(0, 8);

  const redirectToAllProducts = () => {
    window.location.href = "/all%20products";
  };

  return (
    <div>
      <div className={classes.product__navigation}>
        <div className={classes.product__title}>НОВЫЕ ПОСТУПЛЕНИЯ</div>
        <div className={classes.product__title} onClick={redirectToAllProducts}>СМОТРЕТЬ ВСЕ</div>
      </div>
      <div className={classes.product__list}>
        {limitedProducts.map((product, index) => (
          <ProductCardMain key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListMain;