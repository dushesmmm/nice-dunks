import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './ProductCardMain.module.css';

const ProductCardMain = ({ product }) => {
  const { brand, images, silhouette, color, vendorCode } = product;
  const link = `/product/${vendorCode.toLowerCase()}`;
  const navigate = useNavigate();

  const formatBrand = (brand) => {
    const words = brand.split(/\s*,\s*/);
    if (words.length > 1) {
      return words.join(' X ');
    }
    return brand;
  };

  const redirectToProductPage = () => {
    navigate(link);
  };

  return (
    <div className={classes.product__card} onClick={redirectToProductPage}>
      <img src={images[0]} alt={formatBrand(brand) + " " + silhouette + " " + color} />
      <h2>{formatBrand(brand) + " " + silhouette + " " + color}</h2>
    </div>
  );
};

export default ProductCardMain;
