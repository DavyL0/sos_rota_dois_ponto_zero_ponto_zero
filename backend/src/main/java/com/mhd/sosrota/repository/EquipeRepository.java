package com.mhd.sosrota.repository;

import com.mhd.sosrota.model.Equipe;
import com.mhd.sosrota.model.enums.TipoAmbulancia;
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
 * @brief Interface EquipeRepository
 */
public interface EquipeRepository extends JpaRepository<Equipe, Long> {
    @Query("""
            SELECT DISTINCT e FROM Equipe e
            WHERE (:ativo IS NULL OR e.ativo = :ativo)
            AND (:tipo IS NULL OR e.ambulancia.tipoAmbulancia = :tipo)
            AND (:filtro IS NULL
                OR LOWER(e.ambulancia.placa) LIKE LOWER(CONCAT('%', :filtro, '%')))
            """)
    Page<Equipe> obterComFiltro(Pageable pageable,
                                @Param("filtro") String filtro,
                                @Param("ativo") Boolean ativo,
                                @Param("tipo") TipoAmbulancia tipo
    );

    boolean existsByAmbulanciaId(Long ambulanciaId);

    @Query("SELECT DISTINCT e FROM Equipe e JOIN e.profissionais p WHERE LOWER(p.nome) LIKE LOWER(CONCAT('%', :nome, '%'))")
    List<Equipe> findByNomeProfissional(String nome);

    boolean existsByAmbulanciaIdAndAtivoTrueAndIdNot(Long ambulanciaId, Long equipeIdIgnorada);
}
