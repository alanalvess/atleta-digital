package com.atletaoficial.atletadigitalbackend.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record AvaliacaoDesempenhoResponse(
        Long id,
        Long atletaId,
        String atletaNome,
        Long avaliadorId,
        String avaliadorNome,
        String temporada,
        LocalDate dataAvaliacao,
        Integer notaPasse,
        Integer notaFinalizacao,
        Integer notaDrible,
        Integer notaMarcacao,
        Double mediaGeral,
        String pontosFortes,
        String pontosADesenvolver,
        LocalDateTime dataCriacao,
        LocalDateTime dataAtualizacao,
        Boolean ativo
) {}
