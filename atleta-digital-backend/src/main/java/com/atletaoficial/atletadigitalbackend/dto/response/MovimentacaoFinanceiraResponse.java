package com.atletaoficial.atletadigitalbackend.dto.response;

import com.atletaoficial.atletadigitalbackend.enums.StatusPagamento;
import com.atletaoficial.atletadigitalbackend.enums.TipoMovimentacao;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record MovimentacaoFinanceiraResponse(
        Long id,
        Long atletaId,
        String atletaNome,
        String descricao,
        TipoMovimentacao tipo,
        BigDecimal valor,
        LocalDate dataVencimento,
        LocalDate dataPagamento,
        Long responsavelFinanceiroId,
        String responsavelFinanceiroNome,
        StatusPagamento status,
        LocalDateTime dataCriacao,
        LocalDateTime dataAtualizacao,
        Boolean ativo
) {}
