package org.asm.immomanage.service;

import org.asm.immomanage.models.ImageModel;
import org.asm.immomanage.models.Property;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Set;

public interface IImageModelService {
    Set<ImageModel> uploadImage(MultipartFile[] multipartFiles, Property property)throws IOException;
}
