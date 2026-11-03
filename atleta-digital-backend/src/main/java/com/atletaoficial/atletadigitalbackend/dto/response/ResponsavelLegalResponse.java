package com.atletaoficial.atletadigitalbackend.dto.response;

import java.time.LocalDateTime;

public record ResponsavelLegalResponse(
        Long id,
        Long atletaId,
        String atletaNome,
        String nome,
        String parentesco,
        String cpf,
        String telefone,
        String email,
        LocalDateTime dataCriacao,
        LocalDateTime dataAtualizacao,
        Boolean ativo
) {}
