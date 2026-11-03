package com.atletaoficial.atletadigitalbackend.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ContratoFinanceiroResponse(
        Long id,
        Long atletaId,
        String atletaNome,
        String tipoVinculo,
        BigDecimal valorAcordado,
        Integer diaVencimento,
        Boolean isento,
        String observacoes,
        LocalDateTime dataCriacao,
        LocalDateTime dataAtualizacao,
        Boolean ativo
) {}
