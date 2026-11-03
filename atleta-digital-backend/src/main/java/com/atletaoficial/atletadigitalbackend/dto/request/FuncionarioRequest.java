package com.atletaoficial.atletadigitalbackend.dto.request;

import com.atletaoficial.atletadigitalbackend.enums.Cargo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.br.CPF;

import java.time.LocalDate;

public record FuncionarioRequest(
        @NotBlank(message = "O nome completo é obrigatório") String nomeCompleto,
        @NotBlank(message = "O CPF é obrigatório") @CPF(message = "CPF inválido") String cpf,
        String telefone,
        @NotNull(message = "O cargo é obrigatório") Cargo cargo,
        String registroProfissional,
        LocalDate dataContratacao,
        Long usuarioId // Opcional: para vincular o funcionário a um usuário de acesso[cite: 1]
) {}
