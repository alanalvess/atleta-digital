package com.atletaoficial.atletadigitalbackend.entity;

import com.atletaoficial.atletadigitalbackend.enums.Categoria;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_transicao_categoria")
@SQLRestriction("ativo = true")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class TransicaoCategoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atleta_id", nullable = false)
    private Atleta atleta;

    private String temporada;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Categoria categoriaAtual;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Categoria novaCategoria;

    @Column(nullable = false)
    private LocalDate dataTransicao;

    private String motivoTransicao;
    private String status;

    @Column(columnDefinition = "TEXT")
    private String parecerComissaoAnterior;

    @Column(columnDefinition = "TEXT")
    private String parecerComissaoNova;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "treinador_anterior_id")
    private Funcionario treinadorAnterior;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "treinador_novo_id")
    private Funcionario treinadorNovo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coordenador_tecnico_id")
    private Funcionario coordenadorTecnico;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime dataCriacao;

    @UpdateTimestamp
    private LocalDateTime dataAtualizacao;

    @Builder.Default
    @Column(nullable = false)
    private Boolean ativo = true;
}