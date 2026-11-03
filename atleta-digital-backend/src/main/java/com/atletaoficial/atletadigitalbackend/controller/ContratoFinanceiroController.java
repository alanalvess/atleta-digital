package com.atletaoficial.atletadigitalbackend.controller;

import com.atletaoficial.atletadigitalbackend.dto.request.ContratoFinanceiroRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.ContratoFinanceiroResponse;
import com.atletaoficial.atletadigitalbackend.service.ContratoFinanceiroService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/contratos-financeiros")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ContratoFinanceiroController {

    private final ContratoFinanceiroService service;

    @PostMapping("/cadastrar")
    public ResponseEntity<ContratoFinanceiroResponse> cadastrar(@RequestBody @Valid ContratoFinanceiroRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.cadastrar(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContratoFinanceiroResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/atleta/{atletaId}")
    public ResponseEntity<ContratoFinanceiroResponse> buscarPorAtleta(@PathVariable Long atletaId) {
        return ResponseEntity.ok(service.buscarPorAtleta(atletaId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        service.inativar(id);
        return ResponseEntity.noContent().build();
    }
}
