package com.atletaoficial.atletadigitalbackend.controller;

import com.atletaoficial.atletadigitalbackend.dto.AlterarSenhaDTO;
import com.atletaoficial.atletadigitalbackend.dto.request.AtletaRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.AtletaResponse;
import com.atletaoficial.atletadigitalbackend.dto.response.UsuarioResponse;
import com.atletaoficial.atletadigitalbackend.entity.Equipe;
import com.atletaoficial.atletadigitalbackend.entity.Usuario;
import com.atletaoficial.atletadigitalbackend.service.AtletaService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@RestController
@RequestMapping("/atletas")
@CrossOrigin(origins = "*", allowedHeaders = "*") //[cite: 4]
public class AtletaController {

    private final AtletaService service;

    @PostMapping("/cadastrar")
    public ResponseEntity<AtletaResponse> cadastrar(@RequestBody @Valid AtletaRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.cadastrar(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AtletaResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<AtletaResponse>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/buscar/{nome}")
    public ResponseEntity<List<AtletaResponse>> buscarPorNome(@PathVariable String nome) {
        return ResponseEntity.ok(service.buscarPorNome(nome));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AtletaResponse> atualizar(@PathVariable Long id, @RequestBody @Valid AtletaRequest request) {
        return ResponseEntity.ok(service.atualizar(id, request));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<AtletaResponse> atualizarParcial(@PathVariable Long id, @RequestBody AtletaRequest request) {
        return ResponseEntity.ok(service.atualizarAtributo(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        service.inativar(id);
        return ResponseEntity.noContent().build();
    }
}