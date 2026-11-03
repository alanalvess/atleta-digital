package com.atletaoficial.atletadigitalbackend.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record AtendimentoMedicoResponse(
        Long id,
        Long atletaId,
        String atletaNome,
        LocalDate dataAtendimento,
        String queixaLesao,
        String conduta,
        Integer diasAfastamento,
        Boolean liberadoParaTreino,
        Long profissionalSaudeId,
        String profissionalSaudeNome,
        LocalDateTime dataCriacao,
        LocalDateTime dataAtualizacao,
        Boolean ativo
) {}
