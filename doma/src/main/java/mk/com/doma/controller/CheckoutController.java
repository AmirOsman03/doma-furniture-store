package mk.com.doma.controller;

import com.stripe.exception.StripeException;
import mk.com.doma.dto.CheckoutRequest;
import mk.com.doma.dto.PaymentResponse;
import mk.com.doma.service.CartService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
@CrossOrigin(origins = "http://localhost:3000")
public class CheckoutController {

    private final CartService cartService;

    public CheckoutController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/create-payment-intent")
    public PaymentResponse createPayment(@RequestBody CheckoutRequest request) throws StripeException {
        // Логиката во сервисот ја пресметува сумата и креира PaymentIntent
        return cartService.createPaymentIntent(request);
    }
}
