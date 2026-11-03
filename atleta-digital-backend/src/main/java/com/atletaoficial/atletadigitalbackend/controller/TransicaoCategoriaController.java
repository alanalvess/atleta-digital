package com.atletaoficial.atletadigitalbackend.controller;

import com.atletaoficial.atletadigitalbackend.dto.request.TransicaoCategoriaRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.TransicaoCategoriaResponse;
import com.atletaoficial.atletadigitalbackend.service.TransicaoCategoriaService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/transicoes-categorias")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TransicaoCategoriaController {

    private final TransicaoCategoriaService service;

    @PostMapping("/cadastrar")
    public ResponseEntity<TransicaoCategoriaResponse> registrar(@RequestBody @Valid TransicaoCategoriaRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.registrar(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransicaoCategoriaResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/atleta/{atletaId}")
    public ResponseEntity<List<TransicaoCategoriaResponse>> listarPorAtleta(@PathVariable Long atletaId) {
        return ResponseEntity.ok(service.listarPorAtleta(atletaId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        service.inativar(id);
        return ResponseEntity.noContent().build();
    }
}
