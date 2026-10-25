package com.atletaoficial.atletadigitalbackend.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_acompanhamento_bimestral")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class AcompanhamentoBimestral {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "matricula_escolar_id")
    private MatriculaEscolar matricula;

    private Integer bimestre;
    private Double mediaNotas;
    private Double frequenciaEscolar;
    private Boolean dificuldadeReportada;
    private String ocorrencias;
}
