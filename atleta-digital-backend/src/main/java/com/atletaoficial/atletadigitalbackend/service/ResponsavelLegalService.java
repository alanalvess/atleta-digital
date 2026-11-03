package com.atletaoficial.atletadigitalbackend.service;

import com.atletaoficial.atletadigitalbackend.dto.request.ResponsavelLegalRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.ResponsavelLegalResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.ResponsavelLegal;
import com.atletaoficial.atletadigitalbackend.mapper.ResponsavelLegalMapper;
import com.atletaoficial.atletadigitalbackend.repository.AtletaRepository;
import com.atletaoficial.atletadigitalbackend.repository.ResponsavelLegalRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@AllArgsConstructor
public class ResponsavelLegalService {

    private final ResponsavelLegalRepository responsavelRepository;
    private final AtletaRepository atletaRepository;
    private final ResponsavelLegalMapper mapper;

    @Transactional
    public ResponsavelLegalResponse cadastrar(ResponsavelLegalRequest request) {
        // Bloqueia a inserção se o atleta já possuir um responsável atrelado[cite: 5]
        if (responsavelRepository.findByAtletaId(request.atletaId()).isPresent()) {
            log.warn("Tentativa de cadastrar responsável para atleta ID: {} que já possui um.", request.atletaId());
            throw new IllegalArgumentException("Este atleta já possui um Responsável Legal cadastrado.");
        }

        Atleta atleta = atletaRepository.findById(request.atletaId())
                .orElseThrow(() -> new IllegalArgumentException("Atleta não encontrado para o ID informado."));

        ResponsavelLegal responsavel = mapper.toEntity(request, atleta);
        ResponsavelLegal salvo = responsavelRepository.save(responsavel);

        log.info("Responsável Legal registrado com sucesso para o atleta ID: {}", atleta.getId());
        return mapper.toResponse(salvo);
    }

    public ResponsavelLegalResponse buscarPorId(Long id) {
        ResponsavelLegal responsavel = responsavelRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Responsável Legal não encontrado."));
        return mapper.toResponse(responsavel);
    }

    public ResponsavelLegalResponse buscarPorAtleta(Long atletaId) {
        ResponsavelLegal responsavel = responsavelRepository.findByAtletaId(atletaId)
                .orElseThrow(() -> new IllegalArgumentException("Responsável Legal não encontrado para este atleta."));
        return mapper.toResponse(responsavel);
    }

    @Transactional
    public void inativar(Long id) {
        ResponsavelLegal responsavel = responsavelRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Responsável Legal não encontrado."));

        responsavel.setAtivo(false); // Mantém o histórico sem deletar fisicamente do banco
        responsavelRepository.save(responsavel);
        log.info("Responsável Legal inativado com sucesso. ID: {}", id);
    }
}
