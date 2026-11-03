package com.atletaoficial.atletadigitalbackend.controller;

import com.atletaoficial.atletadigitalbackend.dto.request.AvaliacaoDesempenhoRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.AvaliacaoDesempenhoResponse;
import com.atletaoficial.atletadigitalbackend.service.AvaliacaoDesempenhoService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/avaliacoes-desempenho")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AvaliacaoDesempenhoController {

    private final AvaliacaoDesempenhoService service;

    @PostMapping("/cadastrar")
    public ResponseEntity<AvaliacaoDesempenhoResponse> registrar(@RequestBody @Valid AvaliacaoDesempenhoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.registrar(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AvaliacaoDesempenhoResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/atleta/{atletaId}")
    public ResponseEntity<List<AvaliacaoDesempenhoResponse>> listarPorAtleta(@PathVariable Long atletaId) {
        return ResponseEntity.ok(service.listarPorAtleta(atletaId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        service.inativar(id);
        return ResponseEntity.noContent().build();
    }
}
