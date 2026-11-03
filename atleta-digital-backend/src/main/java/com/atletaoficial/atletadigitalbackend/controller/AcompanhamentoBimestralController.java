package com.atletaoficial.atletadigitalbackend.controller;

import com.atletaoficial.atletadigitalbackend.dto.request.AcompanhamentoBimestralRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.AcompanhamentoBimestralResponse;
import com.atletaoficial.atletadigitalbackend.service.AcompanhamentoBimestralService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/acompanhamentos-bimestrais")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AcompanhamentoBimestralController {

    private final AcompanhamentoBimestralService service;

    @PostMapping("/cadastrar")
    public ResponseEntity<AcompanhamentoBimestralResponse> registrar(@RequestBody @Valid AcompanhamentoBimestralRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.registrar(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AcompanhamentoBimestralResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/matricula/{matriculaId}")
    public ResponseEntity<List<AcompanhamentoBimestralResponse>> listarPorMatricula(@PathVariable Long matriculaId) {
        return ResponseEntity.ok(service.listarPorMatricula(matriculaId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        service.inativar(id);
        return ResponseEntity.noContent().build();
    }
}
