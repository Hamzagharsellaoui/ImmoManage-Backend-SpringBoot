package org.asm.immomanage.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "property")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @Column(name = "rent_price", nullable = false)
    private double rentPrice;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "adresse", nullable = false, unique = true)
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status = Status.AVAILABLE;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL)

    private List<PropertyEquipments> propertyEquipments = new ArrayList<>();

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL)
    @JsonManagedReference("property-propertyImages")
    private List<PropertyImages> propertyImages = new ArrayList<>();

    @ManyToOne
    @JsonBackReference("property-manager")
    private User manager;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL)
    @JsonManagedReference("property-rentalContracts")
    private List<RentalContract> rentalContracts = new ArrayList<>();

    @ManyToMany(mappedBy = "properties")
    private List<Tenant> tenants = new ArrayList<>();




    public enum Status {
        OCCUPIED,
        AVAILABLE,
        UNDER_MAINTENANCE
    }

    public void addPropertyEquipment(PropertyEquipments equipment) {
        equipment.setProperty(this);
        this.propertyEquipments.add(equipment);
    }

    public void addPropertyImage(PropertyImages image) {
        image.setProperty(this);
        this.propertyImages.add(image);
    }
}
