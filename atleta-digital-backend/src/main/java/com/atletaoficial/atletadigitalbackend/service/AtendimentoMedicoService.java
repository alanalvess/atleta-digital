package com.atletaoficial.atletadigitalbackend.service;

import com.atletaoficial.atletadigitalbackend.dto.request.AtendimentoMedicoRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.AtendimentoMedicoResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.AtendimentoMedico;
import com.atletaoficial.atletadigitalbackend.entity.Funcionario;
import com.atletaoficial.atletadigitalbackend.mapper.AtendimentoMedicoMapper;
import com.atletaoficial.atletadigitalbackend.repository.AtletaRepository;
import com.atletaoficial.atletadigitalbackend.repository.AtendimentoMedicoRepository;
import com.atletaoficial.atletadigitalbackend.repository.FuncionarioRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class AtendimentoMedicoService {

    private final AtendimentoMedicoRepository atendimentoRepository;
    private final AtletaRepository atletaRepository;
    private final FuncionarioRepository funcionarioRepository;
    private final AtendimentoMedicoMapper mapper;

    @Transactional
    public AtendimentoMedicoResponse registrar(AtendimentoMedicoRequest request) {
        Atleta atleta = atletaRepository.findById(request.atletaId())
                .orElseThrow(() -> new IllegalArgumentException("Atleta não encontrado para o ID informado."));

        Funcionario profissional = funcionarioRepository.findById(request.profissionalSaudeId())
                .orElseThrow(() -> new IllegalArgumentException("Profissional de saúde não encontrado para o ID informado."));

        AtendimentoMedico atendimento = mapper.toEntity(request, atleta, profissional);
        AtendimentoMedico salvo = atendimentoRepository.save(atendimento);

        log.info("Atendimento médico registrado com sucesso. Atleta ID: {} - Profissional ID: {}", atleta.getId(), profissional.getId());
        return mapper.toResponse(salvo);
    }

    public AtendimentoMedicoResponse buscarPorId(Long id) {
        AtendimentoMedico atendimento = atendimentoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Atendimento médico não encontrado."));
        return mapper.toResponse(atendimento);
    }

    public List<AtendimentoMedicoResponse> listarPorAtleta(Long atletaId) {
        return atendimentoRepository.findAllByAtletaIdOrderByDataAtendimentoDesc(atletaId).stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional
    public void inativar(Long id) {
        AtendimentoMedico atendimento = atendimentoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Atendimento médico não encontrado."));

        atendimento.setAtivo(false);
        atendimentoRepository.save(atendimento);
        log.info("Atendimento médico inativado com sucesso. ID: {}", id);
    }
}
