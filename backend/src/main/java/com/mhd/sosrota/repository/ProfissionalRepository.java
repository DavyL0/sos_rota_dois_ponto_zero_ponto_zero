package com.mhd.sosrota.repository;

import com.mhd.sosrota.model.Profissional;
import com.mhd.sosrota.model.enums.FuncaoProfissional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 01/06/2026
 * @brief Interface ProfissionalRepository
 */
public interface ProfissionalRepository extends JpaRepository<Profissional, Long> {
    @Query("""
            SELECT p FROM Profissional p
            WHERE (:filtro IS NULL
            OR LOWER(p.nome) LIKE LOWER(CONCAT('%', :filtro, '%')))
            """)
    Page<Profissional> obterComFiltro(Pageable pageable, @Param("filtro") String filtro);

    boolean existsByNome(String nome);

    List<Profissional> findByFuncaoProfissionalOrderByNomeAsc(FuncaoProfissional funcao);

    List<Profissional> findByAtivoTrueAndEquipeIsNull();
}
