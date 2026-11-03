package com.atletaoficial.atletadigitalbackend.service;

import com.atletaoficial.atletadigitalbackend.dto.request.MatriculaEscolarRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.MatriculaEscolarResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.MatriculaEscolar;
import com.atletaoficial.atletadigitalbackend.mapper.MatriculaEscolarMapper;
import com.atletaoficial.atletadigitalbackend.repository.AtletaRepository;
import com.atletaoficial.atletadigitalbackend.repository.MatriculaEscolarRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class MatriculaEscolarService {

    private final MatriculaEscolarRepository matriculaRepository;
    private final AtletaRepository atletaRepository;
    private final MatriculaEscolarMapper mapper;

    @Transactional
    public MatriculaEscolarResponse cadastrar(MatriculaEscolarRequest request) {
        Atleta atleta = atletaRepository.findById(request.atletaId())
                .orElseThrow(() -> new IllegalArgumentException("Atleta não encontrado para o ID informado."));

        MatriculaEscolar matricula = mapper.toEntity(request, atleta);
        MatriculaEscolar salva = matriculaRepository.save(matricula);

        log.info("Matrícula escolar registrada com sucesso para o atleta ID: {}", atleta.getId());
        return mapper.toResponse(salva);
    }

    public MatriculaEscolarResponse buscarPorId(Long id) {
        MatriculaEscolar matricula = matriculaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Matrícula escolar não encontrada."));
        return mapper.toResponse(matricula);
    }

    public List<MatriculaEscolarResponse> listarPorAtleta(Long atletaId) {
        return matriculaRepository.findAllByAtletaId(atletaId).stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional
    public void inativar(Long id) {
        MatriculaEscolar matricula = matriculaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Matrícula escolar não encontrada."));

        matricula.setAtivo(false);
        matriculaRepository.save(matricula);
        log.info("Matrícula escolar inativada com sucesso. ID: {}", id);
    }
}
