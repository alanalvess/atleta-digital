package com.atletaoficial.atletadigitalbackend.dto.request;

import jakarta.validation.constraints.NotNull;

public record ProntuarioBaseRequest(
        @NotNull(message = "O ID do atleta é obrigatório") Long atletaId,
        String tipoSanguineo,
        String alergias,
        String historicoCirurgias,
        String doencasCronicas,
        String medicamentosUsoContinuo
) {}
