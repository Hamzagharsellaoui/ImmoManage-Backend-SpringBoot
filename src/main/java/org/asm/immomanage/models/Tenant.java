package org.asm.immomanage.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Tenant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cin;
    private String name;
    private String email;
    private String phoneNumber;
    private String address;

    @OneToOne
    private RentalHistory rentalHistory;

    @ManyToMany
    @JoinTable(
            name = "tenant_property",
            joinColumns = @JoinColumn(name = "tenant_id"),
            inverseJoinColumns = @JoinColumn(name = "property_id")
    )
    private List<Property> properties;

    @OneToMany(mappedBy = "tenantC", cascade = CascadeType.ALL)
    @JsonManagedReference("tenant-rentalContracts")
    private List<RentalContract> rentalContracts;

    @ManyToOne
    @JsonBackReference("tenant-manager")
    private User manager;
}
