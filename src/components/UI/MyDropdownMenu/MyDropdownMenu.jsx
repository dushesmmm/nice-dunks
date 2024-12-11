import React, { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown-select';
import classes from './MyDropdownMenu.module.css';
import './MyDropdownMenu.css';
<<<<<<< HEAD
import { useCart } from '../../Cart/CartContext';

const MyDropdownMenu = ({ sizes, category, vendorCode, img, price, color, brand }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [options, setOptions] = useState([]);
  const availableSizes = sizes.map((size) => parseFloat(size));
  const { addToCart } = useCart();

  const generateOptions = (renderOptionLabel) => {
    if (category.accessories) {
      const isONESIZEAvailable = sizes.includes('ONESIZE');
      return isONESIZEAvailable
        ? [{ value: 'ONESIZE', label: 'ONESIZE' }]
        : [{ value: '', label: 'ONESIZE Нет в наличии', disabled: true }];
    } else if (category.newSneakers || category.preorder || category.used) {
      const sneakerSizes = Array.from({ length: 21 }, (_, index) => {
        const sizeValue = (index * 0.5 + 4).toString();
        const isAvailable = availableSizes.includes(parseFloat(sizeValue));
        return { value: sizeValue, disabled: !isAvailable, label: renderOptionLabel({ value: sizeValue }) };
      });
      return sneakerSizes;
    } else if (category.clothes) {
      const clothesSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => {
        const isAvailable = sizes.includes(size);
        return {
          value: size,
          disabled: !isAvailable,
          label: isAvailable ? `${size}` : `${size} Нет в наличии`,
        };
      });
      return clothesSizes;
    }
    return [];
  };
  
  useEffect(() => {
    const renderOptionLabel = (option) =>
      availableSizes.includes(parseFloat(option.value))
        ? `${option.value} US`
        : `${option.value} US Нет в наличии`;
  
    setOptions(generateOptions(renderOptionLabel));
  }, [category, sizes]);
  
=======

const MyDropdownMenu = ({ sizes, category }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [options, setOptions] = useState([]);
  const availableSizes = sizes.map((size) => parseFloat(size));

  useEffect(() => {
    const generateOptions = () => {
      if (category.accessories) {
        const isONESIZEAvailable = sizes.includes('ONESIZE');
        return isONESIZEAvailable
          ? [{ value: 'ONESIZE', label: 'ONESIZE' }]
          : [{ value: '', label: 'ONESIZE Нет в наличии', disabled: true }];
      } else if (category.newSneakers || category.preorder || category.used) {
        const sneakerSizes = Array.from({ length: 21 }, (_, index) => {
          const sizeValue = (index * 0.5 + 4).toString();
          const isAvailable = availableSizes.includes(parseFloat(sizeValue));
          return { value: sizeValue, disabled: !isAvailable, label: renderOptionLabel({ value: sizeValue }) };
        });
        return sneakerSizes;
      } else if (category.clothes) {
        const clothesSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => {
          const isAvailable = sizes.includes(size);
          return {
            value: size,
            disabled: !isAvailable,
            label: isAvailable ? `${size}` : `${size} Нет в наличии`,
          };
        });
        return clothesSizes;
      }
      return [];
    };

    setOptions(generateOptions());
  }, [category, sizes, availableSizes]);
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67

  const handleChange = (values) => {
    if (values.length > 0) {
      setSelectedSize(values[0].value);
    } else {
      setSelectedSize(null);
    }
  };

<<<<<<< HEAD
  const addToCartHandler = () => {
    if (selectedSize) {
      const product = {
        size: selectedSize,
        vendorCode: vendorCode,
        img: img,
        price: price,
        color: color,
        brand: brand
      };
      addToCart(product);
    } else {
      console.error('Размер не выбран.');
    }
  };

=======
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67
  const renderOptionLabel = (option) =>
    availableSizes.includes(parseFloat(option.value))
      ? `${option.value} US`
      : `${option.value} US Нет в наличии`;

  return (
    <div className='DropDown'>
      <div className={classes.dropdownContainer}>
        <Dropdown
          id="sizeDropdown"
          options={options}
          values={selectedSize ? [{ value: selectedSize.toString() }] : []}
          onChange={handleChange}
          placeholder="Выберите размер"
          labelfield="label"
          valuefield="value"
          dropdownhandle={true}
          searchable={false}
          clearable={false}
          keepselectedinlist={false}
          closeonselect={true}
          contentrenderer={({ props, state }) => (
            <div {...props} style={{ ...props.style, zIndex: 9999 }}>
              {state.values.length > 0 ? state.values[0].label : props.placeholder}
            </div>
          )}
          optionrenderer={({ props, state, methods }) => (
            <div
              {...props}
              onClick={() => !props.option.disabled && methods.addItem(props.option)}
              style={{ cursor: props.option.disabled ? 'not-allowed' : 'pointer', color: props.option.disabled ? '#999' : '#333' }}
            >
              {props.option.label}
            </div>
          )}
        />
<<<<<<< HEAD
        <button className={classes.addToCartButton} onClick={addToCartHandler}>Добавить в корзину</button>
=======
        <button className={classes.addToCartButton}>Добавить в корзину</button>
      </div>
      <div className={classes.SizeNotAvailable}>
        <div className={classes.ContactUs}>
          {category.accessories && (
            <>
              Вашего размера не оказалось в наличии?<br /> Свяжитесь с нашим <a href="https://t.me/NiceDunksManager">менеджером</a> и он обязательно поможем вам в этом вопросе!
            </>
          )}
        </div>
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default MyDropdownMenu;
=======
export default MyDropdownMenu;
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67
