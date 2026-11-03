package com.atletaoficial.atletadigitalbackend.service;

import com.atletaoficial.atletadigitalbackend.dto.request.AtletaRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.AtletaResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.Equipe;
import com.atletaoficial.atletadigitalbackend.mapper.AtletaMapper;
import com.atletaoficial.atletadigitalbackend.repository.AtletaRepository;
import com.atletaoficial.atletadigitalbackend.repository.EquipeRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j // Habilita logs[cite: 5]
@Service
@AllArgsConstructor
public class AtletaService {

    private final AtletaRepository atletaRepository;
    private final EquipeRepository equipeRepository;
    private final AtletaMapper mapper;

    @Transactional
    public AtletaResponse cadastrar(AtletaRequest request) {
        if (atletaRepository.findByCpf(request.cpf()).isPresent()) {
            log.warn("Tentativa de cadastro com CPF já existente: {}", request.cpf());
            throw new IllegalArgumentException("Já existe um atleta cadastrado com este CPF.");
        }

        Equipe equipe = null;
        if (request.equipeId() != null) {
            equipe = equipeRepository.findById(request.equipeId())
                    .orElseThrow(() -> new IllegalArgumentException("Equipe não encontrada para o ID informado."));
        }

        Atleta atleta = mapper.toEntity(request, equipe);
        Atleta salvo = atletaRepository.save(atleta);

        log.info("Atleta cadastrado com sucesso. ID: {} - Nome: {}", salvo.getId(), salvo.getNomeCompleto());
        return mapper.toResponse(salvo);
    }

    public AtletaResponse buscarPorId(Long id) {
        Atleta atleta = atletaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Atleta não encontrado."));
        return mapper.toResponse(atleta);
    }

    public List<AtletaResponse> buscarPorNome(String nome) {
        List<Atleta> atletas = atletaRepository.findAllByNomeCompletoContainingIgnoreCase(nome);

        return atletas.stream()
                .map(mapper::toResponse)
                .toList();
    }


    public List<AtletaResponse> listarTodos() {
        return atletaRepository.findAll().stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional
    public AtletaResponse atualizar(Long id, AtletaRequest request) {
        Atleta atleta = atletaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Atleta não encontrado"));

        Equipe equipe = null;
        if (request.equipeId() != null) {
            equipe = equipeRepository.findById(request.equipeId())
                    .orElseThrow(() -> new IllegalArgumentException("Equipe não encontrada."));
        }

        atleta.setNomeCompleto(request.nomeCompleto());
        atleta.setNomeEsportivo(request.nomeEsportivo());
        atleta.setDataNascimento(request.dataNascimento());
        atleta.setCpf(request.cpf());
        atleta.setRg(request.rg());
        atleta.setTelefone(request.telefone());
        atleta.setEmail(request.email());
        atleta.setEndereco(request.endereco());
        atleta.setBairro(request.bairro());
        atleta.setCep(request.cep());
        atleta.setCategoria(request.categoria());
        atleta.setPosicao(request.posicao());
        atleta.setPeDominante(request.peDominante());
        atleta.setNumeroCamisa(request.numeroCamisa());
        atleta.setDataIngresso(request.dataIngresso());
        atleta.setCodigoMatricula(request.codigoMatricula());
        atleta.setEquipe(equipe);

        return mapper.toResponse(atletaRepository.save(atleta));
    }

    @Transactional
    public AtletaResponse atualizarAtributo(Long id, AtletaRequest request) {
        Atleta atleta = atletaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Atleta não encontrado"));

        if (request.nomeCompleto() != null) atleta.setNomeCompleto(request.nomeCompleto());
        if (request.nomeEsportivo() != null) atleta.setNomeEsportivo(request.nomeEsportivo());
        if (request.dataNascimento() != null) atleta.setDataNascimento(request.dataNascimento());
        if (request.cpf() != null) atleta.setCpf(request.cpf());
        if (request.rg() != null) atleta.setRg(request.rg());
        if (request.telefone() != null) atleta.setTelefone(request.telefone());
        if (request.email() != null) atleta.setEmail(request.email());
        if (request.endereco() != null) atleta.setEndereco(request.endereco());
        if (request.bairro() != null) atleta.setBairro(request.bairro());
        if (request.cep() != null) atleta.setCep(request.cep());
        if (request.categoria() != null) atleta.setCategoria(request.categoria());
        if (request.posicao() != null) atleta.setPosicao(request.posicao());
        if (request.peDominante() != null) atleta.setPeDominante(request.peDominante());
        if (request.numeroCamisa() != null) atleta.setNumeroCamisa(request.numeroCamisa());
        if (request.dataIngresso() != null) atleta.setDataIngresso(request.dataIngresso());
        if (request.codigoMatricula() != null) atleta.setCodigoMatricula(request.codigoMatricula());
        if (request.equipeId() != null) {
            Equipe equipe = equipeRepository.findById(request.equipeId())
                    .orElseThrow(() -> new IllegalArgumentException("Equipe não encontrada."));
            atleta.setEquipe(equipe);
        }

        return mapper.toResponse(atletaRepository.save(atleta));
    }

    @Transactional
    public void inativar(Long id) {
        Atleta atleta = atletaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Atleta não encontrado."));

        atleta.setAtivo(false);
        atletaRepository.save(atleta);
        log.info("Atleta inativado com sucesso. ID: {}", id);
    }
}