package com.atletaoficial.atletadigitalbackend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_avaliacao_desempenho")
public class AvaliacaoDesempenho {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atleta_id")
    private Atleta atleta;

    private String temporada;
    private LocalDate dataAvaliacao;

    private Integer notaPasse;
    private Integer notaFinalizacao;
    private Integer notaDrible;
    private Integer notaMarcacao;
    private Double mediaGeral;

    private String pontosFortes;
    private String pontosADesenvolver;
}