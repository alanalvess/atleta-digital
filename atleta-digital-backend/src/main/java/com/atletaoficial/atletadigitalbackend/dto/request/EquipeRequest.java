package com.atletaoficial.atletadigitalbackend.dto.request;

import com.atletaoficial.atletadigitalbackend.enums.Categoria;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EquipeRequest(
        @NotBlank(message = "A temporada é obrigatória") String temporada,
        @NotNull(message = "A categoria é obrigatória") Categoria categoria,
        Long treinadorId,
        Long preparadorFisicoId
) {}
