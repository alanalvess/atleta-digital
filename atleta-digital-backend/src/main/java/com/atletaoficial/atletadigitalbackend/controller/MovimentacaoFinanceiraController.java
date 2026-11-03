package com.atletaoficial.atletadigitalbackend.controller;

import com.atletaoficial.atletadigitalbackend.dto.request.MovimentacaoFinanceiraRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.MovimentacaoFinanceiraResponse;
import com.atletaoficial.atletadigitalbackend.service.MovimentacaoFinanceiraService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/movimentacoes-financeiras")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MovimentacaoFinanceiraController {

    private final MovimentacaoFinanceiraService service;

    @PostMapping("/cadastrar")
    public ResponseEntity<MovimentacaoFinanceiraResponse> registrar(@RequestBody @Valid MovimentacaoFinanceiraRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.registrar(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovimentacaoFinanceiraResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/atleta/{atletaId}")
    public ResponseEntity<List<MovimentacaoFinanceiraResponse>> listarPorAtleta(@PathVariable Long atletaId) {
        return ResponseEntity.ok(service.listarPorAtleta(atletaId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        service.inativar(id);
        return ResponseEntity.noContent().build();
    }
}
