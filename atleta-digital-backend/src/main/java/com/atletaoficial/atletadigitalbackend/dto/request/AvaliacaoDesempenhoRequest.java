package com.atletaoficial.atletadigitalbackend.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record AvaliacaoDesempenhoRequest(
        @NotNull(message = "O ID do atleta é obrigatório") Long atletaId,
        @NotNull(message = "O ID do avaliador é obrigatório") Long avaliadorId,
        @NotBlank(message = "A temporada é obrigatória") String temporada,
        @NotNull(message = "A data da avaliação é obrigatória") LocalDate dataAvaliacao,

        @Min(1) @Max(5) Integer notaPasse,
        @Min(1) @Max(5) Integer notaFinalizacao,
        @Min(1) @Max(5) Integer notaDrible,
        @Min(1) @Max(5) Integer notaMarcacao,

        String pontosFortes,
        String pontosADesenvolver
) {}
