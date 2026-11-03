package com.atletaoficial.atletadigitalbackend.service;

import com.atletaoficial.atletadigitalbackend.dto.request.ContratoFinanceiroRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.ContratoFinanceiroResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.ContratoFinanceiro;
import com.atletaoficial.atletadigitalbackend.mapper.ContratoFinanceiroMapper;
import com.atletaoficial.atletadigitalbackend.repository.AtletaRepository;
import com.atletaoficial.atletadigitalbackend.repository.ContratoFinanceiroRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@AllArgsConstructor
public class ContratoFinanceiroService {

    private final ContratoFinanceiroRepository contratoRepository;
    private final AtletaRepository atletaRepository;
    private final ContratoFinanceiroMapper mapper;

    @Transactional
    public ContratoFinanceiroResponse cadastrar(ContratoFinanceiroRequest request) {
        if (contratoRepository.findByAtletaId(request.atletaId()).isPresent()) {
            log.warn("Tentativa de cadastrar contrato para atleta ID: {} que já possui um vínculo.", request.atletaId());
            throw new IllegalArgumentException("Este atleta já possui um Contrato Financeiro ativo cadastrado.");
        }

        Atleta atleta = atletaRepository.findById(request.atletaId())
                .orElseThrow(() -> new IllegalArgumentException("Atleta não encontrado para o ID informado."));

        ContratoFinanceiro contrato = mapper.toEntity(request, atleta);
        ContratoFinanceiro salvo = contratoRepository.save(contrato);

        log.info("Contrato Financeiro registrado com sucesso para o atleta ID: {}", atleta.getId());
        return mapper.toResponse(salvo);
    }

    public ContratoFinanceiroResponse buscarPorId(Long id) {
        ContratoFinanceiro contrato = contratoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Contrato Financeiro não encontrado."));
        return mapper.toResponse(contrato);
    }

    public ContratoFinanceiroResponse buscarPorAtleta(Long atletaId) {
        ContratoFinanceiro contrato = contratoRepository.findByAtletaId(atletaId)
                .orElseThrow(() -> new IllegalArgumentException("Contrato Financeiro não encontrado para este atleta."));
        return mapper.toResponse(contrato);
    }

    @Transactional
    public void inativar(Long id) {
        ContratoFinanceiro contrato = contratoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Contrato Financeiro não encontrado."));

        contrato.setAtivo(false); // Exclusão Lógica[cite: 2]
        contratoRepository.save(contrato);
        log.info("Contrato Financeiro inativado com sucesso. ID: {}", id);
    }
}