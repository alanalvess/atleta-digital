package com.atletaoficial.atletadigitalbackend.service;

import com.atletaoficial.atletadigitalbackend.dto.request.AcompanhamentoBimestralRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.AcompanhamentoBimestralResponse;
import com.atletaoficial.atletadigitalbackend.entity.AcompanhamentoBimestral;
import com.atletaoficial.atletadigitalbackend.entity.MatriculaEscolar;
import com.atletaoficial.atletadigitalbackend.mapper.AcompanhamentoBimestralMapper;
import com.atletaoficial.atletadigitalbackend.repository.AcompanhamentoBimestralRepository;
import com.atletaoficial.atletadigitalbackend.repository.MatriculaEscolarRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class AcompanhamentoBimestralService {

    private final AcompanhamentoBimestralRepository acompanhamentoRepository;
    private final MatriculaEscolarRepository matriculaRepository;
    private final AcompanhamentoBimestralMapper mapper;

    @Transactional
    public AcompanhamentoBimestralResponse registrar(AcompanhamentoBimestralRequest request) {
        MatriculaEscolar matricula = matriculaRepository.findById(request.matriculaId())
                .orElseThrow(() -> new IllegalArgumentException("Matrícula Escolar não encontrada para o ID informado."));

        AcompanhamentoBimestral acompanhamento = mapper.toEntity(request, matricula);
        AcompanhamentoBimestral salvo = acompanhamentoRepository.save(acompanhamento);

        log.info("Acompanhamento bimestral (Bimestre: {}) registrado com sucesso para a matrícula ID: {}", salvo.getBimestre(), matricula.getId());
        return mapper.toResponse(salvo);
    }

    public AcompanhamentoBimestralResponse buscarPorId(Long id) {
        AcompanhamentoBimestral acompanhamento = acompanhamentoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Acompanhamento bimestral não encontrado."));
        return mapper.toResponse(acompanhamento);
    }

    public List<AcompanhamentoBimestralResponse> listarPorMatricula(Long matriculaId) {
        return acompanhamentoRepository.findAllByMatriculaIdOrderByBimestreAsc(matriculaId).stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional
    public void inativar(Long id) {
        AcompanhamentoBimestral acompanhamento = acompanhamentoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Acompanhamento bimestral não encontrado."));

        acompanhamento.setAtivo(false);
        acompanhamentoRepository.save(acompanhamento);
        log.info("Acompanhamento bimestral inativado com sucesso. ID: {}", id);
    }
}
