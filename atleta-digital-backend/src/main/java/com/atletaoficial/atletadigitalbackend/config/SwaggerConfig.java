package com.atletaoficial.atletadigitalbackend.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    OpenAPI springAtletaDigitalOpenAPI() {
        final String securitySchemeName = "bearerAuth";

        return new OpenAPI()
                .info(new Info()
                        .title("Atleta Digital - O Perfil Oficial do Atleta")
                        .description("Atleta Digital - O Perfil Oficial do Atleta")
                        .version("v0.0.1")
                        .contact(new Contact()
                                .name("Atleta Digital")
                                .url("https://github.com/alanalvess")
                                .email("alan.alvess@outlook.com")))
                .externalDocs(new ExternalDocumentation()
                        .description("Github")
                        .url("https://github.com/alanalvess"))
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .components(new Components()
                        .addSecuritySchemes(securitySchemeName,
                                new SecurityScheme()
                                        .name(securitySchemeName)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")));
    }

    @Bean
    OpenApiCustomizer customerGlobalHeaderOpenApiCustomiser() {
        return openApi -> openApi.getPaths().values().forEach(pathItem -> pathItem.readOperations().forEach(operation -> {
            ApiResponses apiResponses = operation.getResponses();

            apiResponses.addApiResponse("200", createApiResponse("Sucesso!"));
            apiResponses.addApiResponse("201", createApiResponse("Objeto Persistido!"));
            apiResponses.addApiResponse("204", createApiResponse("Objeto Excluído!"));
            apiResponses.addApiResponse("400", createApiResponse("Erro na Requisição!"));
            apiResponses.addApiResponse("401", createApiResponse("Acesso Não Autorizado!"));
            apiResponses.addApiResponse("403", createApiResponse("Acesso Proibido!"));
            apiResponses.addApiResponse("404", createApiResponse("Objeto Não Encontrado!"));
            apiResponses.addApiResponse("500", createApiResponse("Erro na Aplicação!"));
        }));
    }

    private ApiResponse createApiResponse(String message) {
        return new ApiResponse().description(message);
    }
}