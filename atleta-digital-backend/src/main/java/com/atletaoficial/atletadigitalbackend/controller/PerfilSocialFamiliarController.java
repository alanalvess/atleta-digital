package com.atletaoficial.atletadigitalbackend.controller;

import com.atletaoficial.atletadigitalbackend.dto.request.PerfilSocialFamiliarRequest;
import com.atletaoficial.atletadigitalbackend.dto.response.PerfilSocialFamiliarResponse;
import com.atletaoficial.atletadigitalbackend.service.PerfilSocialFamiliarService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/perfil-social-familiar")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PerfilSocialFamiliarController {

    private final PerfilSocialFamiliarService service;

    @PostMapping("/cadastrar")
    public ResponseEntity<PerfilSocialFamiliarResponse> cadastrar(@RequestBody @Valid PerfilSocialFamiliarRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.cadastrar(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PerfilSocialFamiliarResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/atleta/{atletaId}")
    public ResponseEntity<PerfilSocialFamiliarResponse> buscarPorAtleta(@PathVariable Long atletaId) {
        return ResponseEntity.ok(service.buscarPorAtleta(atletaId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        service.inativar(id);
        return ResponseEntity.noContent().build();
    }
}
