package com.atletaoficial.atletadigitalbackend.mapper;

import com.atletaoficial.atletadigitalbackend.dto.request.AvaliacaoDesempenhoRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.AvaliacaoDesempenhoResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.AvaliacaoDesempenho;
import com.atletaoficial.atletadigitalbackend.entity.Funcionario;
import org.springframework.stereotype.Component;

@Component
public class AvaliacaoDesempenhoMapper {

    public AvaliacaoDesempenho toEntity(AvaliacaoDesempenhoRequest request, Atleta atleta, Funcionario avaliador) {
        AvaliacaoDesempenho avaliacao = AvaliacaoDesempenho.builder()
                .atleta(atleta)
                .avaliador(avaliador)
                .temporada(request.temporada())
                .dataAvaliacao(request.dataAvaliacao())
                .notaPasse(request.notaPasse())
                .notaFinalizacao(request.notaFinalizacao())
                .notaDrible(request.notaDrible())
                .notaMarcacao(request.notaMarcacao())
                .pontosFortes(request.pontosFortes())
                .pontosADesenvolver(request.pontosADesenvolver())
                .build();

        avaliacao.calcularMediaGeral(); // Aciona o cálculo automático antes de salvar[cite: 5]
        return avaliacao;
    }

    public AvaliacaoDesempenhoResponse toResponse(AvaliacaoDesempenho avaliacao) {
        return new AvaliacaoDesempenhoResponse(
                avaliacao.getId(),
                avaliacao.getAtleta() != null ? avaliacao.getAtleta().getId() : null,
                avaliacao.getAtleta() != null ? avaliacao.getAtleta().getNomeCompleto() : null,
                avaliacao.getAvaliador() != null ? avaliacao.getAvaliador().getId() : null,
                avaliacao.getAvaliador() != null ? avaliacao.getAvaliador().getNomeCompleto() : null,
                avaliacao.getTemporada(),
                avaliacao.getDataAvaliacao(),
                avaliacao.getNotaPasse(),
                avaliacao.getNotaFinalizacao(),
                avaliacao.getNotaDrible(),
                avaliacao.getNotaMarcacao(),
                avaliacao.getMediaGeral(),
                avaliacao.getPontosFortes(),
                avaliacao.getPontosADesenvolver(),
                avaliacao.getDataCriacao(),
                avaliacao.getDataAtualizacao(),
                avaliacao.getAtivo()
        );
    }
}
