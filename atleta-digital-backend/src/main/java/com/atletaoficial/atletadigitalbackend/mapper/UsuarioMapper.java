package com.atletaoficial.atletadigitalbackend.mapper;

import com.atletaoficial.atletadigitalbackend.dto.request.UsuarioRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.UsuarioResponse;
import com.atletaoficial.atletadigitalbackend.entity.Usuario;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class UsuarioMapper {

    public Usuario toEntity(UsuarioRequest request) {
        Usuario entity = new Usuario();

        entity.setNome(request.nome());
        entity.setEmail(request.email());
        entity.setSenha(request.senha());
        entity.setRoles(request.roles() != null ? request.roles() : new ArrayList<>());

        return entity;
    }

    public UsuarioRequest toRequest(Usuario usuario) {
        return new UsuarioRequest(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getSenha(),
                usuario.getRoles()
        );
    }

    public UsuarioResponse toResponse(Usuario usuario, String token) {
        return new UsuarioResponse(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                token,
                usuario.getRoles()
        );
    }

    public UsuarioResponse toResponseSemToken(Usuario usuario) {
        return new UsuarioResponse(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                null,
                usuario.getRoles()
        );
    }
}
