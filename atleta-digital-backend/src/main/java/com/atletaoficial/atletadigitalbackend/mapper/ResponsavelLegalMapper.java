package com.atletaoficial.atletadigitalbackend.mapper;

import com.atletaoficial.atletadigitalbackend.dto.request.ResponsavelLegalRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.ResponsavelLegalResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.ResponsavelLegal;
import org.springframework.stereotype.Component;

@Component
public class ResponsavelLegalMapper {

    public ResponsavelLegal toEntity(ResponsavelLegalRequest request, Atleta atleta) {
        return ResponsavelLegal.builder()
                .atleta(atleta)
                .nome(request.nome())
                .parentesco(request.parentesco())
                .cpf(request.cpf())
                .telefone(request.telefone())
                .email(request.email())
                .build();
    }

    public ResponsavelLegalResponse toResponse(ResponsavelLegal responsavel) {
        return new ResponsavelLegalResponse(
                responsavel.getId(),
                responsavel.getAtleta() != null ? responsavel.getAtleta().getId() : null,
                responsavel.getAtleta() != null ? responsavel.getAtleta().getNomeCompleto() : null,
                responsavel.getNome(),
                responsavel.getParentesco(),
                responsavel.getCpf(),
                responsavel.getTelefone(),
                responsavel.getEmail(),
                responsavel.getDataCriacao(),
                responsavel.getDataAtualizacao(),
                responsavel.getAtivo()
        );
    }
}
