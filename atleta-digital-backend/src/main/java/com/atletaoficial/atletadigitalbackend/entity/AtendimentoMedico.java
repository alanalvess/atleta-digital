package com.atletaoficial.atletadigitalbackend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_atendimento_medico")
public class AtendimentoMedico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atleta_id")
    private Atleta atleta;

    private LocalDate dataAtendimento;
    private String queixaLesao;
    private String conduta;
    private Integer diasAfastamento;
    private Boolean liberadoParaTreino;
}