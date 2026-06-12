package com.mhd.sosrota.repository;

import com.mhd.sosrota.model.Bairro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 01/06/2026
 * @brief Interface BairroRepository
 */
public interface BairroRepository extends JpaRepository<Bairro, Long> {
    Optional<Bairro> findByNomeIgnoreCase(String nome);
}
