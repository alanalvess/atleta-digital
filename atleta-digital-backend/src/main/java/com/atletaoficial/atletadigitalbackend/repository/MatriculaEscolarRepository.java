package com.atletaoficial.atletadigitalbackend.repository;

import com.atletaoficial.atletadigitalbackend.entity.MatriculaEscolar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatriculaEscolarRepository extends JpaRepository<MatriculaEscolar, Long> {
    List<MatriculaEscolar> findAllByAtletaId(Long atletaId);
}
