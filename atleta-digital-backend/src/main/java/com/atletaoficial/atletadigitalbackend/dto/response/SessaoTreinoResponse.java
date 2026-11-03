package com.atletaoficial.atletadigitalbackend.dto.response;

import com.atletaoficial.atletadigitalbackend.enums.Categoria;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record SessaoTreinoResponse(
        Long id,
        LocalDate dataTreino,
        Categoria categoria,
        String focoTreino,
        String observacoesTreinador,
        Long treinadorId,
        String treinadorNome,
        LocalDateTime dataCriacao,
        LocalDateTime dataAtualizacao,
        Boolean ativo
) {}
