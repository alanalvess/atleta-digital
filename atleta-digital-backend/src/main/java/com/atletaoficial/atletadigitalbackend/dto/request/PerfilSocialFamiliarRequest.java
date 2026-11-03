package com.atletaoficial.atletadigitalbackend.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;

public record PerfilSocialFamiliarRequest(
        @NotNull(message = "O ID do atleta é obrigatório") Long atletaId,
        @Min(value = 1, message = "Deve haver pelo menos 1 morador") Integer moradoresResidencia,
        String responsavelRenda,
        String faixaSalarial,
        String tipoMoradia,
        String meioTransporteTreino,
        Integer tempoDeslocamentoMinutos,
        @NotNull(message = "A informação sobre dificuldade de alimentação é obrigatória") Boolean dificuldadeAlimentacao,
        String necessidadesApoio
) {}
