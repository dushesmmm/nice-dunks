import HeaderNavigation from "../../UI/HeaderNavigation/HeaderNavigation";
import Footer from "../../Footer/Footer";
import ProductsPage from "../../ProductsPage/ProductsPage";

const AllProducts = () => {

    return (
        <div>
          <HeaderNavigation/>
            <ProductsPage/>
          <Footer/>
        </div>
      );
};    

export default AllProducts;