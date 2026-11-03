package com.atletaoficial.atletadigitalbackend.dto.request;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record SessaoPsicologicaRequest(
        @NotNull(message = "O ID do atleta é obrigatório") Long atletaId,
        @NotNull(message = "O ID do psicólogo responsável é obrigatório") Long psicologoId,
        @NotNull(message = "A data da sessão é obrigatória") LocalDate dataSessao,
        String nivelConcentracao,
        String nivelAutoconfianca,
        String controleEmocoes,
        String parecer,
        @NotNull(message = "A indicação de necessidade de nova sessão é obrigatória") Boolean requerNovaSessao
) {}
