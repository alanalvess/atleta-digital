package com.atletaoficial.atletadigitalbackend.dto.request;

import com.atletaoficial.atletadigitalbackend.enums.TurnoEscolar;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record MatriculaEscolarRequest(
        @NotNull(message = "O ID do atleta é obrigatório") Long atletaId,
        @NotBlank(message = "A temporada é obrigatória") String temporada,
        @NotBlank(message = "O nome da escola é obrigatório") String nomeEscola,
        String redeEnsino,
        String anoSerie,
        @NotNull(message = "O turno é obrigatório") TurnoEscolar turno
) {}