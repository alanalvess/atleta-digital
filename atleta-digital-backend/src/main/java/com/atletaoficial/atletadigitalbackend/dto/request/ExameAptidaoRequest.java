package com.atletaoficial.atletadigitalbackend.dto.request;

import com.atletaoficial.atletadigitalbackend.enums.AptidaoFisica;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record ExameAptidaoRequest(
        @NotNull(message = "O ID do atleta é obrigatório") Long atletaId,
        @NotNull(message = "A data do exame é obrigatória") LocalDate dataExame,
        LocalDate validade,
        Double peso,
        Double altura,
        Double imc,
        Double pressaoArterial,
        @NotNull(message = "A aptidão física é obrigatória") AptidaoFisica aptidao
) {}
