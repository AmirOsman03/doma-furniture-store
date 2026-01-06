package mk.com.doma.service;

import com.stripe.exception.StripeException;
import mk.com.doma.dto.CheckoutRequest;
import mk.com.doma.dto.PaymentResponse;
import mk.com.doma.model.CartItem;

import java.util.List;

public interface CartService {

    List<CartItem> getCartItems();
    void addToCart(Long productId);
    void clearCart();
    PaymentResponse createPaymentIntent(CheckoutRequest request) throws StripeException;

}
