package com.atletaoficial.atletadigitalbackend.mapper;

import com.atletaoficial.atletadigitalbackend.dto.request.EquipeRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.EquipeResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.Equipe;
import com.atletaoficial.atletadigitalbackend.entity.Funcionario;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class EquipeMapper {

    public Equipe toEntity(EquipeRequest request, Funcionario treinador, Funcionario preparadorFisico) {
        return Equipe.builder()
                .temporada(request.temporada())
                .categoria(request.categoria())
                .treinador(treinador)
                .preparadorFisico(preparadorFisico)
                .build();
    }

    public EquipeResponse toResponse(Equipe equipe) {
        List<Long> atletaIds = equipe.getAtletas() != null
                ? equipe.getAtletas().stream().map(Atleta::getId).toList()
                : Collections.emptyList();

        return new EquipeResponse(
                equipe.getId(),
                equipe.getTemporada(),
                equipe.getCategoria(),
                equipe.getTreinador() != null ? equipe.getTreinador().getId() : null,
                equipe.getTreinador() != null ? equipe.getTreinador().getNomeCompleto() : null,
                equipe.getPreparadorFisico() != null ? equipe.getPreparadorFisico().getId() : null,
                equipe.getPreparadorFisico() != null ? equipe.getPreparadorFisico().getNomeCompleto() : null,
                atletaIds,
                equipe.getDataCriacao(),
                equipe.getDataAtualizacao(),
                equipe.getAtivo()
        );
    }
}
