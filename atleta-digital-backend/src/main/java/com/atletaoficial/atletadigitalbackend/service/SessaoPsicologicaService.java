package com.atletaoficial.atletadigitalbackend.service;

import com.atletaoficial.atletadigitalbackend.dto.request.SessaoPsicologicaRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.SessaoPsicologicaResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.Funcionario;
import com.atletaoficial.atletadigitalbackend.entity.SessaoPsicologica;
import com.atletaoficial.atletadigitalbackend.mapper.SessaoPsicologicaMapper;
import com.atletaoficial.atletadigitalbackend.repository.AtletaRepository;
import com.atletaoficial.atletadigitalbackend.repository.FuncionarioRepository;
import com.atletaoficial.atletadigitalbackend.repository.SessaoPsicologicaRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class SessaoPsicologicaService {

    private final SessaoPsicologicaRepository sessaoRepository;
    private final AtletaRepository atletaRepository;
    private final FuncionarioRepository funcionarioRepository;
    private final SessaoPsicologicaMapper mapper;

    @Transactional
    public SessaoPsicologicaResponse registrar(SessaoPsicologicaRequest request) {
        Atleta atleta = atletaRepository.findById(request.atletaId())
                .orElseThrow(() -> new IllegalArgumentException("Atleta não encontrado."));

        Funcionario psicologo = funcionarioRepository.findById(request.psicologoId())
                .orElseThrow(() -> new IllegalArgumentException("Psicólogo (membro da comissão) não encontrado."));

        SessaoPsicologica sessao = mapper.toEntity(request, atleta, psicologo);
        SessaoPsicologica salva = sessaoRepository.save(sessao);

        log.info("Sessão psicológica registrada com sucesso. Atleta ID: {} - Psicólogo ID: {}", atleta.getId(), psicologo.getId());
        return mapper.toResponse(salva);
    }

    public SessaoPsicologicaResponse buscarPorId(Long id) {
        SessaoPsicologica sessao = sessaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Sessão psicológica não encontrada."));
        return mapper.toResponse(sessao);
    }

    public List<SessaoPsicologicaResponse> listarPorAtleta(Long atletaId) {
        return sessaoRepository.findAllByAtletaIdOrderByDataSessaoDesc(atletaId).stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional
    public void inativar(Long id) {
        SessaoPsicologica sessao = sessaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Sessão psicológica não encontrada."));

        sessao.setAtivo(false);
        sessaoRepository.save(sessao);
        log.info("Sessão psicológica inativada com sucesso. ID: {}", id);
    }
}
