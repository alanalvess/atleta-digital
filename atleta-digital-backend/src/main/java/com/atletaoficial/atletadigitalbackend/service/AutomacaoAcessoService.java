package com.atletaoficial.atletadigitalbackend.service;

import com.atletaoficial.atletadigitalbackend.dto.request.PresencaTreinoRequest;
import com.atletaoficial.atletadigitalbackend.dto.request.RfidLeituraRequest;
import com.atletaoficial.atletadigitalbackend.dto.request.RfidVincularRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.AcessoAtletaResponse;
import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import com.atletaoficial.atletadigitalbackend.entity.CartaoAcesso;
import com.atletaoficial.atletadigitalbackend.entity.SessaoTreino;
import com.atletaoficial.atletadigitalbackend.enums.StatusPresenca;
import com.atletaoficial.atletadigitalbackend.repository.AtletaRepository;
import com.atletaoficial.atletadigitalbackend.repository.CartaoAcessoRepository;
import com.atletaoficial.atletadigitalbackend.repository.SessaoTreinoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AutomacaoAcessoService {

    private final CartaoAcessoRepository cartaoRepository;
    private final AtletaRepository atletaRepository;
    private final SessaoTreinoRepository sessaoRepository;
    private final PresencaTreinoService presencaService;

    @Transactional
    public AcessoAtletaResponse processarLeituraRFID(RfidLeituraRequest request) {
        CartaoAcesso cartao = cartaoRepository.findByUidIgnoreCase(request.uid())
                .orElseThrow(() -> new IllegalArgumentException("Cartão RFID não cadastrado"));

        Atleta atleta = cartao.getAtleta();
        registrarPresencaSeHouverTreino(atleta, "RFID");

        return new AcessoAtletaResponse(
                atleta.getId(),
                atleta.getNomeCompleto(),
                null,
                true,
                "Acesso Liberado - Bem-vindo, " + atleta.getNomeEsportivo()
        );
    }

    @Transactional
    public void vincularCartao(RfidVincularRequest request) {
        Atleta atleta = atletaRepository.findById(request.atletaId())
                .orElseThrow(() -> new IllegalArgumentException("Atleta não encontrado"));

        CartaoAcesso cartao = cartaoRepository.findByAtletaId(atleta.getId())
                .orElse(CartaoAcesso.builder().atleta(atleta).build());

        cartao.setUid(request.uid());
        cartaoRepository.save(cartao);
        log.info("Cartão RFID {} vinculado ao atleta ID: {}", request.uid(), atleta.getId());
    }

    private void registrarPresencaSeHouverTreino(Atleta atleta, String metodo) {
        // Busca se existe um treino aberto para a categoria do atleta hoje
        Optional<SessaoTreino> sessaoHoje = sessaoRepository.findAll().stream()
                .filter(s -> s.getCategoria().equals(atleta.getCategoria()) && s.getDataTreino().equals(LocalDate.now()))
                .findFirst();

        sessaoHoje.ifPresent(sessao -> {
            PresencaTreinoRequest presencaReq = new PresencaTreinoRequest(
                    atleta.getId(),
                    sessao.getId(),
                    StatusPresenca.PRESENTE,
                    metodo
            );
            presencaService.registrar(presencaReq);
            log.info("Presença registrada via {} para o atleta ID: {}", metodo, atleta.getId());
        });
    }
}
