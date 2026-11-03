package com.atletaoficial.atletadigitalbackend.dto.response;

public record AcessoAtletaResponse(
        Long atletaId,
        String nomeAtleta,
        String fotoUrl,
        Boolean liberado,
        String mensagem
) {}
