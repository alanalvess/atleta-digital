package com.atletaoficial.atletadigitalbackend.mapper;

import com.atletaoficial.atletadigitalbackend.dto.request.ExameAptidaoRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.ExameAptidaoResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.ExameAptidao;
import org.springframework.stereotype.Component;

@Component
public class ExameAptidaoMapper {

    public ExameAptidao toEntity(ExameAptidaoRequest request, Atleta atleta) {
        return ExameAptidao.builder()
                .atleta(atleta)
                .dataExame(request.dataExame())
                .validade(request.validade())
                .peso(request.peso())
                .altura(request.altura())
                .imc(request.imc())
                .pressaoArterial(request.pressaoArterial())
                .aptidao(request.aptidao())
                .build();
    }

    public ExameAptidaoResponse toResponse(ExameAptidao exame) {
        return new ExameAptidaoResponse(
                exame.getId(),
                exame.getAtleta() != null ? exame.getAtleta().getId() : null,
                exame.getAtleta() != null ? exame.getAtleta().getNomeCompleto() : null,
                exame.getDataExame(),
                exame.getValidade(),
                exame.getPeso(),
                exame.getAltura(),
                exame.getImc(),
                exame.getPressaoArterial(),
                exame.getAptidao(),
                exame.getDataCriacao(),
                exame.getDataAtualizacao(),
                exame.getAtivo()
        );
    }
}
