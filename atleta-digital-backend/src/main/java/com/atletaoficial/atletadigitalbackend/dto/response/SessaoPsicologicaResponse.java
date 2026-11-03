package com.atletaoficial.atletadigitalbackend.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record SessaoPsicologicaResponse(
        Long id,
        Long atletaId,
        String atletaNome,
        Long psicologoId,
        String psicologoNome,
        LocalDate dataSessao,
        String nivelConcentracao,
        String nivelAutoconfianca,
        String controleEmocoes,
        String parecer,
        Boolean requerNovaSessao,
        LocalDateTime dataCriacao,
        LocalDateTime dataAtualizacao,
        Boolean ativo
) {}
