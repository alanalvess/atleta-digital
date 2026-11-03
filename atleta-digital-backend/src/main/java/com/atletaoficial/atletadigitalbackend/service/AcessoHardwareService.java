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

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class AcessoHardwareService {

    private final CartaoAcessoRepository cartaoAcessoRepository;
    private final AtletaRepository atletaRepository;
    private final SessaoTreinoRepository sessaoTreinoRepository;
    private final PresencaTreinoService presencaTreinoService;

    // Cache simples para mecanismo de debounce (evitar duas batidas seguidas no mesmo minuto)
    private final Map<String, LocalDateTime> ultimasLeituras = new ConcurrentHashMap<>();

    @Transactional
    public AcessoAtletaResponse processarLeitura(RfidLeituraRequest request) {
        String uid = request.uid().trim().toUpperCase();

        if (!podeProcessar(uid)) {
            return new AcessoAtletaResponse(null, "Processando", null, false, "Aguarde para ler novamente.");
        }

        CartaoAcesso cartao = cartaoAcessoRepository.findByUidIgnoreCase(uid)
                .orElseThrow(() -> new IllegalArgumentException("Cartão não reconhecido ou inativo no sistema."));

        Atleta atleta = cartao.getAtleta();

        // Verifica se existe sessão de treino aberta para a categoria do atleta hoje
        List<SessaoTreino> sessoes = sessaoTreinoRepository.findAllByCategoriaOrderByDataTreinoDesc(atleta.getCategoria());
        if (sessoes.isEmpty()) {
            return new AcessoAtletaResponse(atleta.getId(), atleta.getNomeCompleto(), null, true, "Acesso liberado. Nenhum treino registrado hoje.");
        }

        // Assumindo o treino mais recente como o ativo para a batida
        SessaoTreino sessaoAtual = sessoes.get(0);

        PresencaTreinoRequest presencaRequest = new PresencaTreinoRequest(
                atleta.getId(),
                sessaoAtual.getId(),
                StatusPresenca.PRESENTE,
                "RFID"
        );

        presencaTreinoService.registrar(presencaRequest);
        ultimasLeituras.put(uid, LocalDateTime.now());

        return new AcessoAtletaResponse(atleta.getId(), atleta.getNomeCompleto(), null, true, "Presença Confirmada!");
    }

    @Transactional
    public void vincularCartao(RfidVincularRequest request) {
        String uid = request.uid().trim().toUpperCase();
        Atleta atleta = atletaRepository.findById(request.atletaId())
                .orElseThrow(() -> new IllegalArgumentException("Atleta não encontrado"));

        Optional<CartaoAcesso> uidExistente = cartaoAcessoRepository.findByUidIgnoreCase(uid);
        if (uidExistente.isPresent() && !uidExistente.get().getAtleta().getId().equals(atleta.getId())) {
            throw new IllegalArgumentException("Este UID já está vinculado a outro atleta.");
        }

        CartaoAcesso cartao = cartaoAcessoRepository.findByAtletaId(atleta.getId())
                .orElse(CartaoAcesso.builder().atleta(atleta).build());

        cartao.setUid(uid);
        cartaoAcessoRepository.save(cartao);
    }

    private boolean podeProcessar(String uid) {
        LocalDateTime ultimaLeitura = ultimasLeituras.get(uid);
        if (ultimaLeitura != null && ultimaLeitura.plusMinutes(1).isAfter(LocalDateTime.now())) {
            return false;
        }
        return true;
    }
}
