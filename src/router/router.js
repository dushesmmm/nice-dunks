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
];
