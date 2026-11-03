package com.atletaoficial.atletadigitalbackend.controller;

import com.atletaoficial.atletadigitalbackend.dto.request.PresencaTreinoRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.PresencaTreinoResponse;
import com.atletaoficial.atletadigitalbackend.service.PresencaTreinoService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/presencas-treino")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PresencaTreinoController {

    private final PresencaTreinoService service;

    @PostMapping("/cadastrar")
    public ResponseEntity<PresencaTreinoResponse> registrar(@RequestBody @Valid PresencaTreinoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.registrar(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PresencaTreinoResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/sessao/{sessaoTreinoId}")
    public ResponseEntity<List<PresencaTreinoResponse>> listarPorSessao(@PathVariable Long sessaoTreinoId) {
        return ResponseEntity.ok(service.listarPorSessao(sessaoTreinoId));
    }

    @GetMapping("/atleta/{atletaId}")
    public ResponseEntity<List<PresencaTreinoResponse>> listarPorAtleta(@PathVariable Long atletaId) {
        return ResponseEntity.ok(service.listarPorAtleta(atletaId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        service.inativar(id);
        return ResponseEntity.noContent().build();
    }
}
