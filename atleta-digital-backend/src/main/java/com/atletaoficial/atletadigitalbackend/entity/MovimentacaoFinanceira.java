package com.atletaoficial.atletadigitalbackend.entity;

import com.atletaoficial.atletadigitalbackend.enums.TipoMovimentacao;
import com.atletaoficial.atletadigitalbackend.enums.StatusPagamento;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_movimentacao_financeira")
public class MovimentacaoFinanceira {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atleta_id")
    private Atleta atleta;

    private String descricao;

    @Enumerated(EnumType.STRING)
    private TipoMovimentacao tipo;

    private BigDecimal valor;
    private LocalDate dataVencimento;
    private LocalDate dataPagamento;

    @Enumerated(EnumType.STRING)
    private StatusPagamento status;
}
