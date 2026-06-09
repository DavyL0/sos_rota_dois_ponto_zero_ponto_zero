package com.mhd.sosrota.repository;

import com.mhd.sosrota.model.Profissional;
import com.mhd.sosrota.model.enums.FuncaoProfissional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 01/06/2026
 * @brief Interface ProfissionalRepository
 */
public interface ProfissionalRepository extends JpaRepository<Profissional, Long> {
    boolean existsByNome(String nome);

    List<Profissional> findByFuncaoProfissionalOrderByNomeAsc(FuncaoProfissional funcao);

    List<Profissional> findByAtivoTrueAndEquipeIsNull();
}
