package com.atletaoficial.atletadigitalbackend.repository;

import com.atletaoficial.atletadigitalbackend.entity.ContratoFinanceiro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContratoFinanceiroRepository extends JpaRepository<ContratoFinanceiro, Long> {
    Optional<ContratoFinanceiro> findByAtletaId(Long atletaId);
}
