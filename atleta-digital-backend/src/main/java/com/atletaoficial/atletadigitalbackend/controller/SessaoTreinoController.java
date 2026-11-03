package com.atletaoficial.atletadigitalbackend.controller;

import com.atletaoficial.atletadigitalbackend.dto.request.SessaoTreinoRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.SessaoTreinoResponse;
import com.atletaoficial.atletadigitalbackend.enums.Categoria;
import com.atletaoficial.atletadigitalbackend.service.SessaoTreinoService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/sessoes-treino")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SessaoTreinoController {

    private final SessaoTreinoService service;

    @PostMapping("/cadastrar")
    public ResponseEntity<SessaoTreinoResponse> registrar(@RequestBody @Valid SessaoTreinoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.registrar(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SessaoTreinoResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<SessaoTreinoResponse>> listarPorCategoria(@PathVariable Categoria categoria) {
        return ResponseEntity.ok(service.listarPorCategoria(categoria));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        service.inativar(id);
        return ResponseEntity.noContent().build();
    }
}
