package org.asm.immomanage.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.security.SecurityScheme;

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
@SecurityScheme(
        name = "bearerAuth",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat="JWT",
        in= SecuritySchemeIn.HEADER
)
public class OpenApiDefinition {
}
