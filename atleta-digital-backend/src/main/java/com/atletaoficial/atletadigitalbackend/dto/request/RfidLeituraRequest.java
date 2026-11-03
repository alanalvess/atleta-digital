package com.atletaoficial.atletadigitalbackend.dto.request;

import jakarta.validation.constraints.NotBlank;

public record RfidLeituraRequest(
        @NotBlank(message = "O UID lido não pode ser vazio") String uid,
        String deviceId
) {}
