package org.asm.immomanage.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.asm.immomanage.utils.Status;

import java.util.*;

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
    private Set<PropertyEquipments> propertyEquipments = new HashSet<>();


    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL)
    @JsonManagedReference("property-propertyImages")
    private Set<ImageModel> propertyImages = new HashSet<>();

    @ManyToOne
    @JsonBackReference("property-manager")
    private User manager;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL)
    @JsonManagedReference("property-rentalContracts")
    private List<RentalContract> rentalContracts = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "property_tenants",
            joinColumns = @JoinColumn(name = "property_id"),
            inverseJoinColumns = @JoinColumn(name = "tenant_id")
    )
    private Set<Tenant> tenants = new HashSet<>();

    private long idActualTenant;

    public void addPropertyEquipment(PropertyEquipments equipment) {
        equipment.setProperty(this);
        this.propertyEquipments.add(equipment);
    }

    public void addTenant(Tenant tenant) {
        if (this.tenants == null) {
            this.tenants = new HashSet<>();
        }
        this.tenants.add(tenant);
        tenant.getProperties().add(this);
    }
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Property property = (Property) obj;
        return Objects.equals(id, property.id);
    }
}
