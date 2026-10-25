package com.atletaoficial.atletadigitalbackend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_controle_negociacao")
public class ControleNegociacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atleta_id")
    private Atleta atleta;

    private String temporada;
    private String clubeInteressado;
    private String paisEstadoClube;
    private String operacao;
    private String status;
    private BigDecimal valorNegociacao;
    private Double percentualDireitosClube;
    private String nomeEmpresario;
    private Double comissaoEmpresario;
}
