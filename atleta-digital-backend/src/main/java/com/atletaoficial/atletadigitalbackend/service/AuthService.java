package com.atletaoficial.atletadigitalbackend.service;

import com.atletaoficial.atletadigitalbackend.dto.request.UsuarioLoginRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.UsuarioResponse;
import com.atletaoficial.atletadigitalbackend.entity.Usuario;
import com.atletaoficial.atletadigitalbackend.exception.UsuarioNaoAutorizadoException;
import com.atletaoficial.atletadigitalbackend.exception.UsuarioNaoEncontradoException;
import com.atletaoficial.atletadigitalbackend.mapper.UsuarioMapper;
import com.atletaoficial.atletadigitalbackend.repository.UsuarioRepository;
import com.atletaoficial.atletadigitalbackend.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager manager;
    private final UsuarioRepository repository;
    private final JwtService jwtService;
    private final UsuarioMapper mapper;

    public AuthService(
            AuthenticationManager manager,
            UsuarioRepository repository,
            JwtService jwtService,
            UsuarioMapper mapper
    ) {
        this.manager = manager;
        this.repository = repository;
        this.jwtService = jwtService;
        this.mapper = mapper;
    }

    public UsuarioResponse autenticarUsuario(UsuarioLoginRequest usuarioLoginRequest) {
        try {
            manager.authenticate(
                    new UsernamePasswordAuthenticationToken(usuarioLoginRequest.email(), usuarioLoginRequest.senha())
            );

            Usuario usuario = repository.findByEmail(usuarioLoginRequest.email())
                    .orElseThrow(() -> new UsuarioNaoEncontradoException("Usuário não encontrado"));

            String token = jwtService.generateToken(usuario.getEmail(), usuario.getRoles());

            return mapper.toResponse(usuario, token);

        } catch (AuthenticationException ex) {
            throw new UsuarioNaoAutorizadoException("Falha na autenticação");
        }
    }
}
