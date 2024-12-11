import HeaderNavigation from "../../UI/HeaderNavigation/HeaderNavigation";
import Footer from "../../Footer/Footer";
import ProductsPage from "../../ProductsPage/ProductsPage";
import { Helmet } from 'react-helmet'

const AllProducts = () => {

    return (
        <div>
          <Helmet>
            <title>NiceDunks - новинки одежды и обуви купить оригинал в интернет магазине.</title>
            <meta name="description" content="Оригинальная одежда и обувь по выгодным ценам! У нас вы можете купить: Nike, Nike SB, New Balance, Air Jordan, Supreme, Palace и многое другое. Доставка по всей России." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://nicedunks.ru/" />
            <meta property="og:locale" content="ru_RU" />
            <meta property="og:image" content="https://nicedunks.ru/static/media/nicedunkslogo.d3dccfbda9340ee34374.png" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content="https://nicedunks.ru/static/media/nicedunkslogo.d3dccfbda9340ee34374.png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:title" content="NiceDunks - новинки одежды и обуви купить оригинал в интернет магазине." />
            <meta property="og:description" content="Оригинальная одежда и обувь по выгодным ценам! У нас вы можете купить: Nike, Nike SB, New Balance, Air Jordan, Supreme, Palace и многое другое. Доставка по всей России." />
          </Helmet>
          <HeaderNavigation/>
            <ProductsPage/>
          <Footer/>
        </div>
      );
};    

export default AllProducts;