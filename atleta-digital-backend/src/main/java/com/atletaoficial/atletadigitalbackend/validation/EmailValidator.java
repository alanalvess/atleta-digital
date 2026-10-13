package com.atletaoficial.atletadigitalbackend.validation;

import com.atletaoficial.atletadigitalbackend.exception.EmailJaCadastradoException;
import com.atletaoficial.atletadigitalbackend.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class EmailValidator {

    private final UsuarioRepository usuarioRepository;

    public void validarEmailUnico(String email) {
        if (usuarioRepository.findByEmail(email).isPresent()) {
            throw new EmailJaCadastradoException(email);
        }
    }

    public void validarEmailUnicoNoUpdate(String email, Long id) {
        usuarioRepository.findByEmail(email)
                .filter(user -> !user.getId().equals(id))
                .ifPresent(user -> {
                    throw new EmailJaCadastradoException(email);
                });
    }
}