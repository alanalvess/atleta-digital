package com.atletaoficial.atletadigitalbackend.dto.response;

import java.time.LocalDateTime;

public record PerfilSocialFamiliarResponse(
        Long id,
        Long atletaId,
        String atletaNome,
        Integer moradoresResidencia,
        String responsavelRenda,
        String faixaSalarial,
        String tipoMoradia,
        String meioTransporteTreino,
        Integer tempoDeslocamentoMinutos,
        Boolean dificuldadeAlimentacao,
        String necessidadesApoio,
        LocalDateTime dataCriacao,
        LocalDateTime dataAtualizacao,
        Boolean ativo
) {}
