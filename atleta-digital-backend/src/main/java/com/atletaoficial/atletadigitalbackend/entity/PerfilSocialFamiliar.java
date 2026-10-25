package com.atletaoficial.atletadigitalbackend.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_perfil_social_familiar")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class PerfilSocialFamiliar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atleta_id")
    private Atleta atleta;

    private Integer moradoresResidencia;
    private String responsavelRenda;
    private String faixaSalarial;
    private String tipoMoradia;
    private String meioTransporteTreino;
    private Integer tempoDeslocamentoMinutos;
    private Boolean dificuldadeAlimentacao;
    private String necessidadesApoio;
}