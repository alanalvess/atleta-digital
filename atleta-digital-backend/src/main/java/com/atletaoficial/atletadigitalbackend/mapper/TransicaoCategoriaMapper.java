package com.atletaoficial.atletadigitalbackend.mapper;

import com.atletaoficial.atletadigitalbackend.dto.request.TransicaoCategoriaRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.TransicaoCategoriaResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.Funcionario;
import com.atletaoficial.atletadigitalbackend.entity.TransicaoCategoria;
import org.springframework.stereotype.Component;

@Component
public class TransicaoCategoriaMapper {

    public TransicaoCategoria toEntity(
            TransicaoCategoriaRequest request,
            Atleta atleta,
            Funcionario treinadorAnterior,
            Funcionario treinadorNovo,
            Funcionario coordenador) {

        return TransicaoCategoria.builder()
                .atleta(atleta)
                .temporada(request.temporada())
                .categoriaAtual(request.categoriaAtual())
                .novaCategoria(request.novaCategoria())
                .dataTransicao(request.dataTransicao())
                .motivoTransicao(request.motivoTransicao())
                .status(request.status())
                .parecerComissaoAnterior(request.parecerComissaoAnterior())
                .parecerComissaoNova(request.parecerComissaoNova())
                .treinadorAnterior(treinadorAnterior)
                .treinadorNovo(treinadorNovo)
                .coordenadorTecnico(coordenador)
                .aprovadoTreinadorAnterior(request.aprovadoTreinadorAnterior() != null ? request.aprovadoTreinadorAnterior() : false)
                .aprovadoTreinadorNovo(request.aprovadoTreinadorNovo() != null ? request.aprovadoTreinadorNovo() : false)
                .aprovadoCoordenadorTecnico(request.aprovadoCoordenadorTecnico() != null ? request.aprovadoCoordenadorTecnico() : false)
                .build();
    }

    public TransicaoCategoriaResponse toResponse(TransicaoCategoria transicao) {
        return new TransicaoCategoriaResponse(
                transicao.getId(),
                transicao.getAtleta() != null ? transicao.getAtleta().getId() : null,
                transicao.getAtleta() != null ? transicao.getAtleta().getNomeCompleto() : null,
                transicao.getTemporada(),
                transicao.getCategoriaAtual(),
                transicao.getNovaCategoria(),
                transicao.getDataTransicao(),
                transicao.getMotivoTransicao(),
                transicao.getStatus(),
                transicao.getParecerComissaoAnterior(),
                transicao.getParecerComissaoNova(),
                transicao.getTreinadorAnterior() != null ? transicao.getTreinadorAnterior().getId() : null,
                transicao.getTreinadorAnterior() != null ? transicao.getTreinadorAnterior().getNomeCompleto() : null,
                transicao.getTreinadorNovo() != null ? transicao.getTreinadorNovo().getId() : null,
                transicao.getTreinadorNovo() != null ? transicao.getTreinadorNovo().getNomeCompleto() : null,
                transicao.getCoordenadorTecnico() != null ? transicao.getCoordenadorTecnico().getId() : null,
                transicao.getCoordenadorTecnico() != null ? transicao.getCoordenadorTecnico().getNomeCompleto() : null,
                transicao.getAprovadoTreinadorAnterior(),
                transicao.getAprovadoTreinadorNovo(),
                transicao.getAprovadoCoordenadorTecnico(),
                transicao.getDataCriacao(),
                transicao.getDataAtualizacao(),
                transicao.getAtivo()
        );
    }
}
