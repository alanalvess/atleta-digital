package com.atletaoficial.atletadigitalbackend.entity;

import com.atletaoficial.atletadigitalbackend.enums.Categoria;
import com.atletaoficial.atletadigitalbackend.enums.PeDominante;
import com.atletaoficial.atletadigitalbackend.enums.Posicao;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_atletas")
public class Atleta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nomeCompleto;

    private String nomeEsportivo;
    private LocalDate dataNascimento;
    private String cpf;
    private String rg;
    private String telefone;
    private String email;
    private String endereco;
    private String bairro;
    private String cep;

    @Enumerated(EnumType.STRING)
    private Categoria categoria;

    @Enumerated(EnumType.STRING)
    private Posicao posicao;

    @Enumerated(EnumType.STRING)
    private PeDominante peDominante;

    private Integer numeroCamisa;
    private LocalDate dataIngresso;
    private String codigoMatricula;

    @OneToOne(mappedBy = "atleta", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private ResponsavelLegal responsavelLegal;

    @OneToOne(mappedBy = "atleta", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private PerfilSocialFamiliar perfilSocialFamiliar;

    @OneToOne(mappedBy = "atleta", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private ContratoFinanceiro contratoFinanceiro;

    @OneToOne(mappedBy = "atleta", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private ProntuarioBase prontuarioBase;

    @OneToMany(mappedBy = "atleta", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<MovimentacaoFinanceira> movimentacoesFinanceiras = new ArrayList<>();

    @OneToMany(mappedBy = "atleta", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<AtendimentoMedico> atendimentosMedicos = new ArrayList<>();

    @OneToMany(mappedBy = "atleta", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ExameAptidao> examesAptidao = new ArrayList<>();

    @OneToMany(mappedBy = "atleta", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PresencaTreino> presencasTreinos = new ArrayList<>();

    @OneToMany(mappedBy = "atleta", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<AvaliacaoDesempenho> avaliacoesDesempenho = new ArrayList<>();

    @OneToMany(mappedBy = "atleta", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<MatriculaEscolar> matriculasEscolares = new ArrayList<>();

    @OneToMany(mappedBy = "atleta", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SessaoPsicologica> sessoesPsicologicas = new ArrayList<>();

    @OneToMany(mappedBy = "atleta", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TransicaoCategoria> transicoesCategoria = new ArrayList<>();

    @OneToMany(mappedBy = "atleta", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ControleNegociacao> controlesNegociacao = new ArrayList<>();

    public Integer calcularIdade() {
        if (dataNascimento == null) return null;
        return java.time.Period.between(dataNascimento, LocalDate.now()).getYears();
    }
}