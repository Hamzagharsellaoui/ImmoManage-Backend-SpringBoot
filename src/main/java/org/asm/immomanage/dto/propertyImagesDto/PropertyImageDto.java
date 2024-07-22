package org.asm.immomanage.dto.propertyImagesDto;

import lombok.Data;
@Data
public class PropertyImageDto {

    public PropertyImageDto(String imageUrl){
        this.imageUrl=imageUrl;
    }
    String imageUrl;

}
