package com.atletaoficial.atletadigitalbackend.dto.response;

import com.atletaoficial.atletadigitalbackend.enums.Categoria;
import com.atletaoficial.atletadigitalbackend.enums.PeDominante;
import com.atletaoficial.atletadigitalbackend.enums.Posicao;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record AtletaResponse(
        Long id,
        String nomeCompleto,
        String nomeEsportivo,
        LocalDate dataNascimento,
        Integer idade,
        String cpf,
        String rg,
        String telefone,
        String email,
        String endereco,
        String bairro,
        String cep,
        Categoria categoria,
        Posicao posicao,
        PeDominante peDominante,
        Integer numeroCamisa,
        LocalDate dataIngresso,
        String codigoMatricula,
        Long equipeId,
        LocalDateTime dataCriacao,
        LocalDateTime dataAtualizacao,
        Boolean ativo,
        Boolean possuiCartaoAcesso
) {}