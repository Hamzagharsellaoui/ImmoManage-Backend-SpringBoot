package org.asm.immomanage.repository;

import org.asm.immomanage.models.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    Optional<Property> findByAddress(String address);
    List<Property> findAll();

    @Query("SELECT p FROM Property p WHERE p.id IN :propertyIds")
    Set<Property> findByIds(@Param("propertyIds") Set<Long> propertyIds);
}
