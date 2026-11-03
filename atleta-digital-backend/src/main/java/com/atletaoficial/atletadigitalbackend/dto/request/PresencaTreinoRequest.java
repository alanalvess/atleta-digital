package com.atletaoficial.atletadigitalbackend.dto.request;

import com.atletaoficial.atletadigitalbackend.enums.StatusPresenca;
import jakarta.validation.constraints.NotNull;

public record PresencaTreinoRequest(
        @NotNull(message = "O ID do atleta é obrigatório") Long atletaId,
        @NotNull(message = "O ID da sessão de treino é obrigatório") Long sessaoTreinoId,
        @NotNull(message = "O status da presença é obrigatório") StatusPresenca status,
        String metodoChamada // Ex: "MANUAL", "RFID", "QR_CODE"[cite: 4]
) {}
