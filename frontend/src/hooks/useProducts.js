import {useCallback, useEffect, useState} from "react";
import productRepository from "../repository/productRepository.js";

const initialState = {
    products: [],
    loading: true
}

const useProducts = () => {
    const [state, setState] = useState(initialState);

    const fetchProducts = useCallback(() => {
        productRepository
            .getAllProducts()
            .then(response => {
                setState({
                    products: response.data,
                    loading: false
                });
            })
            .catch(error => {
                console.error("Грешка при влечење производи:", error);
                setState({
                    products: [],
                    loading: false
                });
            });
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return state;
}

export default useProducts;