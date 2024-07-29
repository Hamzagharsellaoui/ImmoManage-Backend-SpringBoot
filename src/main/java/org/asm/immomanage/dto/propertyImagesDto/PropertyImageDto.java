package org.asm.immomanage.dto.propertyImagesDto;

import lombok.Builder;

@Builder
public record PropertyImageDto(
        String imageUrl,
        long propertyId,
        String propertyAddress
) {}