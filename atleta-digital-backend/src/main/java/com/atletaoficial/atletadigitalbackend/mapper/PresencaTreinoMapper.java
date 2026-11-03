package com.atletaoficial.atletadigitalbackend.mapper;

import com.atletaoficial.atletadigitalbackend.dto.request.PresencaTreinoRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.PresencaTreinoResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.PresencaTreino;
import com.atletaoficial.atletadigitalbackend.entity.SessaoTreino;
import org.springframework.stereotype.Component;

@Component
public class PresencaTreinoMapper {

    public PresencaTreino toEntity(PresencaTreinoRequest request, Atleta atleta, SessaoTreino sessao) {
        return PresencaTreino.builder()
                .atleta(atleta)
                .sessaoTreino(sessao)
                .status(request.status())
                .metodoChamada(request.metodoChamada() != null ? request.metodoChamada() : "MANUAL")
                .build();
    }

    public PresencaTreinoResponse toResponse(PresencaTreino presenca) {
        return new PresencaTreinoResponse(
                presenca.getId(),
                presenca.getAtleta() != null ? presenca.getAtleta().getId() : null,
                presenca.getAtleta() != null ? presenca.getAtleta().getNomeCompleto() : null,
                presenca.getSessaoTreino() != null ? presenca.getSessaoTreino().getId() : null,
                presenca.getSessaoTreino() != null ? presenca.getSessaoTreino().getFocoTreino() : null,
                presenca.getStatus(),
                presenca.getMetodoChamada(),
                presenca.getDataCriacao(),
                presenca.getDataAtualizacao(),
                presenca.getAtivo()
        );
    }
}
