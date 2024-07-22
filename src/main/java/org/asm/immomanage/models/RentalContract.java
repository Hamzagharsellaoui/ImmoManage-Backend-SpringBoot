package org.asm.immomanage.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.math.BigDecimal;

@Data
@RequiredArgsConstructor
@Entity
public class RentalContract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference("property-rentalContracts")
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    @ManyToOne
    @JsonBackReference("tenant-rentalContracts")
    @JoinColumn(name = "tenant_id", nullable = false)
    private Tenant tenantC;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private BigDecimal monthlyRent;

    @Column(nullable = false)
    private String terms;
}
