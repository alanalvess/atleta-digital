package com.atletaoficial.atletadigitalbackend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_sessao_psicologica")
public class SessaoPsicologica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atleta_id")
    private Atleta atleta;

    private LocalDate dataSessao;
    private String nivelConcentracao; // EXCELENTE, BOM, REGULAR
    private String nivelAutoconfianca;
    private String controleEmocoes;
    private String parecer;
    private Boolean requerNovaSessao;
}