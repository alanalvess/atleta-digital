package com.atletaoficial.atletadigitalbackend.service;

import com.atletaoficial.atletadigitalbackend.dto.request.SessaoTreinoRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.SessaoTreinoResponse;
import com.atletaoficial.atletadigitalbackend.entity.Funcionario;
import com.atletaoficial.atletadigitalbackend.entity.SessaoTreino;
import com.atletaoficial.atletadigitalbackend.enums.Categoria;
import com.atletaoficial.atletadigitalbackend.mapper.SessaoTreinoMapper;
import com.atletaoficial.atletadigitalbackend.repository.FuncionarioRepository;
import com.atletaoficial.atletadigitalbackend.repository.SessaoTreinoRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class SessaoTreinoService {

    private final SessaoTreinoRepository sessaoRepository;
    private final FuncionarioRepository funcionarioRepository;
    private final SessaoTreinoMapper mapper;

    @Transactional
    public SessaoTreinoResponse registrar(SessaoTreinoRequest request) {
        Funcionario treinador = funcionarioRepository.findById(request.treinadorId())
                .orElseThrow(() -> new IllegalArgumentException("Treinador não encontrado."));

        SessaoTreino sessao = mapper.toEntity(request, treinador);
        SessaoTreino salva = sessaoRepository.save(sessao);

        log.info("Sessão de treino registrada. ID: {} - Categoria: {} - Data: {}", salva.getId(), salva.getCategoria(), salva.getDataTreino());
        return mapper.toResponse(salva);
    }

    public SessaoTreinoResponse buscarPorId(Long id) {
        SessaoTreino sessao = sessaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Sessão de treino não encontrada."));
        return mapper.toResponse(sessao);
    }

    public List<SessaoTreinoResponse> listarPorCategoria(Categoria categoria) {
        return sessaoRepository.findAllByCategoriaOrderByDataTreinoDesc(categoria).stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional
    public void inativar(Long id) {
        SessaoTreino sessao = sessaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Sessão de treino não encontrada."));

        sessao.setAtivo(false);
        sessaoRepository.save(sessao);
        log.info("Sessão de treino inativada com sucesso. ID: {}", id);
    }
}
