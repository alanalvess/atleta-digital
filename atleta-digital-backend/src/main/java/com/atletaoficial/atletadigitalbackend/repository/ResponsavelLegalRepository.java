package com.atletaoficial.atletadigitalbackend.repository;

import com.atletaoficial.atletadigitalbackend.entity.ResponsavelLegal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResponsavelLegalRepository extends JpaRepository<ResponsavelLegal, Long> {
    Optional<ResponsavelLegal> findByAtletaId(Long atletaId);
    Optional<ResponsavelLegal> findByCpf(String cpf);
}
