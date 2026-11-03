package com.atletaoficial.atletadigitalbackend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record AtendimentoMedicoRequest(
        @NotNull(message = "O ID do atleta é obrigatório") Long atletaId,
        @NotNull(message = "A data do atendimento é obrigatória") LocalDate dataAtendimento,
        @NotBlank(message = "A queixa ou lesão é obrigatória") String queixaLesao,
        @NotBlank(message = "A conduta médica é obrigatória") String conduta,
        Integer diasAfastamento,
        @NotNull(message = "A liberação para treino é obrigatória") Boolean liberadoParaTreino,
        @NotNull(message = "O ID do profissional de saúde é obrigatório") Long profissionalSaudeId
) {}
