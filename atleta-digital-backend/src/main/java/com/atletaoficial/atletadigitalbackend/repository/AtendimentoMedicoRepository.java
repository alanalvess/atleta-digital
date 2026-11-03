package com.atletaoficial.atletadigitalbackend.repository;

import com.atletaoficial.atletadigitalbackend.entity.AtendimentoMedico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AtendimentoMedicoRepository extends JpaRepository<AtendimentoMedico, Long> {
    List<AtendimentoMedico> findAllByAtletaIdOrderByDataAtendimentoDesc(Long atletaId);
}
