/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import classes from './ProductsPage.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [loadedProductIds, setLoadedProductIds] = useState(new Set());
  const [sortOrder, setSortOrder] = useState('desc'); 
  const [sortBy, setSortBy] = useState('createdAt');
  const [showSizeOptions, setShowSizeOptions] = useState(false);
  const [showBrandOptions, setShowBrandOptions] = useState(false);
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [apiBrands, setApiBrands] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [selectedSizeOptions, setSelectedSizeOptions] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [selectedBrandOptions, setSelectedBrandOptions] = useState([]);
  const [selectedCategoryOptions, setSelectedCategoryOptions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedBrand = searchParams.get('brand');
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [isFixedTriggered, setIsFixedTriggered] = useState(false);
  const screenWidth = window.innerWidth;


  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://nicedunks.ru/api/sneakers?`);
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

  const handleScrollFixed = () => {
    const currentScrollPos = window.scrollY;
    const isMobile = screenWidth <= 486;
  
    if (isMobile) {
      setIsFixed(prevScrollPos > currentScrollPos);
      if (currentScrollPos < 100) {
        setIsFixed(false);
      }
      setPrevScrollPos(currentScrollPos);
    }
  };

  useEffect(() => {
    if (isFixed) {
      setIsFixedTriggered(true);
    } if (window.scrollY < 200) {
      setIsFixedTriggered(false)
    }
  }, [isFixed]);


  useEffect(() => {
    window.addEventListener('scroll', handleScrollFixed);
    return () => window.removeEventListener('scroll', handleScrollFixed);
  }, [prevScrollPos]);


  useEffect(() => {
    window.addEventListener('scroll', handleScrollFixed);
    return () => window.removeEventListener('scroll', handleScrollFixed);
  }, [prevScrollPos]);

  const getQueryParam = (name) => {
    const params = new URLSearchParams(location.search);
    return params.get(name);
  };
  useEffect(() => {
    const sizesParam = getQueryParam('sizes');
    const brandsParam = getQueryParam('brands');
    const categoryParam = getQueryParam('category');
    const sortByParam = getQueryParam('sortBy');
    const sortOrderParam = getQueryParam('sortOrder');

    if (sizesParam) {
      setSelectedSizeOptions(sizesParam.split(','));
    }

    if (brandsParam) {
      const brandOptions = brandsParam.split(',').map((brand) => ({ brand: brand.trim() }));
      setSelectedBrandOptions(brandOptions);
    }

    if (categoryParam) {
      setSelectedCategoryOptions(categoryParam.split(','));
    }

    if (sortByParam) {
      setSortBy(sortByParam);
    }

    if (sortOrderParam) {
      setSortOrder(sortOrderParam);
    }
  }, []);


  const updateUrl = () => {
    const searchParams = new URLSearchParams();

    if (selectedSizeOptions.length > 0) {
      searchParams.append('sizes', selectedSizeOptions.join(','));
    }

    if (selectedBrandOptions.length > 0) {
      searchParams.append('brands', selectedBrandOptions.map(option => option.brand).join(','));
    }

    if (selectedCategoryOptions.length > 0) {
      searchParams.append('category', selectedCategoryOptions.join(','));
    }

    searchParams.append('sortBy', sortBy);
    searchParams.append('sortOrder', sortOrder);

    navigate(`?${searchParams.toString()}`);
  };

  useEffect(() => {
    updateUrl();
  }, [selectedSizeOptions, selectedBrandOptions, selectedCategoryOptions, sortOrder, sortBy]);


  useEffect(() => {
    if (selectedBrand) {
      handleBrandOptionClick(selectedBrand);
    }
  }, [selectedBrand]);

  const fetchBrands = async () => {
    try {
      const response = await fetch('https://nicedunks.ru/api/brands');
      const data = await response.json();
      setApiBrands(data);
    } catch (error) {
      console.error('Ошибка при загрузке брендов:', error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

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

  const handleScrollPopup = () => {
    const currentScrollPos = window.scrollY;
    const isMobile = screenWidth <= 486;
  
    if (isMobile && (showSizeOptions || showBrandOptions || showCategoryOptions) && prevScrollPos < currentScrollPos) {
      setShowSizeOptions(false);
      setShowBrandOptions(false);
      setShowCategoryOptions(false);
    }
  
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollPopup);
    return () => window.removeEventListener('scroll', handleScrollPopup);
  }, [showSizeOptions, showBrandOptions, showCategoryOptions]);

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
      const response = await fetch(`https://nicedunks.ru/api/sneakers?sizes=${size}`);
      const newData = await response.json();
  
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
      const response = await fetch(`https://nicedunks.ru/api/sneakers?brands=${brand}`);
      const data = await response.json();
  
      const selectedBrands = brand.split(',').map(item => item.trim());
  
      const isBrandSelected = selectedBrandOptions.some((option) => {
        const optionBrands = option.brand.split(',').map(item => item.trim());
        return optionBrands.some(brand => selectedBrands.includes(brand));
      });
  
      if (isBrandSelected) {
        setSelectedBrandOptions((prevOptions) => prevOptions.filter((option) => {
          const optionBrands = option.brand.split(',').map(item => item.trim());
          return !optionBrands.some(brand => selectedBrands.includes(brand));
        }));
        setProducts((prevProducts) => prevProducts.filter((product) => !data.some((newItem) => newItem.id === product.id)));
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data]);
        setSelectedBrandOptions((prevOptions) => [...prevOptions, ...data]);
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };
  

  const handleCategoryOptionClick = async (category) => {
    try {
      const response = await fetch(`https://nicedunks.ru/api/sneakers?category=${category}`);
      const data = await response.json();
      console.log('Полученные данные:', data);

      const isCategorySelected = selectedCategoryOptions.indexOf(category) !== -1;
      if (isCategorySelected) {
        setSelectedCategoryOptions((prevOptions) => prevOptions.filter((option) => option !== category));
        setProducts((prevProducts) => prevProducts.filter((product) => !data.some((newItem) => newItem.id === product.id)));
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data]);
        setSelectedCategoryOptions((prevOptions) => [...prevOptions, category]);
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  const handleSizeFilterClick = () => {
    setShowSizeOptions((prevShowSizeOptions) => !prevShowSizeOptions);

    if (window.innerWidth <= 486) {
      setShowBrandOptions(false);
      setShowCategoryOptions(false);
    }
  };

  const handleBrandFilterClick = () => {
    setShowBrandOptions((prevShowBrandOptions) => !prevShowBrandOptions);
    if (window.innerWidth <= 486) {
      setShowSizeOptions(false);
      setShowCategoryOptions(false);
    }
  };

  const handleCategoryFilterClick = () => {
    setShowCategoryOptions((prevShowCategoryOptions) => !prevShowCategoryOptions);
    if (window.innerWidth <= 486) {
      setShowBrandOptions(false);
      setShowSizeOptions(false);
    }
  };

  const applyFilters = () => {
    let filteredProducts = [...originalProducts];
  
    if (selectedSizeOptions.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.sizes.some((size) => selectedSizeOptions.includes(size))
      );
    }
  
    if (selectedBrandOptions.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedBrandOptions.some((option) => option.brand === product.brand)
      );
    }

    if (selectedCategoryOptions.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
      selectedCategoryOptions.some((selectedCategory) => product.categories[selectedCategory]
    )
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
  }, [selectedSizeOptions, selectedBrandOptions, selectedCategoryOptions, sortOrder, sortBy, originalProducts]);

  useEffect(() => {
    const sizes = [...new Set(originalProducts.flatMap((product) => product.sizes))];
    sizes.sort((a, b) => parseFloat(a) - parseFloat(b));
    setAvailableSizes(sizes);

    const brands = [...new Set(originalProducts.map((product) => product.brand))];
    brands.sort((a, b) => parseFloat(a) - parseFloat(b));
    setAllBrands(brands);
  }, [originalProducts]);

  const categoryMapping = {
  accessories: 'Аксессуары',
  clothes: 'Одежда',
  newSneakers: 'Новые пары',
  preorder: 'Предзаказ',
  used: 'Б/У',
};

  return (
    <div>
      <div className={classes.Wrapper}>
      <div className={`${classes.Filters} ${isFixed ? classes.fixed : (screenWidth <= 486 && isFixedTriggered ? classes.notfixed : '')}`}>
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
                  {apiBrands.map((brand) => {
                    const isSelected = selectedBrandOptions.some((option) => option.brand === brand);
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
              onClick={() => handleCategoryFilterClick()}
              style={{ color: selectedCategoryOptions.length > 0 ? '#AC8BD5' : '' }}
            >
              Категории
              {showCategoryOptions && (
                <div className={classes.Options}>
                  {Object.keys(categoryMapping).map((categoryKey) => (
                  <button
                    key={categoryKey}
                    className={selectedCategoryOptions.includes(categoryKey) ? classes.SelectedOption : ''}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryOptionClick(categoryKey);
                    }}
                  >
                    {categoryMapping[categoryKey]}
                  </button>
                ))}
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
              <img src={product.images[0]} alt={formatBrand(product.brand) + ' ' + product.silhouette + ' ' + product.color} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;