package com.atletaoficial.atletadigitalbackend.service;

import com.atletaoficial.atletadigitalbackend.dto.request.TransicaoCategoriaRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.TransicaoCategoriaResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.Funcionario;
import com.atletaoficial.atletadigitalbackend.entity.TransicaoCategoria;
import com.atletaoficial.atletadigitalbackend.mapper.TransicaoCategoriaMapper;
import com.atletaoficial.atletadigitalbackend.repository.AtletaRepository;
import com.atletaoficial.atletadigitalbackend.repository.FuncionarioRepository;
import com.atletaoficial.atletadigitalbackend.repository.TransicaoCategoriaRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class TransicaoCategoriaService {

    private final TransicaoCategoriaRepository transicaoRepository;
    private final AtletaRepository atletaRepository;
    private final FuncionarioRepository funcionarioRepository;
    private final TransicaoCategoriaMapper mapper;

    @Transactional
    public TransicaoCategoriaResponse registrar(TransicaoCategoriaRequest request) {
        Atleta atleta = atletaRepository.findById(request.atletaId())
                .orElseThrow(() -> new IllegalArgumentException("Atleta não encontrado."));

        Funcionario treinadorAnterior = request.treinadorAnteriorId() != null
                ? funcionarioRepository.findById(request.treinadorAnteriorId()).orElse(null) : null;

        Funcionario treinadorNovo = request.treinadorNovoId() != null
                ? funcionarioRepository.findById(request.treinadorNovoId()).orElse(null) : null;

        Funcionario coordenador = request.coordenadorTecnicoId() != null
                ? funcionarioRepository.findById(request.coordenadorTecnicoId()).orElse(null) : null;

        TransicaoCategoria transicao = mapper.toEntity(request, atleta, treinadorAnterior, treinadorNovo, coordenador);
        TransicaoCategoria salva = transicaoRepository.save(transicao);

        log.info("Transição de categoria registrada com sucesso. Atleta ID: {} - De: {} Para: {}",
                atleta.getId(), salva.getCategoriaAtual(), salva.getNovaCategoria());

        return mapper.toResponse(salva);
    }

    public TransicaoCategoriaResponse buscarPorId(Long id) {
        TransicaoCategoria transicao = transicaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Registro de transição de categoria não encontrado."));
        return mapper.toResponse(transicao);
    }

    public List<TransicaoCategoriaResponse> listarPorAtleta(Long atletaId) {
        return transicaoRepository.findAllByAtletaIdOrderByDataTransicaoDesc(atletaId).stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional
    public void inativar(Long id) {
        TransicaoCategoria transicao = transicaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Registro de transição não encontrado."));

        transicao.setAtivo(false);
        transicaoRepository.save(transicao);
        log.info("Registro de transição inativado com sucesso. ID: {}", id);
    }
}
