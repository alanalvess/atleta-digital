package com.atletaoficial.atletadigitalbackend.controller;

import com.atletaoficial.atletadigitalbackend.dto.request.RfidLeituraRequest;
import com.atletaoficial.atletadigitalbackend.dto.request.RfidVincularRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.AcessoAtletaResponse;
import com.atletaoficial.atletadigitalbackend.service.AutomacaoAcessoService;
import com.atletaoficial.atletadigitalbackend.utils.QRCodeGenerator;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/acesso-hardware")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AutomacaoAcessoController {

    private final AutomacaoAcessoService service;
    private final QRCodeGenerator qrCodeGenerator;

    @PostMapping("/rfid/scan")
    public ResponseEntity<AcessoAtletaResponse> scanRFID(@RequestBody @Valid RfidLeituraRequest request) {
        return ResponseEntity.ok(service.processarLeituraRFID(request));
    }

    @PostMapping("/rfid/vincular")
    public ResponseEntity<Void> vincularRFID(@RequestBody @Valid RfidVincularRequest request) {
        service.vincularCartao(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping(value = "/qrcode/gerar/{atletaId}", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> gerarQRCodeAtleta(@PathVariable Long atletaId) throws Exception {
        // Encriptar ou gerar payload JSON com o ID do atleta
        String payload = "{\"atletaId\": " + atletaId + "}";
        byte[] imagem = qrCodeGenerator.gerarImagemQRCode(payload, 250, 250).toByteArray();
        return ResponseEntity.ok(imagem);
    }
}
