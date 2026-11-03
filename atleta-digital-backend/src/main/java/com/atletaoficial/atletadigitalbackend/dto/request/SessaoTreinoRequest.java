package com.atletaoficial.atletadigitalbackend.dto.request;

import com.atletaoficial.atletadigitalbackend.enums.Categoria;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record SessaoTreinoRequest(
        @NotNull(message = "A data do treino é obrigatória") LocalDate dataTreino,
        @NotNull(message = "A categoria é obrigatória") Categoria categoria,
        @NotBlank(message = "O foco do treino é obrigatório") String focoTreino,
        String observacoesTreinador,
        @NotNull(message = "O ID do treinador responsável é obrigatório") Long treinadorId
) {}
