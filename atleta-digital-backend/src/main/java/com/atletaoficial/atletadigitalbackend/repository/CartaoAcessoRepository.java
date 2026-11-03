package com.atletaoficial.atletadigitalbackend.repository;

import com.atletaoficial.atletadigitalbackend.entity.CartaoAcesso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CartaoAcessoRepository extends JpaRepository<CartaoAcesso, Long> {
    Optional<CartaoAcesso> findByUidIgnoreCase(String uid);
    Optional<CartaoAcesso> findByAtletaId(Long atletaId);
}
