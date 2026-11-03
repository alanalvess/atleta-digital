package com.atletaoficial.atletadigitalbackend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record ContratoFinanceiroRequest(
        @NotNull(message = "O ID do atleta é obrigatório") Long atletaId,
        @NotBlank(message = "O tipo de vínculo é obrigatório") String tipoVinculo,
        BigDecimal valorAcordado,
        Integer diaVencimento,
        @NotNull(message = "A informação de isenção é obrigatória") Boolean isento,
        String observacoes
) {}
