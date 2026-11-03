package com.atletaoficial.atletadigitalbackend.mapper;

import com.atletaoficial.atletadigitalbackend.dto.request.ControleNegociacaoRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.ControleNegociacaoResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.ControleNegociacao;
import org.springframework.stereotype.Component;

@Component
public class ControleNegociacaoMapper {

    public ControleNegociacao toEntity(ControleNegociacaoRequest request, Atleta atleta) {
        return ControleNegociacao.builder()
                .atleta(atleta)
                .temporada(request.temporada())
                .clubeInteressado(request.clubeInteressado())
                .paisEstadoClube(request.paisEstadoClube())
                .operacao(request.operacao())
                .status(request.status())
                .valorNegociacao(request.valorNegociacao())
                .percentualDireitosClube(request.percentualDireitosClube())
                .nomeEmpresario(request.nomeEmpresario())
                .comissaoEmpresario(request.comissaoEmpresario())
                .observacoes(request.observacoes())
                .build();
    }

    public ControleNegociacaoResponse toResponse(ControleNegociacao negociacao) {
        return new ControleNegociacaoResponse(
                negociacao.getId(),
                negociacao.getAtleta() != null ? negociacao.getAtleta().getId() : null,
                negociacao.getAtleta() != null ? negociacao.getAtleta().getNomeCompleto() : null,
                negociacao.getTemporada(),
                negociacao.getClubeInteressado(),
                negociacao.getPaisEstadoClube(),
                negociacao.getOperacao(),
                negociacao.getStatus(),
                negociacao.getValorNegociacao(),
                negociacao.getPercentualDireitosClube(),
                negociacao.getNomeEmpresario(),
                negociacao.getComissaoEmpresario(),
                negociacao.getObservacoes(),
                negociacao.getDataCriacao(),
                negociacao.getDataAtualizacao(),
                negociacao.getAtivo()
        );
    }
}
