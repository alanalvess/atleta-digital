package com.atletaoficial.atletadigitalbackend.service;

import com.atletaoficial.atletadigitalbackend.dto.request.FuncionarioRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.FuncionarioResponse;
import com.atletaoficial.atletadigitalbackend.entity.Funcionario;
import com.atletaoficial.atletadigitalbackend.entity.Usuario;
import com.atletaoficial.atletadigitalbackend.mapper.FuncionarioMapper;
import com.atletaoficial.atletadigitalbackend.repository.FuncionarioRepository;
import com.atletaoficial.atletadigitalbackend.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class FuncionarioService {

    private final FuncionarioRepository funcionarioRepository;
    private final UsuarioRepository usuarioRepository;
    private final FuncionarioMapper mapper;

    @Transactional
    public FuncionarioResponse cadastrar(FuncionarioRequest request) {
        if (funcionarioRepository.findByCpf(request.cpf()).isPresent()) {
            log.warn("Tentativa de cadastro com CPF já existente: {}", request.cpf());
            throw new IllegalArgumentException("Já existe um funcionário cadastrado com este CPF.");
        }

        Usuario usuario = null;
        if (request.usuarioId() != null) {
            usuario = usuarioRepository.findById(request.usuarioId())
                    .orElseThrow(() -> new IllegalArgumentException("Usuário de acesso não encontrado."));
        }

        Funcionario funcionario = mapper.toEntity(request, usuario);
        Funcionario salvo = funcionarioRepository.save(funcionario);

        log.info("Funcionário cadastrado com sucesso. ID: {} - Nome: {} - Cargo: {}", salvo.getId(), salvo.getNomeCompleto(), salvo.getCargo());
        return mapper.toResponse(salvo);
    }

    public FuncionarioResponse buscarPorId(Long id) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Funcionário não encontrado."));
        return mapper.toResponse(funcionario);
    }

    public List<FuncionarioResponse> listarTodos() {
        return funcionarioRepository.findAll().stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional
    public void inativar(Long id) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Funcionário não encontrado."));

        funcionario.setAtivo(false); // Exclusão lógica (Soft Delete)[cite: 1]
        funcionarioRepository.save(funcionario);
        log.info("Funcionário inativado com sucesso. ID: {}", id);
    }
}
