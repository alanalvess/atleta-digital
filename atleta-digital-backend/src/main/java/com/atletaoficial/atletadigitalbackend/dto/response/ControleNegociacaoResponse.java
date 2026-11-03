package com.atletaoficial.atletadigitalbackend.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ControleNegociacaoResponse(
        Long id,
        Long atletaId,
        String atletaNome,
        String temporada,
        String clubeInteressado,
        String paisEstadoClube,
        String operacao,
        String status,
        BigDecimal valorNegociacao,
        Double percentualDireitosClube,
        String nomeEmpresario,
        Double comissaoEmpresario,
        String observacoes,
        LocalDateTime dataCriacao,
        LocalDateTime dataAtualizacao,
        Boolean ativo
) {}
