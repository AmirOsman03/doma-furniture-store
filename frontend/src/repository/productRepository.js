import axiosInstance from "../axios/axios.js";

const productRepository = {
    getAllProducts: async () => {
        return axiosInstance.get("/products");
    },
    getProductById: async (id) => {
        return axiosInstance.get(`/products/${id}`);
    },
    getRecommendations: async (id) => {
        return axiosInstance.get(`/products/${id}/recommendations`);
    }
}

export default productRepository;