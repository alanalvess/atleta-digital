package com.atletaoficial.atletadigitalbackend.dto.response;

import java.time.LocalDateTime;

public record AcompanhamentoBimestralResponse(
        Long id,
        Long matriculaId,
        String nomeEscola,
        Integer bimestre,
        Double mediaNotas,
        Double frequenciaEscolar,
        Boolean dificuldadeReportada,
        String ocorrencias,
        LocalDateTime dataCriacao,
        LocalDateTime dataAtualizacao,
        Boolean ativo
) {}
