package com.atletaoficial.atletadigitalbackend.controller;

import com.atletaoficial.atletadigitalbackend.dto.request.RfidLeituraRequest;
import com.atletaoficial.atletadigitalbackend.dto.request.RfidVincularRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.AcessoAtletaResponse;
import com.atletaoficial.atletadigitalbackend.service.AcessoHardwareService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/acesso-hardware")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AcessoHardwareController {

    private final AcessoHardwareService acessoService;

    @PostMapping("/scan")
    public ResponseEntity<AcessoAtletaResponse> registrarAcesso(@RequestBody @Valid RfidLeituraRequest request) {
        return ResponseEntity.ok(acessoService.processarLeitura(request));
    }

    @PostMapping("/vincular")
    public ResponseEntity<Void> vincularCartao(@RequestBody @Valid RfidVincularRequest request) {
        acessoService.vincularCartao(request);
        return ResponseEntity.noContent().build();
    }
}
