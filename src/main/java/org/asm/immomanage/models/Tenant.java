package org.asm.immomanage.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Tenant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cin;
    private String name;
    private String email;
    private String address;
    private String phoneNumber;
    private long idActualProperty;
    @OneToOne
    private RentalHistory rentalHistory;
    @ManyToMany
    @JsonManagedReference
    @JoinTable(
            name = "tenant_property",
            joinColumns = @JoinColumn(name = "tenant_id"),
            inverseJoinColumns = @JoinColumn(name = "property_id")
    )
    private Set<Property> properties= new HashSet<>();
    @OneToMany(mappedBy = "tenantC", cascade = CascadeType.ALL)
    @JsonManagedReference("tenant-rentalContracts")
    private List<RentalContract> rentalContracts;
    @ManyToOne
    @JsonBackReference("tenant-manager")
    private User manager;
    public void addProperty(Property property) {
        if (this.properties == null) {
            this.properties = new HashSet<>();
        }
        this.properties.add(property);
        property.getTenants().add(this);
        this.idActualProperty = property.getId();
    }
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Tenant tenant = (Tenant) obj;
        return Objects.equals(id, tenant.id);
    }
}

