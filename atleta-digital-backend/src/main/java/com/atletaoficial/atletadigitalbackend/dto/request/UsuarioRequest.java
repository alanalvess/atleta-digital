package com.atletaoficial.atletadigitalbackend.dto.request;

import com.atletaoficial.atletadigitalbackend.enums.Role;
import jakarta.validation.constraints.Email;

import java.util.List;

public record UsuarioRequest(
        Long id,
        String nome,
        @Email(message = "O email deve ser válido") String email,
        String senha,
        List<Role> roles
) {
}
