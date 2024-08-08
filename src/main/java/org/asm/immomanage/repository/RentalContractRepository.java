package org.asm.immomanage.repository;

import org.asm.immomanage.models.RentalContract;
import org.asm.immomanage.models.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface RentalContractRepository extends JpaRepository<RentalContract, Integer> {
    @Query()
    RentalContract getByTenant(Tenant tenant);

}
