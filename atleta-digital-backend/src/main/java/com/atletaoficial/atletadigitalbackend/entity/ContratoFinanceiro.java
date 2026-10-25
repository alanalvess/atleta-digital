package com.atletaoficial.atletadigitalbackend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_contrato_financeiro")
public class ContratoFinanceiro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atleta_id")
    private Atleta atleta;

    private String tipoVinculo; // GRATUITO, MENSALIDADE, BOLSA
    private BigDecimal valorAcordado;
    private Integer diaVencimento;
    private Boolean isento;
    private String observacoes;
}
