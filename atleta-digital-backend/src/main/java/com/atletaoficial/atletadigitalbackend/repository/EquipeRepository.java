package com.atletaoficial.atletadigitalbackend.repository;

import com.atletaoficial.atletadigitalbackend.entity.Equipe;
import com.atletaoficial.atletadigitalbackend.enums.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EquipeRepository extends JpaRepository<Equipe, Long> {
    List<Equipe> findAllByTemporada(String temporada);
    List<Equipe> findAllByCategoria(Categoria categoria);

}
