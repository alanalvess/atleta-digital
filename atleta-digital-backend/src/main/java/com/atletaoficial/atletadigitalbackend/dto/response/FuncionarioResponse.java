package com.atletaoficial.atletadigitalbackend.dto.response;

import com.atletaoficial.atletadigitalbackend.enums.Cargo;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record FuncionarioResponse(
        Long id,
        String nomeCompleto,
        String cpf,
        String telefone,
        Cargo cargo,
        String registroProfissional,
        LocalDate dataContratacao,
        Long usuarioId,
        String usuarioEmail,
        LocalDateTime dataCriacao,
        LocalDateTime dataAtualizacao,
        Boolean ativo
) {}
