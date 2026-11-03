package com.atletaoficial.atletadigitalbackend.repository;

import com.atletaoficial.atletadigitalbackend.entity.TransicaoCategoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransicaoCategoriaRepository extends JpaRepository<TransicaoCategoria, Long> {
    List<TransicaoCategoria> findAllByAtletaIdOrderByDataTransicaoDesc(Long atletaId);
}
