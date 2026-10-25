package com.atletaoficial.atletadigitalbackend.entity;

import com.atletaoficial.atletadigitalbackend.enums.Categoria;
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
@Table(name = "tb_transicao_categoria")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class TransicaoCategoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atleta_id")
    private Atleta atleta;

    private String temporada;

    @Enumerated(EnumType.STRING)
    private Categoria categoriaAtual;

    @Enumerated(EnumType.STRING)
    private Categoria novaCategoria;

    private LocalDate dataTransicao;
    private String motivoTransicao;
    private String status;
    private String parecerComissaoAnterior;
    private String parecerComissaoNova;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime dataCriacao;

    @UpdateTimestamp
    private LocalDateTime dataAtualizacao;
}
