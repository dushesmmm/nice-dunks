import React, { useState, useEffect } from 'react';
import classes from './ProductsPage.module.css';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [loadedProductIds, setLoadedProductIds] = useState(new Set());
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' или 'desc'
  const [sortBy, setSortBy] = useState('createdAt');
  const [showSizeOptions, setShowSizeOptions] = useState(false);
  const [showBrandOptions, setShowBrandOptions] = useState(false);
  const [selectedBrandsData, setSelectedBrandsData] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [selectedSizeOptions, setSelectedSizeOptions] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [selectedBrandOptions, setSelectedBrandOptions] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://78.40.217.250:8081/api/sneakers?`);
      const data = await response.json();
      const newProducts = data.filter((product) => !loadedProductIds.has(product.vendorCode));
      newProducts.reverse();
      setOriginalProducts((prevOriginalProducts) => [...prevOriginalProducts, ...newProducts]);
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setLoadedProductIds((prevIds) => new Set([...prevIds, ...newProducts.map((product) => product.vendorCode)]));
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Ошибка при загрузке товаров', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleScroll = () => {
    const scrollThreshold = 100;
    const isCloseToBottom =
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - scrollThreshold;

    if (isCloseToBottom && !loading) {
      fetchProducts();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

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

  const handleSortClick = (sortType) => {
    if (sortType === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(sortType);
      setSortOrder('asc');
    }
  };

  const handleSizeOptionClick = async (size) => {
    try {
      const response = await fetch(`http://78.40.217.250:8081/api/sneakers?sizes=${size}`);
      const newData = await response.json();
      console.log('Полученные данные:', newData);
  
      if (selectedSizeOptions.includes(size)) {
        setSelectedSizeOptions((prevOptions) => prevOptions.filter((prevSize) => prevSize !== size));
      } else {
        const uniqueNewData = newData.filter((newItem) => {
          return !originalProducts.some((existingItem) => {
            return newItem.id === existingItem.id;
          });
        });
  
        setOriginalProducts((prevOriginalProducts) => [
          ...prevOriginalProducts,
          ...uniqueNewData,
        ]);
  
        setSelectedSizeOptions((prevOptions) => [...prevOptions, size]);
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };
  
  const handleBrandOptionClick = async (brand) => {
    try {
      const response = await fetch(`http://78.40.217.250:8081/api/sneakers?brands=${brand}`);
      const data = await response.json();
      console.log('Полученные данные:', data);
  
      const isBrandSelected = selectedBrandOptions.some((option) => option.brand === brand);
      if (isBrandSelected) {
        setSelectedBrandOptions((prevOptions) => prevOptions.filter((option) => option.brand !== brand));
        setProducts((prevProducts) => prevProducts.filter((product) => product.brand !== brand));
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data]);
        setSelectedBrandOptions((prevOptions) => [...prevOptions, ...data]);
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  const handleSizeFilterClick = () => {
    setShowSizeOptions((prevShowSizeOptions) => !prevShowSizeOptions);

  };

  const handleBrandFilterClick = () => {
    setShowBrandOptions((prevShowBrandOptions) => !prevShowBrandOptions);
  };

  const applyFilters = () => {
    let filteredProducts = [...originalProducts];
  
    // Фильтрация по размерам
    if (selectedSizeOptions.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.sizes.some((size) => selectedSizeOptions.includes(size))
      );
    }
  
    // Фильтрация по брендам
    if (selectedBrandOptions.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedBrandOptions.some((option) => option.brand === product.brand)
      );
    }
  
    // Сортировка
    if (sortBy === 'price') {
      filteredProducts.sort((a, b) => {
        const priceA = a.price;
        const priceB = b.price;
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
      });
    }
  
    if (sortBy === 'createdAt') {
      filteredProducts.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }
  
    setProducts(filteredProducts);
  };
  

  useEffect(() => {
    applyFilters();
  }, [selectedSizeOptions, selectedBrandOptions, sortOrder, sortBy, originalProducts]);

  useEffect(() => {
    const sizes = [...new Set(originalProducts.flatMap((product) => product.sizes))];
    sizes.sort((a, b) => parseFloat(a) - parseFloat(b));
    setAvailableSizes(sizes);

    const brands = [...new Set(originalProducts.map((product) => product.brand))];
    brands.sort((a, b) => parseFloat(a) - parseFloat(b));
    setAllBrands(brands);
  }, [originalProducts]);

  return (
    <div>
      <div className={classes.ProductsPage__Wrapper}>
        <div className={classes.ProductsPage__Filters}>
          <p>Сортировать по:</p>
          <ul>
            <li
              onClick={() => handleSizeFilterClick()}
              style={{ color: selectedSizeOptions.length > 0 ? '#AC8BD5' : '' }}
            >
              Размеры
              {showSizeOptions && (
                <div className={classes.Options}>
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      className={selectedSizeOptions.includes(size) ? classes.SelectedOption : ''}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSizeOptionClick(size);
                      }}
                    >
                      {size}
                    </button>
                  ))}
                  </div>
                )}
            </li>
            <li
              onClick={() => handleBrandFilterClick()}
              style={{ color: selectedBrandOptions.length > 0 ? '#AC8BD5' : '' }}
            >
              Бренды
              {showBrandOptions && (
                <div className={classes.Options}>
                  {allBrands.map((brand) => {
                      const isSelected = selectedBrandOptions.some(option => option.brand === brand);
                      const brandClass = isSelected ? classes.SelectedOption : '';

                      return (
                        <button
                          key={brand}
                          className={brandClass}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBrandOptionClick(brand);
                          }}
                        >
                        {formatBrand(brand)}
                        </button>
                      );
                    })}
                  </div>
                )}
            </li>
            <li
              onClick={() => handleSortClick('price')}
              style={{ color: sortBy === 'price' ? '#AC8BD5' : '' }}
            >
              Цена {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
            </li>
            <li
              onClick={() => handleSortClick('createdAt')}
              style={{ color: sortBy === 'createdAt' ? '#AC8BD5' : '' }}
            >
              Новизне {sortBy === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
            </li>
          </ul>
        </div>

        <div className={classes.Products__Wrapper}>
          {products.map((product, index) => (
            <div key={index} className={classes.product__card} onClick={() => redirectToProductPage(product.vendorCode)}>
              <h2>
                {formatBrand(product.brand) + ' ' + product.silhouette + ' ' + product.color}
              </h2>
              <h2>{product.price}₽</h2>
              <img src={product.images[0]} alt={product.brand} />
            </div>
          ))}
        </div>
      </div>

      {loading && <p>Загрузка...</p>}
    </div>
  );
};

export default ProductsPage;