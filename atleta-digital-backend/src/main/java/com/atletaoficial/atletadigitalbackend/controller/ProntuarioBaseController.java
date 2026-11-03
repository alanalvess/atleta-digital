package com.atletaoficial.atletadigitalbackend.controller;

import com.atletaoficial.atletadigitalbackend.dto.request.ProntuarioBaseRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.ProntuarioBaseResponse;
import com.atletaoficial.atletadigitalbackend.service.ProntuarioBaseService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/prontuarios-base")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProntuarioBaseController {

    private final ProntuarioBaseService service;

    @PostMapping("/cadastrar")
    public ResponseEntity<ProntuarioBaseResponse> cadastrar(@RequestBody @Valid ProntuarioBaseRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.cadastrar(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProntuarioBaseResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/atleta/{atletaId}")
    public ResponseEntity<ProntuarioBaseResponse> buscarPorAtleta(@PathVariable Long atletaId) {
        return ResponseEntity.ok(service.buscarPorAtleta(atletaId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        service.inativar(id);
        return ResponseEntity.noContent().build();
    }
}
