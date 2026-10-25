package com.atletaoficial.atletadigitalbackend.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_prontuario_base")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ProntuarioBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atleta_id")
    private Atleta atleta;

    private String tipoSanguineo;

    @Column(columnDefinition = "TEXT")
    private String alergias;

    @Column(columnDefinition = "TEXT")
    private String historicoCirurgias;

    @Column(columnDefinition = "TEXT")
    private String doencasCronicas;

    @Column(columnDefinition = "TEXT")
    private String medicamentosUsoContinuo;
}
