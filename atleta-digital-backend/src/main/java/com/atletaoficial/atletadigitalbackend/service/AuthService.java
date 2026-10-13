package com.atletaoficial.atletadigitalbackend.service;

import com.atletaoficial.atletadigitalbackend.dto.request.UsuarioLoginRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.UsuarioResponse;
import com.atletaoficial.atletadigitalbackend.entity.Usuario;
import com.atletaoficial.atletadigitalbackend.exception.UsuarioNaoAutorizadoException;
import com.atletaoficial.atletadigitalbackend.exception.UsuarioNaoEncontradoException;
import com.atletaoficial.atletadigitalbackend.mapper.UsuarioMapper;
import com.atletaoficial.atletadigitalbackend.repository.UsuarioRepository;
import com.atletaoficial.atletadigitalbackend.security.JwtService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class AuthService {

    private final AuthenticationManager manager;
    private final UsuarioRepository repository;
    private final JwtService jwtService;
    private final UsuarioMapper mapper;

    public UsuarioResponse autenticarUsuario(UsuarioLoginRequest usuarioLoginRequest) {
        try {
            manager.authenticate(
                    new UsernamePasswordAuthenticationToken(usuarioLoginRequest.email(), usuarioLoginRequest.senha())
            );

            Usuario usuario = repository.findByEmail(usuarioLoginRequest.email())
                    .orElseThrow(() -> new UsuarioNaoEncontradoException("Usuário não encontrado"));

            String token = jwtService.generateToken(usuario.getEmail(), usuario.getRoles());

            log.info("Autenticação realizada com sucesso para o usuário: {}", usuario.getEmail());

            return mapper.toResponse(usuario, token);

        } catch (AuthenticationException ex) {
            log.warn("Tentativa de login malsucedida para o e-mail: {}", usuarioLoginRequest.email());
            throw new UsuarioNaoAutorizadoException("Falha na autenticação");
        }
    }
}