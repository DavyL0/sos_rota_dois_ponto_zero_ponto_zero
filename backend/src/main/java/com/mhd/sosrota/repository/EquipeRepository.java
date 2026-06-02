package com.mhd.sosrota.repository;

import com.mhd.sosrota.model.Equipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 01/06/2026
 * @brief Interface EquipeRepository
 */
public interface EquipeRepository extends JpaRepository<Equipe, Long> {
    boolean existsByAmbulanciaId(Long ambulanciaId);

    @Query("SELECT DISTINCT e FROM Equipe e JOIN e.profissionais p WHERE LOWER(p.nome) LIKE LOWER(CONCAT('%', :nome, '%'))")
    List<Equipe> findByNomeProfissional(String nome);

    boolean existsByAmbulanciaIdAndAtivoTrueAndIdNot(Long ambulanciaId, Long equipeIdIgnorada);
}
