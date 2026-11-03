package com.atletaoficial.atletadigitalbackend.service;

import com.atletaoficial.atletadigitalbackend.dto.request.ControleNegociacaoRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.ControleNegociacaoResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.ControleNegociacao;
import com.atletaoficial.atletadigitalbackend.mapper.ControleNegociacaoMapper;
import com.atletaoficial.atletadigitalbackend.repository.AtletaRepository;
import com.atletaoficial.atletadigitalbackend.repository.ControleNegociacaoRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class ControleNegociacaoService {

    private final ControleNegociacaoRepository negociacaoRepository;
    private final AtletaRepository atletaRepository;
    private final ControleNegociacaoMapper mapper;

    @Transactional
    public ControleNegociacaoResponse registrar(ControleNegociacaoRequest request) {
        Atleta atleta = atletaRepository.findById(request.atletaId())
                .orElseThrow(() -> new IllegalArgumentException("Atleta não encontrado para o ID informado."));

        ControleNegociacao negociacao = mapper.toEntity(request, atleta);
        ControleNegociacao salva = negociacaoRepository.save(negociacao);

        log.info("Registro de Negociação criado com sucesso. Atleta ID: {} - Clube Interessado: {}", atleta.getId(), salva.getClubeInteressado());
        return mapper.toResponse(salva);
    }

    public ControleNegociacaoResponse buscarPorId(Long id) {
        ControleNegociacao negociacao = negociacaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Registro de Negociação não encontrado."));
        return mapper.toResponse(negociacao);
    }

    public List<ControleNegociacaoResponse> listarPorAtleta(Long atletaId) {
        return negociacaoRepository.findAllByAtletaIdOrderByDataCriacaoDesc(atletaId).stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional
    public void atualizarStatus(Long id, String novoStatus) {
        ControleNegociacao negociacao = negociacaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Registro de Negociação não encontrado."));

        negociacao.setStatus(novoStatus);
        negociacaoRepository.save(negociacao);
        log.info("Status da negociação ID {} atualizado para: {}", id, novoStatus);
    }

    @Transactional
    public void inativar(Long id) {
        ControleNegociacao negociacao = negociacaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Registro de Negociação não encontrado."));

        negociacao.setAtivo(false);
        negociacaoRepository.save(negociacao);
        log.info("Registro de negociação inativado com sucesso. ID: {}", id);
    }
}
