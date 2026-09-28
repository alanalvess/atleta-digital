package com.atletaoficial.atletadigitalbackend.dto.response;

import com.atletaoficial.atletadigitalbackend.enums.Role;

import java.util.List;

public record UsuarioResponse(
        Long id,
        String nome,
        String email,
        String token,
        List<Role> roles
) {
}
