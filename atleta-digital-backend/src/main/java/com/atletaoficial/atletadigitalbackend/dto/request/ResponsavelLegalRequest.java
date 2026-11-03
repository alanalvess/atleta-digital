package com.atletaoficial.atletadigitalbackend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.br.CPF;

public record ResponsavelLegalRequest(
        @NotNull(message = "O ID do atleta é obrigatório") Long atletaId,
        @NotBlank(message = "O nome é obrigatório") String nome,
        @NotBlank(message = "O parentesco é obrigatório") String parentesco,
        @NotBlank(message = "O CPF é obrigatório") @CPF(message = "CPF inválido") String cpf,
        String telefone,
        @Email(message = "O email deve ser válido") String email
) {}
