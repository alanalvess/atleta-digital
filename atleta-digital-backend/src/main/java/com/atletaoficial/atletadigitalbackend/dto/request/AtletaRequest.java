package com.atletaoficial.atletadigitalbackend.dto.request;

import com.atletaoficial.atletadigitalbackend.enums.Categoria;
import com.atletaoficial.atletadigitalbackend.enums.PeDominante;
import com.atletaoficial.atletadigitalbackend.enums.Posicao;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.br.CPF;

import java.time.LocalDate;

public record AtletaRequest(
        @NotBlank(message = "O nome completo é obrigatório") String nomeCompleto,
        String nomeEsportivo,
        @NotNull(message = "A data de nascimento é obrigatória") LocalDate dataNascimento,
        @NotBlank(message = "O CPF é obrigatório") @CPF(message = "CPF inválido") String cpf,
        String rg,
        String telefone,
        @Email(message = "O email deve ser válido") String email,
        String endereco,
        String bairro,
        String cep,
        Categoria categoria,
        Posicao posicao,
        PeDominante peDominante,
        Integer numeroCamisa,
        LocalDate dataIngresso,
        String codigoMatricula,
        Long equipeId
) {}
