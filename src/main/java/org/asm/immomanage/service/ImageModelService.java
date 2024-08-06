package org.asm.immomanage.service;

import org.asm.immomanage.models.ImageModel;
import org.asm.immomanage.models.Property;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Set;


@Service
public class ImageModelService implements IImageModelService {

    private static final String IMAGE_DIR = "C:/Users/LENOVO/IdeaProjects/ImmoManage/src/main/resources/static/images/";
    @Override
    public Set<ImageModel> uploadImage(MultipartFile[] multipartFiles, Property property) throws IOException {
        Set<ImageModel> imageModels = new HashSet<>();
        for (MultipartFile file : multipartFiles) {
            String fileName = file.getOriginalFilename();
            String filePath = IMAGE_DIR + fileName;

            Files.createDirectories(Paths.get(IMAGE_DIR));
            file.transferTo(new File(filePath));

            ImageModel imageModel = new ImageModel();
            imageModel.setName(fileName);
            imageModel.setType(file.getContentType());
            imageModel.setFilePath(filePath);
            imageModel.setProperty(property);

            imageModels.add(imageModel);
        }
        return imageModels;
    }
}
