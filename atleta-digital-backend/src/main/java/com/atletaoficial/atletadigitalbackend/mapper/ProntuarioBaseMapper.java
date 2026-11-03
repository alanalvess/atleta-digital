package com.atletaoficial.atletadigitalbackend.mapper;

import com.atletaoficial.atletadigitalbackend.dto.request.ProntuarioBaseRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.ProntuarioBaseResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.ProntuarioBase;
import org.springframework.stereotype.Component;

@Component
public class ProntuarioBaseMapper {

    public ProntuarioBase toEntity(ProntuarioBaseRequest request, Atleta atleta) {
        return ProntuarioBase.builder()
                .atleta(atleta)
                .tipoSanguineo(request.tipoSanguineo())
                .alergias(request.alergias())
                .historicoCirurgias(request.historicoCirurgias())
                .doencasCronicas(request.doencasCronicas())
                .medicamentosUsoContinuo(request.medicamentosUsoContinuo())
                .build();
    }

    public ProntuarioBaseResponse toResponse(ProntuarioBase prontuario) {
        return new ProntuarioBaseResponse(
                prontuario.getId(),
                prontuario.getAtleta() != null ? prontuario.getAtleta().getId() : null,
                prontuario.getAtleta() != null ? prontuario.getAtleta().getNomeCompleto() : null,
                prontuario.getTipoSanguineo(),
                prontuario.getAlergias(),
                prontuario.getHistoricoCirurgias(),
                prontuario.getDoencasCronicas(),
                prontuario.getMedicamentosUsoContinuo(),
                prontuario.getDataCriacao(),
                prontuario.getDataAtualizacao(),
                prontuario.getAtivo()
        );
    }
}
