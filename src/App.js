import { BrowserRouter} from "react-router-dom";
import './styles/app.css';
import AppRouter from "./components/AppRouter";
import { CartProvider } from "./components/Cart/CartContext";

function App() {
  return (
    <CartProvider>
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
