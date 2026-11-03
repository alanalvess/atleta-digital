package com.atletaoficial.atletadigitalbackend.controller;

import com.atletaoficial.atletadigitalbackend.dto.request.ResponsavelLegalRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.ResponsavelLegalResponse;
import com.atletaoficial.atletadigitalbackend.service.ResponsavelLegalService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/responsaveis-legais")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ResponsavelLegalController {

    private final ResponsavelLegalService service;

    @PostMapping("/cadastrar")
    public ResponseEntity<ResponsavelLegalResponse> cadastrar(@RequestBody @Valid ResponsavelLegalRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.cadastrar(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponsavelLegalResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/atleta/{atletaId}")
    public ResponseEntity<ResponsavelLegalResponse> buscarPorAtleta(@PathVariable Long atletaId) {
        return ResponseEntity.ok(service.buscarPorAtleta(atletaId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        service.inativar(id);
        return ResponseEntity.noContent().build();
    }
}
