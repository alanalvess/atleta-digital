package com.atletaoficial.atletadigitalbackend.service;

import com.atletaoficial.atletadigitalbackend.dto.request.PerfilSocialFamiliarRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.PerfilSocialFamiliarResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.PerfilSocialFamiliar;
import com.atletaoficial.atletadigitalbackend.mapper.PerfilSocialFamiliarMapper;
import com.atletaoficial.atletadigitalbackend.repository.AtletaRepository;
import com.atletaoficial.atletadigitalbackend.repository.PerfilSocialFamiliarRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@AllArgsConstructor
public class PerfilSocialFamiliarService {

    private final PerfilSocialFamiliarRepository perfilRepository;
    private final AtletaRepository atletaRepository;
    private final PerfilSocialFamiliarMapper mapper;

    @Transactional
    public PerfilSocialFamiliarResponse cadastrar(PerfilSocialFamiliarRequest request) {
        if (perfilRepository.findByAtletaId(request.atletaId()).isPresent()) {
            log.warn("Tentativa de cadastrar um perfil para o atleta ID: {}, mas ele já possui um.", request.atletaId());
            throw new IllegalArgumentException("Este atleta já possui um Perfil Social Familiar cadastrado.");
        }

        Atleta atleta = atletaRepository.findById(request.atletaId())
                .orElseThrow(() -> new IllegalArgumentException("Atleta não encontrado para o ID informado."));

        PerfilSocialFamiliar perfil = mapper.toEntity(request, atleta);
        PerfilSocialFamiliar salvo = perfilRepository.save(perfil);

        log.info("Perfil Social e Familiar registrado com sucesso para o atleta ID: {}", atleta.getId());
        return mapper.toResponse(salvo);
    }

    public PerfilSocialFamiliarResponse buscarPorId(Long id) {
        PerfilSocialFamiliar perfil = perfilRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Perfil Social e Familiar não encontrado."));
        return mapper.toResponse(perfil);
    }

    public PerfilSocialFamiliarResponse buscarPorAtleta(Long atletaId) {
        PerfilSocialFamiliar perfil = perfilRepository.findByAtletaId(atletaId)
                .orElseThrow(() -> new IllegalArgumentException("Perfil Social e Familiar não encontrado para este atleta."));
        return mapper.toResponse(perfil);
    }

    @Transactional
    public void inativar(Long id) {
        PerfilSocialFamiliar perfil = perfilRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Perfil Social e Familiar não encontrado."));

        perfil.setAtivo(false);
        perfilRepository.save(perfil);
        log.info("Perfil Social e Familiar inativado com sucesso. ID: {}", id);
    }
}
