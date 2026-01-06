package mk.com.doma.dto;

import java.util.List;

public record CheckoutRequest(List<Long> productIds) { }
