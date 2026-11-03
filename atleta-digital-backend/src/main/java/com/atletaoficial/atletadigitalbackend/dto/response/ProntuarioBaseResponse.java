package com.atletaoficial.atletadigitalbackend.dto.response;

import java.time.LocalDateTime;

public record ProntuarioBaseResponse(
        Long id,
        Long atletaId,
        String atletaNome,
        String tipoSanguineo,
        String alergias,
        String historicoCirurgias,
        String doencasCronicas,
        String medicamentosUsoContinuo,
        LocalDateTime dataCriacao,
        LocalDateTime dataAtualizacao,
        Boolean ativo
) {}
