package com.atletaoficial.atletadigitalbackend.entity;

import com.atletaoficial.atletadigitalbackend.enums.Categoria;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_sessao_treino")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class SessaoTreino {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    private LocalDate dataTreino;

    @Enumerated(EnumType.STRING)
    private Categoria categoria;

    private String focoTreino; // Ex: Tático, Físico, Coletivo
    private String observacoesTreinador;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "treinador_id")
    private Funcionario treinador;
}