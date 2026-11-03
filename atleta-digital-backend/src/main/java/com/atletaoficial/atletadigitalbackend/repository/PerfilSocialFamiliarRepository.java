package com.atletaoficial.atletadigitalbackend.repository;

import com.atletaoficial.atletadigitalbackend.entity.PerfilSocialFamiliar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PerfilSocialFamiliarRepository extends JpaRepository<PerfilSocialFamiliar, Long> {
    Optional<PerfilSocialFamiliar> findByAtletaId(Long atletaId);
}
