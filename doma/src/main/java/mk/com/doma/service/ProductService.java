package mk.com.doma.service;

import mk.com.doma.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    List<Product> getAllProducts();
    Optional<Product> getProductById(Long id);
    Product save(Product product);
    Optional<Product> update(Long id, Product product);
    void delete(Long id);
    List<Product> getRecommendedProducts(String category);
    Long getPriceInCents(Double price);
    List<Product> getRecommendations(Long productId);

}
