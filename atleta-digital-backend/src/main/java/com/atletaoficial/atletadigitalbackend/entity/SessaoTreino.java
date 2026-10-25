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
@Table(name = "tb_sessao_treino")
public class SessaoTreino {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dataTreino;

    @Enumerated(EnumType.STRING)
    private Categoria categoria;

    private String focoTreino; // Ex: Tático, Físico, Coletivo
    private String observacoesTreinador;
}