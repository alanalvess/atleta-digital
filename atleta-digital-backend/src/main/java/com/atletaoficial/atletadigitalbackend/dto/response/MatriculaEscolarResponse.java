package com.atletaoficial.atletadigitalbackend.dto.response;

import com.atletaoficial.atletadigitalbackend.enums.TurnoEscolar;
import java.time.LocalDateTime;

public record MatriculaEscolarResponse(
        Long id,
        Long atletaId,
        String atletaNome,
        String temporada,
        String nomeEscola,
        String redeEnsino,
        String anoSerie,
        TurnoEscolar turno,
        LocalDateTime dataCriacao,
        LocalDateTime dataAtualizacao,
        Boolean ativo
) {}
