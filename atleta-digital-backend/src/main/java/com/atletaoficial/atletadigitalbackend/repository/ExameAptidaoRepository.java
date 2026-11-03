package com.atletaoficial.atletadigitalbackend.repository;

import com.atletaoficial.atletadigitalbackend.entity.ExameAptidao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExameAptidaoRepository extends JpaRepository<ExameAptidao, Long> {
    List<ExameAptidao> findAllByAtletaIdOrderByDataExameDesc(Long atletaId);
}
