package com.atletaoficial.atletadigitalbackend.service;

import com.atletaoficial.atletadigitalbackend.entity.Usuario;
import com.atletaoficial.atletadigitalbackend.enums.Role;
import com.atletaoficial.atletadigitalbackend.repository.UsuarioRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class AdminSetupService {

    private final AdminProperties adminProperties;
    private final UsuarioRepository repository;
    private final PasswordEncoder encoder;

    @PostConstruct
    public void criarAdminPadrao() {
        if (repository.findByEmail(adminProperties.getAdminEmail()).isEmpty()) {
            Usuario admin = Usuario.builder()
                    .nome(adminProperties.getAdminName())
                    .email(adminProperties.getAdminEmail())
                    .senha(encoder.encode(adminProperties.getAdminPassword()))
                    .ativo(true)
                    .roles(List.of(Role.ADMIN))
                    .build();
            repository.save(admin);
        }
    }
}
