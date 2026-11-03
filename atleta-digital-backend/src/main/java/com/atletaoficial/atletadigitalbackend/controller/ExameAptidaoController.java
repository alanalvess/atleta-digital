package com.atletaoficial.atletadigitalbackend.controller;

import com.atletaoficial.atletadigitalbackend.dto.request.ExameAptidaoRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.ExameAptidaoResponse;
import com.atletaoficial.atletadigitalbackend.service.ExameAptidaoService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/exames-aptidao")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ExameAptidaoController {

    private final ExameAptidaoService service;

    @PostMapping("/cadastrar")
    public ResponseEntity<ExameAptidaoResponse> registrar(@RequestBody @Valid ExameAptidaoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.registrar(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExameAptidaoResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/atleta/{atletaId}")
    public ResponseEntity<List<ExameAptidaoResponse>> listarPorAtleta(@PathVariable Long atletaId) {
        return ResponseEntity.ok(service.listarPorAtleta(atletaId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        service.inativar(id);
        return ResponseEntity.noContent().build();
    }
}
