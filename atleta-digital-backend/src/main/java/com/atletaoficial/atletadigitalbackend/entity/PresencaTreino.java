package com.atletaoficial.atletadigitalbackend.entity;

import com.atletaoficial.atletadigitalbackend.enums.StatusPresenca;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_presenca_treino")
public class PresencaTreino {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atleta_id")
    private Atleta atleta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sessao_treino_id")
    private SessaoTreino sessaoTreino;

    @Enumerated(EnumType.STRING)
    private StatusPresenca status;
}
