package com.atletaoficial.atletadigitalbackend.mapper;

import com.atletaoficial.atletadigitalbackend.dto.request.SessaoPsicologicaRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.SessaoPsicologicaResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.Funcionario;
import com.atletaoficial.atletadigitalbackend.entity.SessaoPsicologica;
import org.springframework.stereotype.Component;

@Component
public class SessaoPsicologicaMapper {

    public SessaoPsicologica toEntity(SessaoPsicologicaRequest request, Atleta atleta, Funcionario psicologo) {
        return SessaoPsicologica.builder()
                .atleta(atleta)
                .psicologo(psicologo)
                .dataSessao(request.dataSessao())
                .nivelConcentracao(request.nivelConcentracao())
                .nivelAutoconfianca(request.nivelAutoconfianca())
                .controleEmocoes(request.controleEmocoes())
                .parecer(request.parecer())
                .requerNovaSessao(request.requerNovaSessao())
                .build();
    }

    public SessaoPsicologicaResponse toResponse(SessaoPsicologica sessao) {
        return new SessaoPsicologicaResponse(
                sessao.getId(),
                sessao.getAtleta() != null ? sessao.getAtleta().getId() : null,
                sessao.getAtleta() != null ? sessao.getAtleta().getNomeCompleto() : null,
                sessao.getPsicologo() != null ? sessao.getPsicologo().getId() : null,
                sessao.getPsicologo() != null ? sessao.getPsicologo().getNomeCompleto() : null,
                sessao.getDataSessao(),
                sessao.getNivelConcentracao(),
                sessao.getNivelAutoconfianca(),
                sessao.getControleEmocoes(),
                sessao.getParecer(),
                sessao.getRequerNovaSessao(),
                sessao.getDataCriacao(),
                sessao.getDataAtualizacao(),
                sessao.getAtivo()
        );
    }
}
