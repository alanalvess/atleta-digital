package com.atletaoficial.atletadigitalbackend.entity;

import com.atletaoficial.atletadigitalbackend.enums.Categoria;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_transicao_categoria")
public class TransicaoCategoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
}
