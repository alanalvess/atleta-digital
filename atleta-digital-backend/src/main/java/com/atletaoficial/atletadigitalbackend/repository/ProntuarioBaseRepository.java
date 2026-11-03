package com.atletaoficial.atletadigitalbackend.repository;

import com.atletaoficial.atletadigitalbackend.entity.ProntuarioBase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProntuarioBaseRepository extends JpaRepository<ProntuarioBase, Long> {
    Optional<ProntuarioBase> findByAtletaId(Long atletaId);
}
