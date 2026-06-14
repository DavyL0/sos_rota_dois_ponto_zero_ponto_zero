package com.mhd.sosrota.repository;

import com.mhd.sosrota.model.Ambulancia;
import com.mhd.sosrota.model.enums.StatusAmbulancia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 01/06/2026
 * @brief Interface AmbulanciaRepository
 */
@Repository
public interface AmbulanciaRepository extends JpaRepository<Ambulancia, Long> {
    @EntityGraph(attributePaths = {"bairroBase"})
    @Query("""
                SELECT a FROM Ambulancia a
                LEFT JOIN a.bairroBase b
                WHERE (:filtro IS NULL
                   OR LOWER(a.placa) LIKE LOWER(CONCAT('%', :filtro, '%'))
                   OR LOWER(b.nome) LIKE LOWER(CONCAT('%', :filtro, '%')))
            """)
    Page<Ambulancia> obterComFiltro(Pageable pageable, @Param("filtro") String filtro);

    List<Ambulancia> findByStatus(StatusAmbulancia status);

    @EntityGraph(attributePaths = {"bairroBase"})
    @Query("""
        SELECT a FROM Ambulancia a
        WHERE NOT EXISTS (SELECT e FROM Equipe e WHERE e.ambulancia = a)
        OR EXISTS (SELECT e2 FROM Equipe e2 WHERE e2.ambulancia = a AND e2.id = :equipeId)
        """)
    List<Ambulancia> findSemEquipe(@Param("equipeId") Long equipeId);

    boolean existsByPlaca(String placa);
}
