package com.atletaoficial.atletadigitalbackend.repository;

import com.atletaoficial.atletadigitalbackend.entity.AcompanhamentoBimestral;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AcompanhamentoBimestralRepository extends JpaRepository<AcompanhamentoBimestral, Long> {
    List<AcompanhamentoBimestral> findAllByMatriculaIdOrderByBimestreAsc(Long matriculaId);
}
