package com.atletaoficial.atletadigitalbackend.dto.response;

import com.atletaoficial.atletadigitalbackend.enums.Categoria;
import java.time.LocalDateTime;
import java.util.List;

public record EquipeResponse(
        Long id,
        String temporada,
        Categoria categoria,
        Long treinadorId,
        String treinadorNome,
        Long preparadorFisicoId,
        String preparadorFisicoNome,
        List<Long> atletaIds,
        LocalDateTime dataCriacao,
        LocalDateTime dataAtualizacao,
        Boolean ativo
) {}
