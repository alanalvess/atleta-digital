package com.atletaoficial.atletadigitalbackend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record ControleNegociacaoRequest(
        @NotNull(message = "O ID do atleta é obrigatório") Long atletaId,
        @NotBlank(message = "A temporada é obrigatória") String temporada,
        @NotBlank(message = "O clube interessado é obrigatório") String clubeInteressado,
        String paisEstadoClube,
        @NotBlank(message = "O tipo de operação é obrigatório") String operacao,
        @NotBlank(message = "O status da negociação é obrigatório") String status,
        BigDecimal valorNegociacao,
        Double percentualDireitosClube,
        String nomeEmpresario,
        Double comissaoEmpresario,
        String observacoes
) {}
