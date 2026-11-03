package com.atletaoficial.atletadigitalbackend.controller;

import com.atletaoficial.atletadigitalbackend.dto.request.EquipeRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.EquipeResponse;
import com.atletaoficial.atletadigitalbackend.service.EquipeService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/equipes")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EquipeController {

    private final EquipeService service;

    @PostMapping("/cadastrar")
    public ResponseEntity<EquipeResponse> cadastrar(@RequestBody @Valid EquipeRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.cadastrar(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EquipeResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<EquipeResponse>> listarTodas() {
        return ResponseEntity.ok(service.listarTodas());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EquipeResponse> atualizar(@PathVariable Long id, @RequestBody @Valid EquipeRequest request) {
        return ResponseEntity.ok(service.atualizar(id, request));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<EquipeResponse> atualizarParcial(@PathVariable Long id, @RequestBody EquipeRequest request) {
        return ResponseEntity.ok(service.atualizarAtributo(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        service.inativar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/vincular-atletas")
    public ResponseEntity<Void> vincularAtletas(@PathVariable Long id, @RequestBody List<Long> atletaIds) {
        service.vincularAtletas(id, atletaIds);
        return ResponseEntity.noContent().build();
    }
}