package mk.com.doma.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    private Long id;
    private String name;
    private String category;
    private String description;
    private Double price;
    private Integer stockQuantity;
    private String style;
    private String image_url;

    public Product(Long id, String name, String category, Double price, String style, String image_url) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.style = style;
        this.image_url = image_url;
    }

}
