package com.atletaoficial.atletadigitalbackend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_avaliacao_desempenho")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class AvaliacaoDesempenho {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atleta_id")
    private Atleta atleta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "avaliador_id")
    private Funcionario avaliador;

    private String temporada;
    private LocalDate dataAvaliacao;

    private Integer notaPasse;
    private Integer notaFinalizacao;
    private Integer notaDrible;
    private Integer notaMarcacao;
    private Double mediaGeral;

    @Column(columnDefinition = "TEXT")
    private String pontosFortes;

    @Column(columnDefinition = "TEXT")
    private String pontosADesenvolver;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime dataCriacao;

    @UpdateTimestamp
    private LocalDateTime dataAtualizacao;
}