package com.atletaoficial.atletadigitalbackend.dto.request;

import com.atletaoficial.atletadigitalbackend.enums.Categoria;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record TransicaoCategoriaRequest(
        @NotNull(message = "O ID do atleta é obrigatório") Long atletaId,
        @NotBlank(message = "A temporada é obrigatória") String temporada,
        @NotNull(message = "A categoria atual é obrigatória") Categoria categoriaAtual,
        @NotNull(message = "A nova categoria é obrigatória") Categoria novaCategoria,
        @NotNull(message = "A data da transição é obrigatória") LocalDate dataTransicao,
        String motivoTransicao,
        String status,
        String parecerComissaoAnterior,
        String parecerComissaoNova,
        Boolean aprovadoTreinadorAnterior,
        Boolean aprovadoTreinadorNovo,
        Boolean aprovadoCoordenadorTecnico,
        Long treinadorAnteriorId,
        Long treinadorNovoId,
        Long coordenadorTecnicoId
) {}
