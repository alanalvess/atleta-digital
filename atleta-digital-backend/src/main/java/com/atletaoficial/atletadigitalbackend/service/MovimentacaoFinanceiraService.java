package com.atletaoficial.atletadigitalbackend.service;

import com.atletaoficial.atletadigitalbackend.dto.request.MovimentacaoFinanceiraRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.MovimentacaoFinanceiraResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.Funcionario;
import com.atletaoficial.atletadigitalbackend.entity.MovimentacaoFinanceira;
import com.atletaoficial.atletadigitalbackend.mapper.MovimentacaoFinanceiraMapper;
import com.atletaoficial.atletadigitalbackend.repository.AtletaRepository;
import com.atletaoficial.atletadigitalbackend.repository.FuncionarioRepository;
import com.atletaoficial.atletadigitalbackend.repository.MovimentacaoFinanceiraRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class MovimentacaoFinanceiraService {

    private final MovimentacaoFinanceiraRepository movimentacaoRepository;
    private final AtletaRepository atletaRepository;
    private final FuncionarioRepository funcionarioRepository;
    private final MovimentacaoFinanceiraMapper mapper;

    @Transactional
    public MovimentacaoFinanceiraResponse registrar(MovimentacaoFinanceiraRequest request) {
        Atleta atleta = atletaRepository.findById(request.atletaId())
                .orElseThrow(() -> new IllegalArgumentException("Atleta não encontrado."));

        Funcionario responsavel = null;
        if (request.responsavelFinanceiroId() != null) {
            responsavel = funcionarioRepository.findById(request.responsavelFinanceiroId())
                    .orElseThrow(() -> new IllegalArgumentException("Responsável financeiro não encontrado."));
        }

        MovimentacaoFinanceira movimentacao = mapper.toEntity(request, atleta, responsavel);
        MovimentacaoFinanceira salva = movimentacaoRepository.save(movimentacao);

        log.info("Movimentação financeira registrada. ID: {} - Tipo: {} - Valor: {}", salva.getId(), salva.getTipo(), salva.getValor());
        return mapper.toResponse(salva);
    }

    public MovimentacaoFinanceiraResponse buscarPorId(Long id) {
        MovimentacaoFinanceira movimentacao = movimentacaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Movimentação financeira não encontrada."));
        return mapper.toResponse(movimentacao);
    }

    public List<MovimentacaoFinanceiraResponse> listarPorAtleta(Long atletaId) {
        return movimentacaoRepository.findAllByAtletaIdOrderByDataVencimentoDesc(atletaId).stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional
    public void inativar(Long id) {
        MovimentacaoFinanceira movimentacao = movimentacaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Movimentação financeira não encontrada."));

        movimentacao.setAtivo(false);
        movimentacaoRepository.save(movimentacao);
        log.info("Movimentação financeira inativada com sucesso. ID: {}", id);
    }
}
