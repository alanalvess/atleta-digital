package com.atletaoficial.atletadigitalbackend.mapper;

import com.atletaoficial.atletadigitalbackend.dto.request.AtletaRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.AtletaResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.Equipe;
import org.springframework.stereotype.Component;

@Component
public class AtletaMapper {

    public Atleta toEntity(AtletaRequest request, Equipe equipe) {
        Atleta atleta = new Atleta();
        atleta.setNomeCompleto(request.nomeCompleto());
        atleta.setNomeEsportivo(request.nomeEsportivo());
        atleta.setDataNascimento(request.dataNascimento());
        atleta.setCpf(request.cpf());
        atleta.setRg(request.rg());
        atleta.setTelefone(request.telefone());
        atleta.setEmail(request.email());
        atleta.setEndereco(request.endereco());
        atleta.setBairro(request.bairro());
        atleta.setCep(request.cep());
        atleta.setCategoria(request.categoria());
        atleta.setPosicao(request.posicao());
        atleta.setPeDominante(request.peDominante());
        atleta.setNumeroCamisa(request.numeroCamisa());
        atleta.setDataIngresso(request.dataIngresso());
        atleta.setCodigoMatricula(request.codigoMatricula());
        atleta.setEquipe(equipe);

        return atleta;
    }

    public AtletaResponse toResponse(Atleta atleta) {
        return new AtletaResponse(
                atleta.getId(),
                atleta.getNomeCompleto(),
                atleta.getNomeEsportivo(),
                atleta.getDataNascimento(),
                atleta.calcularIdade(), // Utiliza o método auxiliar criado na entidade[cite: 1, 6]
                atleta.getCpf(),
                atleta.getRg(),
                atleta.getTelefone(),
                atleta.getEmail(),
                atleta.getEndereco(),
                atleta.getBairro(),
                atleta.getCep(),
                atleta.getCategoria(),
                atleta.getPosicao(),
                atleta.getPeDominante(),
                atleta.getNumeroCamisa(),
                atleta.getDataIngresso(),
                atleta.getCodigoMatricula(),
                atleta.getEquipe() != null ? atleta.getEquipe().getId() : null,
                atleta.getDataCriacao(),
                atleta.getDataAtualizacao(),
                atleta.getAtivo(),
                atleta.getCartaoAcesso() != null
        );
    }
}