package com.atletaoficial.atletadigitalbackend.dto.response;

import com.atletaoficial.atletadigitalbackend.enums.Categoria;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record TransicaoCategoriaResponse(
        Long id,
        Long atletaId,
        String atletaNome,
        String temporada,
        Categoria categoriaAtual,
        Categoria novaCategoria,
        LocalDate dataTransicao,
        String motivoTransicao,
        String status,
        String parecerComissaoAnterior,
        String parecerComissaoNova,
        Long treinadorAnteriorId,
        String treinadorAnteriorNome,
        Long treinadorNovoId,
        String treinadorNovoNome,
        Long coordenadorTecnicoId,
        String coordenadorTecnicoNome,
        LocalDateTime dataCriacao,
        LocalDateTime dataAtualizacao,
        Boolean ativo
) {}
