package com.atletaoficial.atletadigitalbackend.mapper;

import com.atletaoficial.atletadigitalbackend.dto.request.MovimentacaoFinanceiraRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.MovimentacaoFinanceiraResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.Funcionario;
import com.atletaoficial.atletadigitalbackend.entity.MovimentacaoFinanceira;
import org.springframework.stereotype.Component;

@Component
public class MovimentacaoFinanceiraMapper {

    public MovimentacaoFinanceira toEntity(MovimentacaoFinanceiraRequest request, Atleta atleta, Funcionario responsavel) {
        return MovimentacaoFinanceira.builder()
                .atleta(atleta)
                .descricao(request.descricao())
                .tipo(request.tipo())
                .valor(request.valor())
                .dataVencimento(request.dataVencimento())
                .dataPagamento(request.dataPagamento())
                .responsavelFinanceiro(responsavel)
                .status(request.status())
                .build();
    }

    public MovimentacaoFinanceiraResponse toResponse(MovimentacaoFinanceira movimentacao) {
        return new MovimentacaoFinanceiraResponse(
                movimentacao.getId(),
                movimentacao.getAtleta() != null ? movimentacao.getAtleta().getId() : null,
                movimentacao.getAtleta() != null ? movimentacao.getAtleta().getNomeCompleto() : null,
                movimentacao.getDescricao(),
                movimentacao.getTipo(),
                movimentacao.getValor(),
                movimentacao.getDataVencimento(),
                movimentacao.getDataPagamento(),
                movimentacao.getResponsavelFinanceiro() != null ? movimentacao.getResponsavelFinanceiro().getId() : null,
                movimentacao.getResponsavelFinanceiro() != null ? movimentacao.getResponsavelFinanceiro().getNomeCompleto() : null,
                movimentacao.getStatus(),
                movimentacao.getDataCriacao(),
                movimentacao.getDataAtualizacao(),
                movimentacao.getAtivo()
        );
    }
}
