package com.atletaoficial.atletadigitalbackend.dto.request;

import com.atletaoficial.atletadigitalbackend.enums.StatusPagamento;
import com.atletaoficial.atletadigitalbackend.enums.TipoMovimentacao;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

public record MovimentacaoFinanceiraRequest(
        @NotNull(message = "O ID do atleta é obrigatório") Long atletaId,
        @NotBlank(message = "A descrição é obrigatória") String descricao,
        @NotNull(message = "O tipo de movimentação é obrigatório") TipoMovimentacao tipo,
        @NotNull(message = "O valor é obrigatório") BigDecimal valor,
        @NotNull(message = "A data de vencimento é obrigatória") LocalDate dataVencimento,
        LocalDate dataPagamento,
        Long responsavelFinanceiroId,
        @NotNull(message = "O status do pagamento é obrigatório") StatusPagamento status
) {}
