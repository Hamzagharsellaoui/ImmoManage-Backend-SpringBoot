package org.asm.immomanage.repository;

import org.asm.immomanage.models.ImageModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageModelRepository extends JpaRepository<ImageModel,Long>{

}
