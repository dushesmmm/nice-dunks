<<<<<<< HEAD
import ProductPage from '../components/pages/ProductPage/ProductPage';
import MainPage from '../components/pages/MainPage/MainPage';
import AllProducts from '../components/pages/AllProducts/AllProducts';
import Faq from '../components/pages/FAQ/Faq';
import NotFound from '../components/pages/NotFound/NotFound';

export const routes = [
    { path: '/', element: <MainPage />, key: 'main' },
    { path: '/product/:vendorCode', element: <ProductPage />, key: 'product-details' },
    { path: '/all products', element: <AllProducts/>, key: 'all-products'},
    { path: '/faq', element: <Faq />, key: 'faq'},
    { path: '/404', element: <NotFound />, key: 'not-found'}
=======
import Jordan from '../components/pages/Jordan/Jordan';
import NewBalance from '../components/pages/NewBalance/NewBalance';
import Nike from '../components/pages/Nike/Nike';
import NikeSB from '../components/pages/NikeSB/NikeSB';
import ProductPage from '../components/pages/ProductPage/ProductPage';
import MainPage from '../components/pages/MainPage/MainPage';
import AllProducts from '../components/pages/AllProducts/AllProducts';

export const routes = [
    { path: '/', element: <MainPage />, key: 'main' },
    { path: '/brands/Nike', element: <Nike />, key: 'nike' },
    { path: '/brands/Nike SB', element: <NikeSB />, key: 'nike-sb' },
    { path: '/brands/New Balance', element: <NewBalance />, key: 'new-balance' },
    { path: '/brands/Air Jordan', element: <Jordan />, key: 'jordan' },
    { path: '/product/:vendorCode', element: <ProductPage />, key: 'product-details' },
    { path: '/all products', element: <AllProducts/>, key: 'all-products'}
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67
];
