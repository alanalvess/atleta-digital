package com.atletaoficial.atletadigitalbackend.entity;

import com.atletaoficial.atletadigitalbackend.enums.Categoria;
import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_equipes")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Equipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    private String temporada;

    @Enumerated(EnumType.STRING)
    private Categoria categoria;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "treinador_id")
    private Funcionario treinador;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "preparador_fisico_id")
    private Funcionario preparadorFisico;

    @OneToMany(mappedBy = "equipe", fetch = FetchType.LAZY)
    private List<Atleta> atletas = new ArrayList<>();
}
