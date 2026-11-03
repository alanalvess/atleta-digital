package com.atletaoficial.atletadigitalbackend.repository;

import com.atletaoficial.atletadigitalbackend.entity.PresencaTreino;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PresencaTreinoRepository extends JpaRepository<PresencaTreino, Long> {
    List<PresencaTreino> findAllBySessaoTreinoId(Long sessaoTreinoId);
    List<PresencaTreino> findAllByAtletaId(Long atletaId);

    // Essencial para evitar duplicidade caso o atleta passe a carteirinha duas vezes[cite: 3, 4]
    Optional<PresencaTreino> findByAtletaIdAndSessaoTreinoId(Long atletaId, Long sessaoTreinoId);
}
