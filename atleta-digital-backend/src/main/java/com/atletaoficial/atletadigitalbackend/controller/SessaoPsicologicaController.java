package com.atletaoficial.atletadigitalbackend.controller;

import com.atletaoficial.atletadigitalbackend.dto.request.SessaoPsicologicaRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.SessaoPsicologicaResponse;
import com.atletaoficial.atletadigitalbackend.service.SessaoPsicologicaService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/sessoes-psicologicas")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SessaoPsicologicaController {

    private final SessaoPsicologicaService service;

    @PostMapping("/cadastrar")
    public ResponseEntity<SessaoPsicologicaResponse> registrar(@RequestBody @Valid SessaoPsicologicaRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.registrar(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SessaoPsicologicaResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/atleta/{atletaId}")
    public ResponseEntity<List<SessaoPsicologicaResponse>> listarPorAtleta(@PathVariable Long atletaId) {
        return ResponseEntity.ok(service.listarPorAtleta(atletaId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        service.inativar(id);
        return ResponseEntity.noContent().build();
    }
}
