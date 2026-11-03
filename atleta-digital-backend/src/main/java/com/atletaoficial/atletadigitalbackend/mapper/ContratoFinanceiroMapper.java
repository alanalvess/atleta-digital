package com.atletaoficial.atletadigitalbackend.mapper;

import com.atletaoficial.atletadigitalbackend.dto.request.ContratoFinanceiroRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.ContratoFinanceiroResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.ContratoFinanceiro;
import org.springframework.stereotype.Component;

@Component
public class ContratoFinanceiroMapper {

    public ContratoFinanceiro toEntity(ContratoFinanceiroRequest request, Atleta atleta) {
        return ContratoFinanceiro.builder()
                .atleta(atleta)
                .tipoVinculo(request.tipoVinculo())
                .valorAcordado(request.valorAcordado())
                .diaVencimento(request.diaVencimento())
                .isento(request.isento())
                .observacoes(request.observacoes())
                .build();
    }

    public ContratoFinanceiroResponse toResponse(ContratoFinanceiro contrato) {
        return new ContratoFinanceiroResponse(
                contrato.getId(),
                contrato.getAtleta() != null ? contrato.getAtleta().getId() : null,
                contrato.getAtleta() != null ? contrato.getAtleta().getNomeCompleto() : null,
                contrato.getTipoVinculo(),
                contrato.getValorAcordado(),
                contrato.getDiaVencimento(),
                contrato.getIsento(),
                contrato.getObservacoes(),
                contrato.getDataCriacao(),
                contrato.getDataAtualizacao(),
                contrato.getAtivo()
        );
    }
}
