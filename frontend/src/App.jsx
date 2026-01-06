import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProductList from './ui/pages/ProductList';
import ProductDetails from './ui/pages/ProductDetails';
import Checkout from './ui/pages/Checkout';
import Cart from "./ui/pages/Cart.jsx";
import Navbar from "./ui/components/Navbar.jsx";
import Success from "./ui/pages/Success.jsx";

function App() {
    const [cartItems, setCartItems] = useState([]);

    // Функција за додавање во кошничка
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const exists = prevItems.find((item) => item.id === product.id);
            if (exists) {
                return prevItems.map((item) =>
                    item.id === product.id ? {...item, quantity: item.quantity + 1} : item
                );
            }
            return [...prevItems, {...product, quantity: 1}];
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, newQty) => {
        if (newQty < 1) return;
        setCartItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: newQty } : item
        ));
    };

    // Пресметај вкупен број на парчиња во кошничката
    const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <Router>
            <Navbar cartCount={totalItemsCount} />
            <Routes>
                <Route path="/" element={<ProductList addToCart={addToCart}/>}/>
                <Route path="/product/:id" element={<ProductDetails addToCart={addToCart}/>}/>
                <Route path="/checkout" element={<Checkout cartItems={cartItems}/>}/>
                <Route path="/cart" element={
                    <Cart
                        cartItems={cartItems}
                        removeFromCart={removeFromCart}
                        updateQuantity={updateQuantity}
                    />
                }/>
                <Route
                    path="/success"
                    element={<Success clearCart={clearCart} />}
                />
            </Routes>
        </Router>
    );
}

export default App;