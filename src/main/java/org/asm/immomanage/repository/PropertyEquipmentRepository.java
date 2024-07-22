package org.asm.immomanage.repository;

import org.asm.immomanage.models.PropertyEquipments;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropertyEquipmentRepository extends JpaRepository<PropertyEquipments, Long> {
    List<PropertyEquipments> findByPropertyId(Long propertyId);
}
