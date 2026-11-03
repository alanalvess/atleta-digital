package com.atletaoficial.atletadigitalbackend.mapper;

import com.atletaoficial.atletadigitalbackend.dto.request.MatriculaEscolarRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.MatriculaEscolarResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.MatriculaEscolar;
import org.springframework.stereotype.Component;

@Component
public class MatriculaEscolarMapper {

    public MatriculaEscolar toEntity(MatriculaEscolarRequest request, Atleta atleta) {
        return MatriculaEscolar.builder()
                .atleta(atleta)
                .temporada(request.temporada())
                .nomeEscola(request.nomeEscola())
                .redeEnsino(request.redeEnsino())
                .anoSerie(request.anoSerie())
                .turno(request.turno())
                .build();
    }

    public MatriculaEscolarResponse toResponse(MatriculaEscolar matricula) {
        return new MatriculaEscolarResponse(
                matricula.getId(),
                matricula.getAtleta() != null ? matricula.getAtleta().getId() : null,
                matricula.getAtleta() != null ? matricula.getAtleta().getNomeCompleto() : null,
                matricula.getTemporada(),
                matricula.getNomeEscola(),
                matricula.getRedeEnsino(),
                matricula.getAnoSerie(),
                matricula.getTurno(),
                matricula.getDataCriacao(),
                matricula.getDataAtualizacao(),
                matricula.getAtivo()
        );
    }
}
