package com.atletaoficial.atletadigitalbackend.service;

import com.atletaoficial.atletadigitalbackend.dto.request.EquipeRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.EquipeResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.Equipe;
import com.atletaoficial.atletadigitalbackend.entity.Funcionario;
import com.atletaoficial.atletadigitalbackend.mapper.EquipeMapper;
import com.atletaoficial.atletadigitalbackend.repository.AtletaRepository;
import com.atletaoficial.atletadigitalbackend.repository.EquipeRepository;
import com.atletaoficial.atletadigitalbackend.repository.FuncionarioRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class EquipeService {

    private final EquipeRepository equipeRepository;
    private final FuncionarioRepository funcionarioRepository;
    private final AtletaRepository atletaRepository;
    private final EquipeMapper mapper;

    @Transactional
    public EquipeResponse cadastrar(EquipeRequest request) {
        Funcionario treinador = null;
        if (request.treinadorId() != null) {
            treinador = funcionarioRepository.findById(request.treinadorId())
                    .orElseThrow(() -> new IllegalArgumentException("Treinador não encontrado."));
        }

        Funcionario preparador = null;
        if (request.preparadorFisicoId() != null) {
            preparador = funcionarioRepository.findById(request.preparadorFisicoId())
                    .orElseThrow(() -> new IllegalArgumentException("Preparador físico não encontrado."));
        }

        Equipe equipe = mapper.toEntity(request, treinador, preparador);
        Equipe salva = equipeRepository.save(equipe);

        log.info("Equipe cadastrada com sucesso. ID: {} - Categoria: {} - Temporada: {}", salva.getId(), salva.getCategoria(), salva.getTemporada());
        return mapper.toResponse(salva);
    }

    public EquipeResponse buscarPorId(Long id) {
        Equipe equipe = equipeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Equipe não encontrada."));
        return mapper.toResponse(equipe);
    }

    public List<EquipeResponse> listarTodas() {
        return equipeRepository.findAll().stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional
    public EquipeResponse atualizar(Long id, EquipeRequest request) {
        Equipe equipe = equipeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Equipe não encontrada."));

        Funcionario treinador = request.treinadorId() != null ?
                funcionarioRepository.findById(request.treinadorId()).orElseThrow(() -> new IllegalArgumentException("Treinador não encontrado.")) : null;

        Funcionario preparador = request.preparadorFisicoId() != null ?
                funcionarioRepository.findById(request.preparadorFisicoId()).orElseThrow(() -> new IllegalArgumentException("Preparador não encontrado.")) : null;

        equipe.setTemporada(request.temporada());
        equipe.setCategoria(request.categoria());
        equipe.setTreinador(treinador);
        equipe.setPreparadorFisico(preparador);

        return mapper.toResponse(equipeRepository.save(equipe));
    }

    @Transactional
    public EquipeResponse atualizarAtributo(Long id, EquipeRequest request) {
        Equipe equipe = equipeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Equipe não encontrada."));

        if (request.temporada() != null) equipe.setTemporada(request.temporada());
        if (request.categoria() != null) equipe.setCategoria(request.categoria());

        if (request.treinadorId() != null) {
            Funcionario treinador = funcionarioRepository.findById(request.treinadorId())
                    .orElseThrow(() -> new IllegalArgumentException("Treinador não encontrado."));
            equipe.setTreinador(treinador);
        }

        if (request.preparadorFisicoId() != null) {
            Funcionario preparador = funcionarioRepository.findById(request.preparadorFisicoId())
                    .orElseThrow(() -> new IllegalArgumentException("Preparador não encontrado."));
            equipe.setPreparadorFisico(preparador);
        }

        return mapper.toResponse(equipeRepository.save(equipe));
    }

    @Transactional
    public void inativar(Long id) {
        Equipe equipe = equipeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Equipe não encontrada."));

        equipe.setAtivo(false);
        equipeRepository.save(equipe);
        log.info("Equipe inativada com sucesso. ID: {}", id);
    }

    @Transactional
    public void vincularAtletas(Long equipeId, List<Long> atletaIds) {
        Equipe equipe = equipeRepository.findById(equipeId)
                .orElseThrow(() -> new IllegalArgumentException("Equipe não encontrada."));

        // Desvincula os atletas que atualmente pertencem a esta equipe
        List<Atleta> atletasAtuais = atletaRepository.findAllByEquipeId(equipeId);
        for (Atleta atleta : atletasAtuais) {
            atleta.setEquipe(null);
        }
        atletaRepository.saveAll(atletasAtuais);

        // Vincula a nova lista de selecionados
        if (atletaIds != null && !atletaIds.isEmpty()) {
            List<Atleta> novosAtletas = atletaRepository.findAllById(atletaIds);
            for (Atleta atleta : novosAtletas) {
                atleta.setEquipe(equipe);
            }
            atletaRepository.saveAll(novosAtletas);
        }
    }
}
