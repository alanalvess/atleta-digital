package com.atletaoficial.atletadigitalbackend.mapper;

import com.atletaoficial.atletadigitalbackend.dto.request.AtendimentoMedicoRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.AtendimentoMedicoResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.AtendimentoMedico;
import com.atletaoficial.atletadigitalbackend.entity.Funcionario;
import org.springframework.stereotype.Component;

@Component
public class AtendimentoMedicoMapper {

    public AtendimentoMedico toEntity(AtendimentoMedicoRequest request, Atleta atleta, Funcionario profissional) {
        return AtendimentoMedico.builder()
                .atleta(atleta)
                .dataAtendimento(request.dataAtendimento())
                .queixaLesao(request.queixaLesao())
                .conduta(request.conduta())
                .diasAfastamento(request.diasAfastamento())
                .liberadoParaTreino(request.liberadoParaTreino())
                .profissionalSaude(profissional)
                .build();
    }

    public AtendimentoMedicoResponse toResponse(AtendimentoMedico atendimento) {
        return new AtendimentoMedicoResponse(
                atendimento.getId(),
                atendimento.getAtleta() != null ? atendimento.getAtleta().getId() : null,
                atendimento.getAtleta() != null ? atendimento.getAtleta().getNomeCompleto() : null,
                atendimento.getDataAtendimento(),
                atendimento.getQueixaLesao(),
                atendimento.getConduta(),
                atendimento.getDiasAfastamento(),
                atendimento.getLiberadoParaTreino(),
                atendimento.getProfissionalSaude() != null ? atendimento.getProfissionalSaude().getId() : null,
                atendimento.getProfissionalSaude() != null ? atendimento.getProfissionalSaude().getNomeCompleto() : null,
                atendimento.getDataCriacao(),
                atendimento.getDataAtualizacao(),
                atendimento.getAtivo()
        );
    }
}
