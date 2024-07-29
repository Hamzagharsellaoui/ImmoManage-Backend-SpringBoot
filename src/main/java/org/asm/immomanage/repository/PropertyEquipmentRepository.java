package org.asm.immomanage.repository;

import org.asm.immomanage.models.PropertyEquipments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyEquipmentRepository extends JpaRepository<PropertyEquipments, Long> {
    List<PropertyEquipments> findByPropertyId(Long propertyId);
    PropertyEquipments findByPropertyIdAndPropertyAddress(Long propertyId, String propertyAddress);
}
