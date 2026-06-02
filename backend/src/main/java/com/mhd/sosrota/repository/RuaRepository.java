package com.mhd.sosrota.repository;

import com.mhd.sosrota.model.Rua;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 01/06/2026
 * @brief Interface RuaRepository
 */
public interface RuaRepository extends JpaRepository<Rua, Long> {
    @Query("SELECT DISTINCT r FROM Rua r JOIN FETCH r.origem JOIN FETCH r.destino")
    List<Rua> findAllWithBairros();
}
