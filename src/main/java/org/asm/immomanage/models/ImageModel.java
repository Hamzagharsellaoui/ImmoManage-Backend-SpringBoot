package org.asm.immomanage.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="image_model")
public class ImageModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String type;
    private String filePath;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference("property-propertyImages")
    private Property property;

    public ImageModel(String originalFilename, String contentType, String filePath) {
        this.name = originalFilename;
        this.type = contentType;
        this.filePath = filePath;
    }
}
