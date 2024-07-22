package org.asm.immomanage.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.Contact;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name="Hamza Gharsellaoui",
                        email="Hamza.gharsellaoui@gmail.com"
                ),
                title = "ImmoManage Api specification",
                version = "1.0"
        )
)
public class OpenApiDefinition {
}
