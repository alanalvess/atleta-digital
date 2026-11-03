package com.atletaoficial.atletadigitalbackend.dto.response;

import com.atletaoficial.atletadigitalbackend.enums.AptidaoFisica;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record ExameAptidaoResponse(
        Long id,
        Long atletaId,
        String atletaNome,
        LocalDate dataExame,
        LocalDate validade,
        Double peso,
        Double altura,
        Double imc,
        Double pressaoArterial,
        AptidaoFisica aptidao,
        LocalDateTime dataCriacao,
        LocalDateTime dataAtualizacao,
        Boolean ativo
) {}
