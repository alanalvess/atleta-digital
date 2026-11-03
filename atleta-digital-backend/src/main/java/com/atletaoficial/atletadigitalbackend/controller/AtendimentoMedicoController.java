package com.atletaoficial.atletadigitalbackend.controller;

import com.atletaoficial.atletadigitalbackend.dto.request.AtendimentoMedicoRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.AtendimentoMedicoResponse;
import com.atletaoficial.atletadigitalbackend.service.AtendimentoMedicoService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/atendimentos-medicos")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AtendimentoMedicoController {

    private final AtendimentoMedicoService service;

    @PostMapping("/cadastrar")
    public ResponseEntity<AtendimentoMedicoResponse> registrar(@RequestBody @Valid AtendimentoMedicoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.registrar(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AtendimentoMedicoResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/atleta/{atletaId}")
    public ResponseEntity<List<AtendimentoMedicoResponse>> listarPorAtleta(@PathVariable Long atletaId) {
        return ResponseEntity.ok(service.listarPorAtleta(atletaId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        service.inativar(id);
        return ResponseEntity.noContent().build();
    }
}
