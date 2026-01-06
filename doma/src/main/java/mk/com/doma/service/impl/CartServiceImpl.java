package mk.com.doma.service.impl;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import mk.com.doma.dto.CheckoutRequest;
import mk.com.doma.dto.PaymentResponse;
import mk.com.doma.model.CartItem;
import mk.com.doma.model.Product;
import mk.com.doma.service.CartService;
import mk.com.doma.service.ProductService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    private final ProductService productService;
    private List<CartItem> cart = new ArrayList<>();

    public CartServiceImpl(ProductService productService) {
        this.productService = productService;
    }

    public List<CartItem> getCartItems() {
        return cart;
    }

    public void addToCart(Long productId) {
        // 1. Најди го производот во листата на производи
        Product p = productService.getProductById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // 2. Креирај CartItem со сите податоци
        CartItem newItem = new CartItem(
                p
        );

        // 3. Додади го во листата
        cart.add(newItem);
    }

    public void clearCart() {
        cart.clear();
    }

    @Override
    public PaymentResponse createPaymentIntent(CheckoutRequest request) throws StripeException {
        // TODO: Enter your Stripe API key here
        Stripe.apiKey = "";

        // 1. Пресметај сума директно од бекенд податоците
        double calculatedTotal = request.productIds().stream()
                .map(id -> productService.getProductById(id).orElseThrow())
                .mapToDouble(Product::getPrice)
                .sum();

        // 2. Конвертирај во дени за Stripe
        long amountInCents = Math.round(calculatedTotal * 100);

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amountInCents)
                .setCurrency("mkd")
                .build();

        PaymentIntent intent = PaymentIntent.create(params);
        return new PaymentResponse(intent.getClientSecret());
    }

}
