package org.asm.immomanage.repository;

import org.asm.immomanage.models.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    Optional<Property> findByAddress(String address);

    List<Property> findAll();
}
