package com.atletaoficial.atletadigitalbackend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RfidVincularRequest(
        @NotBlank(message = "O UID do cartão é obrigatório") String uid,
        @NotNull(message = "O ID do atleta é obrigatório") Long atletaId
) {}