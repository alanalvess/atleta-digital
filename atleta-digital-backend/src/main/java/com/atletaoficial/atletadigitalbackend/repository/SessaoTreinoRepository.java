package com.atletaoficial.atletadigitalbackend.repository;

import com.atletaoficial.atletadigitalbackend.entity.SessaoTreino;
import com.atletaoficial.atletadigitalbackend.enums.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessaoTreinoRepository extends JpaRepository<SessaoTreino, Long> {
    List<SessaoTreino> findAllByCategoriaOrderByDataTreinoDesc(Categoria categoria);
    List<SessaoTreino> findAllByTreinadorIdOrderByDataTreinoDesc(Long treinadorId);
}
