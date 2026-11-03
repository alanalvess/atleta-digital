package com.atletaoficial.atletadigitalbackend.repository;

import com.atletaoficial.atletadigitalbackend.entity.ControleNegociacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ControleNegociacaoRepository extends JpaRepository<ControleNegociacao, Long> {
    List<ControleNegociacao> findAllByAtletaIdOrderByDataCriacaoDesc(Long atletaId);
    List<ControleNegociacao> findAllByStatus(String status);
}
