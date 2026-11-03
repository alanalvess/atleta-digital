package com.atletaoficial.atletadigitalbackend.mapper;

import com.atletaoficial.atletadigitalbackend.dto.request.PerfilSocialFamiliarRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.PerfilSocialFamiliarResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.PerfilSocialFamiliar;
import org.springframework.stereotype.Component;

@Component
public class PerfilSocialFamiliarMapper {

    public PerfilSocialFamiliar toEntity(PerfilSocialFamiliarRequest request, Atleta atleta) {
        return PerfilSocialFamiliar.builder()
                .atleta(atleta)
                .moradoresResidencia(request.moradoresResidencia())
                .responsavelRenda(request.responsavelRenda())
                .faixaSalarial(request.faixaSalarial())
                .tipoMoradia(request.tipoMoradia())
                .meioTransporteTreino(request.meioTransporteTreino())
                .tempoDeslocamentoMinutos(request.tempoDeslocamentoMinutos())
                .dificuldadeAlimentacao(request.dificuldadeAlimentacao())
                .necessidadesApoio(request.necessidadesApoio())
                .build();
    }

    public PerfilSocialFamiliarResponse toResponse(PerfilSocialFamiliar perfil) {
        return new PerfilSocialFamiliarResponse(
                perfil.getId(),
                perfil.getAtleta() != null ? perfil.getAtleta().getId() : null,
                perfil.getAtleta() != null ? perfil.getAtleta().getNomeCompleto() : null,
                perfil.getMoradoresResidencia(),
                perfil.getResponsavelRenda(),
                perfil.getFaixaSalarial(),
                perfil.getTipoMoradia(),
                perfil.getMeioTransporteTreino(),
                perfil.getTempoDeslocamentoMinutos(),
                perfil.getDificuldadeAlimentacao(),
                perfil.getNecessidadesApoio(),
                perfil.getDataCriacao(),
                perfil.getDataAtualizacao(),
                perfil.getAtivo()
        );
    }
}
