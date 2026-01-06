package mk.com.doma.controller;

import mk.com.doma.model.CartItem;
import mk.com.doma.service.CartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin("*")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public List<CartItem> getItems() {
        return cartService.getCartItems();
    }

    @PostMapping("/add")
    public void addItem(@RequestParam Long productId) {
        cartService.addToCart(productId);
    }

    @DeleteMapping("/clear")
    public void clear() {
        cartService.clearCart();
    }

}
