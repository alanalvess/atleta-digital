package com.atletaoficial.atletadigitalbackend.service;

import com.atletaoficial.atletadigitalbackend.dto.request.ExameAptidaoRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.ExameAptidaoResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.ExameAptidao;
import com.atletaoficial.atletadigitalbackend.mapper.ExameAptidaoMapper;
import com.atletaoficial.atletadigitalbackend.repository.AtletaRepository;
import com.atletaoficial.atletadigitalbackend.repository.ExameAptidaoRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class ExameAptidaoService {

    private final ExameAptidaoRepository exameRepository;
    private final AtletaRepository atletaRepository;
    private final ExameAptidaoMapper mapper;

    @Transactional
    public ExameAptidaoResponse registrar(ExameAptidaoRequest request) {
        Atleta atleta = atletaRepository.findById(request.atletaId())
                .orElseThrow(() -> new IllegalArgumentException("Atleta não encontrado para o ID informado."));

        ExameAptidao exame = mapper.toEntity(request, atleta);
        ExameAptidao salvo = exameRepository.save(exame);

        log.info("Exame de aptidão física registrado com sucesso para o atleta ID: {}", atleta.getId());
        return mapper.toResponse(salvo);
    }

    public ExameAptidaoResponse buscarPorId(Long id) {
        ExameAptidao exame = exameRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Exame de aptidão não encontrado."));
        return mapper.toResponse(exame);
    }

    public List<ExameAptidaoResponse> listarPorAtleta(Long atletaId) {
        return exameRepository.findAllByAtletaIdOrderByDataExameDesc(atletaId).stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional
    public void inativar(Long id) {
        ExameAptidao exame = exameRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Exame de aptidão não encontrado."));

        exame.setAtivo(false);
        exameRepository.save(exame);
        log.info("Exame de aptidão inativado com sucesso. ID: {}", id);
    }
}
