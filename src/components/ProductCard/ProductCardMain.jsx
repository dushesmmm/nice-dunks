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
<<<<<<< HEAD
      <img src={images[0]} alt={formatBrand(brand) + " " + silhouette + " " + color} />
=======
      <img src={images[0]} alt={brand} />
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67
      <h2>{formatBrand(brand) + " " + silhouette + " " + color}</h2>
    </div>
  );
};

export default ProductCardMain;
