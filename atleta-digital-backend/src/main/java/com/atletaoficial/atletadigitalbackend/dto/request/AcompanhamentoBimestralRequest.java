package com.atletaoficial.atletadigitalbackend.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

public record AcompanhamentoBimestralRequest(
        @NotNull(message = "O ID da matrícula escolar é obrigatório") Long matriculaId,
        @NotNull(message = "O bimestre é obrigatório")
        @Min(value = 1, message = "O bimestre deve ser no mínimo 1")
        @Max(value = 4, message = "O bimestre deve ser no máximo 4") Integer bimestre,
        Double mediaNotas,
        Double frequenciaEscolar,
        Boolean dificuldadeReportada,
        String ocorrencias
) {}
