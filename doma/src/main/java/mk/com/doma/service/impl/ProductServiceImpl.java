package mk.com.doma.service.impl;

import mk.com.doma.model.Product;
import mk.com.doma.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final List<Product> products = new ArrayList<>();

    public ProductServiceImpl() {
        products.add(new Product(
                1L,
                "Скандинавска Софа",
                "Furniture",
                "Удобна софа со три седишта, изработена од природни материјали и со минималистички дизајн.",
                45000.0,
                10,
                "Scandinavian",
                "https://images.unsplash.com/photo-1555041469-a586c61ea9bc"
        ));

        products.add(new Product(
                2L,
                "Минималистичка Маса",
                "Furniture",
                "Трпезариска маса од светол даб, идеална за модерни ентериери.",
                12000.0,
                5,
                "Scandinavian",
                "https://images.unsplash.com/photo-1752061667364-42445171640a?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ));

        products.add(new Product(
                3L,
                "Модерна Лампа",
                "Lighting",
                "Елегантна подна лампа која дава топла и пријатна светлина.",
                3500.0,
                15,
                "Modern",
                "https://images.unsplash.com/photo-1717172448983-2b0c098be9f7?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ));

        products.add(new Product(
                4L,
                "Скандинавска Комода",
                "Storage",
                "Пространа комода со четири фиоки и дрвени ногарки.",
                25000.0,
                3,
                "Scandinavian",
                "https://images.unsplash.com/photo-1595428774223-ef52624120d2"
        ));
    }

    @Override
    public List<Product> getAllProducts() {
        return products;
    }

    @Override
    public Optional<Product> getProductById(Long id) {
        return products.stream().filter(p -> p.getId().equals(id)).findFirst();
    }

    // Помошен метод за препораки (Upsell) по плаќање
    public List<Product> getRecommendedProducts(String category) {
        return products.stream()
                .filter(p -> p.getCategory().equalsIgnoreCase(category))
                .limit(2)
                .toList();
    }

    @Override
    public Product save(Product product) {
        products.add(product);
        return product;
    }

    @Override
    public Optional<Product> update(Long id, Product product) {
        return this.getProductById(id).map(existingProduct -> {
            existingProduct.setName(product.getName());
            existingProduct.setCategory(product.getCategory());
            existingProduct.setDescription(product.getDescription());
            existingProduct.setPrice(product.getPrice());
            existingProduct.setStockQuantity(product.getStockQuantity());
            existingProduct.setImage_url(product.getImage_url());
            return existingProduct;
        });
    }

    @Override
    public void delete(Long id) {
        products.removeIf(p -> p.getId().equals(id));
    }

    public Long getPriceInCents(Double price) {
        return Math.round(price * 100);
    }

    public List<Product> getRecommendations(Long productId) {
        // 1. Најди го производот што бил купен (врз основа на ID)
        Product purchasedProduct = products.stream()
                .filter(p -> p.getId().equals(productId))
                .findFirst()
                .orElse(null);

        // Ако производот не постои, врати празна листа
        if (purchasedProduct == null) {
            return new ArrayList<>();
        }

        // 2. Филтрирај ја листата: ист стил, но различно ID (да не се препорачува самиот себе)
        return products.stream()
                .filter(p -> p.getStyle().equalsIgnoreCase(purchasedProduct.getStyle()))
                .filter(p -> !p.getId().equals(productId))
                .limit(3) // Врати само топ 3 препораки
                .collect(Collectors.toList());
    }

}
