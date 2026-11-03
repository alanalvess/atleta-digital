package com.atletaoficial.atletadigitalbackend.repository;

import com.atletaoficial.atletadigitalbackend.entity.SessaoPsicologica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessaoPsicologicaRepository extends JpaRepository<SessaoPsicologica, Long> {
    List<SessaoPsicologica> findAllByAtletaIdOrderByDataSessaoDesc(Long atletaId);
}
