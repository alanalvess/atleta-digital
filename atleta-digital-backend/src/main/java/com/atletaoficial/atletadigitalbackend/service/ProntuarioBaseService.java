package com.atletaoficial.atletadigitalbackend.service;

import com.atletaoficial.atletadigitalbackend.dto.request.ProntuarioBaseRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.ProntuarioBaseResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.ProntuarioBase;
import com.atletaoficial.atletadigitalbackend.mapper.ProntuarioBaseMapper;
import com.atletaoficial.atletadigitalbackend.repository.AtletaRepository;
import com.atletaoficial.atletadigitalbackend.repository.ProntuarioBaseRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@AllArgsConstructor
public class ProntuarioBaseService {

    private final ProntuarioBaseRepository prontuarioRepository;
    private final AtletaRepository atletaRepository;
    private final ProntuarioBaseMapper mapper;

    @Transactional
    public ProntuarioBaseResponse cadastrar(ProntuarioBaseRequest request) {
        // Bloqueia a inserção se o atleta já possuir um prontuário cadastrado
        if (prontuarioRepository.findByAtletaId(request.atletaId()).isPresent()) {
            log.warn("Tentativa de cadastrar prontuário para o atleta ID: {} que já possui um.", request.atletaId());
            throw new IllegalArgumentException("Este atleta já possui um Prontuário Base cadastrado.");
        }

        Atleta atleta = atletaRepository.findById(request.atletaId())
                .orElseThrow(() -> new IllegalArgumentException("Atleta não encontrado para o ID informado."));

        ProntuarioBase prontuario = mapper.toEntity(request, atleta);
        ProntuarioBase salvo = prontuarioRepository.save(prontuario);

        log.info("Prontuário Base registrado com sucesso para o atleta ID: {}", atleta.getId());
        return mapper.toResponse(salvo);
    }

    public ProntuarioBaseResponse buscarPorId(Long id) {
        ProntuarioBase prontuario = prontuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Prontuário Base não encontrado."));
        return mapper.toResponse(prontuario);
    }

    public ProntuarioBaseResponse buscarPorAtleta(Long atletaId) {
        ProntuarioBase prontuario = prontuarioRepository.findByAtletaId(atletaId)
                .orElseThrow(() -> new IllegalArgumentException("Prontuário Base não encontrado para este atleta."));
        return mapper.toResponse(prontuario);
    }

    @Transactional
    public void inativar(Long id) {
        ProntuarioBase prontuario = prontuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Prontuário Base não encontrado."));

        prontuario.setAtivo(false); // Exclusão lógica
        prontuarioRepository.save(prontuario);
        log.info("Prontuário Base inativado com sucesso. ID: {}", id);
    }
}
