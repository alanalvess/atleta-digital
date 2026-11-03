package com.atletaoficial.atletadigitalbackend.service;

import com.atletaoficial.atletadigitalbackend.dto.request.PresencaTreinoRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.PresencaTreinoResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.PresencaTreino;
import com.atletaoficial.atletadigitalbackend.entity.SessaoTreino;
import com.atletaoficial.atletadigitalbackend.mapper.PresencaTreinoMapper;
import com.atletaoficial.atletadigitalbackend.repository.AtletaRepository;
import com.atletaoficial.atletadigitalbackend.repository.PresencaTreinoRepository;
import com.atletaoficial.atletadigitalbackend.repository.SessaoTreinoRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class PresencaTreinoService {

    private final PresencaTreinoRepository presencaRepository;
    private final AtletaRepository atletaRepository;
    private final SessaoTreinoRepository sessaoTreinoRepository;
    private final PresencaTreinoMapper mapper;

    @Transactional
    public PresencaTreinoResponse registrar(PresencaTreinoRequest request) {
        Atleta atleta = atletaRepository.findById(request.atletaId())
                .orElseThrow(() -> new IllegalArgumentException("Atleta não encontrado."));

        SessaoTreino sessao = sessaoTreinoRepository.findById(request.sessaoTreinoId())
                .orElseThrow(() -> new IllegalArgumentException("Sessão de treino não encontrada."));

        // Proteção contra chamadas duplicadas (Debounce em nível de BD)[cite: 3, 4]
        Optional<PresencaTreino> existente = presencaRepository.findByAtletaIdAndSessaoTreinoId(atleta.getId(), sessao.getId());

        PresencaTreino presenca;
        if (existente.isPresent()) {
            presenca = existente.get();
            presenca.setStatus(request.status());
            presenca.setMetodoChamada(request.metodoChamada() != null ? request.metodoChamada() : "MANUAL_UPDATE");
            log.info("Atualizando presença existente. Atleta ID: {} - Sessão ID: {}", atleta.getId(), sessao.getId());
        } else {
            presenca = mapper.toEntity(request, atleta, sessao);
            log.info("Registrando nova presença. Atleta ID: {} - Método: {}", atleta.getId(), presenca.getMetodoChamada());
        }

        PresencaTreino salva = presencaRepository.save(presenca);
        return mapper.toResponse(salva);
    }

    public PresencaTreinoResponse buscarPorId(Long id) {
        PresencaTreino presenca = presencaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Registro de presença não encontrado."));
        return mapper.toResponse(presenca);
    }

    public List<PresencaTreinoResponse> listarPorSessao(Long sessaoTreinoId) {
        return presencaRepository.findAllBySessaoTreinoId(sessaoTreinoId).stream()
                .map(mapper::toResponse)
                .toList();
    }

    public List<PresencaTreinoResponse> listarPorAtleta(Long atletaId) {
        return presencaRepository.findAllByAtletaId(atletaId).stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional
    public void inativar(Long id) {
        PresencaTreino presenca = presencaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Registro de presença não encontrado."));

        presenca.setAtivo(false);
        presencaRepository.save(presenca);
        log.info("Registro de presença inativado com sucesso. ID: {}", id);
    }
}
