package com.atletaoficial.atletadigitalbackend.mapper;

import com.atletaoficial.atletadigitalbackend.dto.request.FuncionarioRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.FuncionarioResponse;
import com.atletaoficial.atletadigitalbackend.entity.Funcionario;
import com.atletaoficial.atletadigitalbackend.entity.Usuario;
import org.springframework.stereotype.Component;

@Component
public class FuncionarioMapper {

    public Funcionario toEntity(FuncionarioRequest request, Usuario usuario) {
        return Funcionario.builder()
                .nomeCompleto(request.nomeCompleto())
                .cpf(request.cpf())
                .telefone(request.telefone())
                .cargo(request.cargo())
                .registroProfissional(request.registroProfissional())
                .dataContratacao(request.dataContratacao())
                .usuario(usuario)
                .build();
    }

    public FuncionarioResponse toResponse(Funcionario funcionario) {
        return new FuncionarioResponse(
                funcionario.getId(),
                funcionario.getNomeCompleto(),
                funcionario.getCpf(),
                funcionario.getTelefone(),
                funcionario.getCargo(),
                funcionario.getRegistroProfissional(),
                funcionario.getDataContratacao(),
                funcionario.getUsuario() != null ? funcionario.getUsuario().getId() : null,
                funcionario.getUsuario() != null ? funcionario.getUsuario().getEmail() : null,
                funcionario.getDataCriacao(),
                funcionario.getDataAtualizacao(),
                funcionario.getAtivo()
        );
    }
}
