package com.atletaoficial.atletadigitalbackend.mapper;

import com.atletaoficial.atletadigitalbackend.dto.request.AcompanhamentoBimestralRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.AcompanhamentoBimestralResponse;
import com.atletaoficial.atletadigitalbackend.entity.AcompanhamentoBimestral;
import com.atletaoficial.atletadigitalbackend.entity.MatriculaEscolar;
import org.springframework.stereotype.Component;

@Component
public class AcompanhamentoBimestralMapper {

    public AcompanhamentoBimestral toEntity(AcompanhamentoBimestralRequest request, MatriculaEscolar matricula) {
        return AcompanhamentoBimestral.builder()
                .matricula(matricula)
                .bimestre(request.bimestre())
                .mediaNotas(request.mediaNotas())
                .frequenciaEscolar(request.frequenciaEscolar())
                .dificuldadeReportada(request.dificuldadeReportada() != null ? request.dificuldadeReportada() : false)
                .ocorrencias(request.ocorrencias())
                .build();
    }

    public AcompanhamentoBimestralResponse toResponse(AcompanhamentoBimestral acompanhamento) {
        return new AcompanhamentoBimestralResponse(
                acompanhamento.getId(),
                acompanhamento.getMatricula() != null ? acompanhamento.getMatricula().getId() : null,
                acompanhamento.getMatricula() != null ? acompanhamento.getMatricula().getNomeEscola() : null,
                acompanhamento.getBimestre(),
                acompanhamento.getMediaNotas(),
                acompanhamento.getFrequenciaEscolar(),
                acompanhamento.getDificuldadeReportada(),
                acompanhamento.getOcorrencias(),
                acompanhamento.getDataCriacao(),
                acompanhamento.getDataAtualizacao(),
                acompanhamento.getAtivo()
        );
    }
}
