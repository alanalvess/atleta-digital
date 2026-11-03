package com.atletaoficial.atletadigitalbackend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_responsavel_legal")
@SQLRestriction("ativo = true")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ResponsavelLegal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atleta_id")
    private Atleta atleta;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String parentesco;

    @Column(nullable = false)
    private String cpf;

    private String telefone;
    private String email;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime dataCriacao;

    @UpdateTimestamp
    private LocalDateTime dataAtualizacao;

    @Builder.Default
    @Column(nullable = false)
    private Boolean ativo = true;
}