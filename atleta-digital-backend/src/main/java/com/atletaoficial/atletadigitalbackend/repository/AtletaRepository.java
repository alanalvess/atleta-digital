package com.atletaoficial.atletadigitalbackend.repository;

import com.atletaoficial.atletadigitalbackend.entity.Atleta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AtletaRepository extends JpaRepository<Atleta, Long> {
    List<Atleta> findAllByNomeCompletoContainingIgnoreCase(String nomeCompleto);
    Optional<Atleta> findByCpf(String cpf);
    List<Atleta> findAllByEquipeId(Long equipeId);
}