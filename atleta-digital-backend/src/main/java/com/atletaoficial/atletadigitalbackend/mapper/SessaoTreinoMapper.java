package com.atletaoficial.atletadigitalbackend.mapper;

import com.atletaoficial.atletadigitalbackend.dto.request.SessaoTreinoRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.SessaoTreinoResponse;
import com.atletaoficial.atletadigitalbackend.entity.Funcionario;
import com.atletaoficial.atletadigitalbackend.entity.SessaoTreino;
import org.springframework.stereotype.Component;

@Component
public class SessaoTreinoMapper {

    public SessaoTreino toEntity(SessaoTreinoRequest request, Funcionario treinador) {
        return SessaoTreino.builder()
                .dataTreino(request.dataTreino())
                .categoria(request.categoria())
                .focoTreino(request.focoTreino())
                .observacoesTreinador(request.observacoesTreinador())
                .treinador(treinador)
                .build();
    }

    public SessaoTreinoResponse toResponse(SessaoTreino sessao) {
        return new SessaoTreinoResponse(
                sessao.getId(),
                sessao.getDataTreino(),
                sessao.getCategoria(),
                sessao.getFocoTreino(),
                sessao.getObservacoesTreinador(),
                sessao.getTreinador() != null ? sessao.getTreinador().getId() : null,
                sessao.getTreinador() != null ? sessao.getTreinador().getNomeCompleto() : null,
                sessao.getDataCriacao(),
                sessao.getDataAtualizacao(),
                sessao.getAtivo()
        );
    }
}
