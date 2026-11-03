package com.atletaoficial.atletadigitalbackend.controller;

import com.atletaoficial.atletadigitalbackend.dto.request.ControleNegociacaoRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.ControleNegociacaoResponse;
import com.atletaoficial.atletadigitalbackend.service.ControleNegociacaoService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/negociacoes")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ControleNegociacaoController {

    private final ControleNegociacaoService service;

    @PostMapping("/cadastrar")
    public ResponseEntity<ControleNegociacaoResponse> registrar(@RequestBody @Valid ControleNegociacaoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.registrar(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ControleNegociacaoResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/atleta/{atletaId}")
    public ResponseEntity<List<ControleNegociacaoResponse>> listarPorAtleta(@PathVariable Long atletaId) {
        return ResponseEntity.ok(service.listarPorAtleta(atletaId));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestParam String status) {
        service.atualizarStatus(id, status);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        service.inativar(id);
        return ResponseEntity.noContent().build();
    }
}
