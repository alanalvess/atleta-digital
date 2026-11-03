package com.atletaoficial.atletadigitalbackend.service;

import com.atletaoficial.atletadigitalbackend.dto.request.AvaliacaoDesempenhoRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.AvaliacaoDesempenhoResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.AvaliacaoDesempenho;
import com.atletaoficial.atletadigitalbackend.entity.Funcionario;
import com.atletaoficial.atletadigitalbackend.mapper.AvaliacaoDesempenhoMapper;
import com.atletaoficial.atletadigitalbackend.repository.AtletaRepository;
import com.atletaoficial.atletadigitalbackend.repository.AvaliacaoDesempenhoRepository;
import com.atletaoficial.atletadigitalbackend.repository.FuncionarioRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class AvaliacaoDesempenhoService {

    private final AvaliacaoDesempenhoRepository avaliacaoRepository;
    private final AtletaRepository atletaRepository;
    private final FuncionarioRepository funcionarioRepository;
    private final AvaliacaoDesempenhoMapper mapper;

    @Transactional
    public AvaliacaoDesempenhoResponse registrar(AvaliacaoDesempenhoRequest request) {
        Atleta atleta = atletaRepository.findById(request.atletaId())
                .orElseThrow(() -> new IllegalArgumentException("Atleta não encontrado para o ID informado."));

        Funcionario avaliador = funcionarioRepository.findById(request.avaliadorId())
                .orElseThrow(() -> new IllegalArgumentException("Avaliador (Membro da comissão técnica) não encontrado."));

        AvaliacaoDesempenho avaliacao = mapper.toEntity(request, atleta, avaliador);
        AvaliacaoDesempenho salvo = avaliacaoRepository.save(avaliacao);

        log.info("Avaliação de desempenho registrada com sucesso. Atleta ID: {} - Avaliador ID: {}", atleta.getId(), avaliador.getId());
        return mapper.toResponse(salvo);
    }

    public AvaliacaoDesempenhoResponse buscarPorId(Long id) {
        AvaliacaoDesempenho avaliacao = avaliacaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Avaliação de desempenho não encontrada."));
        return mapper.toResponse(avaliacao);
    }

    public List<AvaliacaoDesempenhoResponse> listarPorAtleta(Long atletaId) {
        return avaliacaoRepository.findAllByAtletaIdOrderByDataAvaliacaoDesc(atletaId).stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional
    public void inativar(Long id) {
        AvaliacaoDesempenho avaliacao = avaliacaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Avaliação de desempenho não encontrada."));

        avaliacao.setAtivo(false);
        avaliacaoRepository.save(avaliacao);
        log.info("Avaliação de desempenho inativada com sucesso. ID: {}", id);
    }
}
