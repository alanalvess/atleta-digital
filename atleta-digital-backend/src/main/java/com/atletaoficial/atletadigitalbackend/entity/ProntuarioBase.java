package com.atletaoficial.atletadigitalbackend.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_prontuario_base")
public class ProntuarioBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atleta_id")
    private Atleta atleta;

    private String tipoSanguineo;
    private String alergias;
    private String historicoCirurgias;
    private String doencasCronicas;
    private String medicamentosUsoContinuo;
}
