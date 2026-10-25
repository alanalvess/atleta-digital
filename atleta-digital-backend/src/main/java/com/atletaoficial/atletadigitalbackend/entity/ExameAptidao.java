package com.atletaoficial.atletadigitalbackend.entity;

import com.atletaoficial.atletadigitalbackend.enums.AptidaoFisica;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_exame_aptidao")
public class ExameAptidao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atleta_id")
    private Atleta atleta;

    private LocalDate dataExame;
    private LocalDate validade;
    private Double peso;
    private Double altura;
    private Double imc;
    private Double pressaoArterial;

    @Enumerated(EnumType.STRING)
    private AptidaoFisica aptidao;
}
