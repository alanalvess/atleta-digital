package com.atletaoficial.atletadigitalbackend.dto.response;

import com.atletaoficial.atletadigitalbackend.enums.StatusPresenca;
import java.time.LocalDateTime;

public record PresencaTreinoResponse(
        Long id,
        Long atletaId,
        String atletaNome,
        Long sessaoTreinoId,
        String focoTreino,
        StatusPresenca status,
        String metodoChamada,
        LocalDateTime dataCriacao,
        LocalDateTime dataAtualizacao,
        Boolean ativo
) {}
