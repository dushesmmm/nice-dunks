import React, { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown-select';
import classes from './MyDropdownMenu.module.css';
import './MyDropdownMenu.css';

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

  const handleChange = (values) => {
    if (values.length > 0) {
      setSelectedSize(values[0].value);
    } else {
      setSelectedSize(null);
    }
  };

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
      </div>
    </div>
  );
};

export default MyDropdownMenu;
