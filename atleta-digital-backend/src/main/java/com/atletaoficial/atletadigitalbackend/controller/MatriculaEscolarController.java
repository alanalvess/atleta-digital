package com.atletaoficial.atletadigitalbackend.controller;

import com.atletaoficial.atletadigitalbackend.dto.request.MatriculaEscolarRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.MatriculaEscolarResponse;
import com.atletaoficial.atletadigitalbackend.service.MatriculaEscolarService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/matriculas-escolares")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MatriculaEscolarController {

    private final MatriculaEscolarService service;

    @PostMapping("/cadastrar")
    public ResponseEntity<MatriculaEscolarResponse> cadastrar(@RequestBody @Valid MatriculaEscolarRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.cadastrar(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MatriculaEscolarResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/atleta/{atletaId}")
    public ResponseEntity<List<MatriculaEscolarResponse>> listarPorAtleta(@PathVariable Long atletaId) {
        return ResponseEntity.ok(service.listarPorAtleta(atletaId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        service.inativar(id);
        return ResponseEntity.noContent().build();
    }
}
