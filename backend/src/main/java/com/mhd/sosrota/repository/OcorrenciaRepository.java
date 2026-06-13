package com.mhd.sosrota.repository;

import com.mhd.sosrota.model.Ocorrencia;
import com.mhd.sosrota.model.enums.GravidadeOcorrencia;
import com.mhd.sosrota.model.enums.StatusOcorrencia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.OffsetDateTime;
import java.util.List;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 01/06/2026
 * @brief Interface OcorrenciaRepository
 */
public interface OcorrenciaRepository extends JpaRepository<Ocorrencia, Long> {
    @Query("""
            SELECT o FROM Ocorrencia o
            WHERE (:gravidade IS NULL OR o.gravidadeOcorrencia = :gravidade)
            AND (:bairroId IS NULL OR o.bairro.id = :bairroId)
            AND (:status IS NULL OR o.statusOcorrencia = :status)
            """)
    Page<Ocorrencia> findComFiltro(
            Pageable pageable,
            @Param("gravidade") GravidadeOcorrencia gravidade,
            @Param("bairroId") Long bairroId,
            @Param("status") StatusOcorrencia status
    );

    List<Ocorrencia> findByStatusOcorrencia(StatusOcorrencia status);

    List<Ocorrencia> findByTipoOcorrenciaContainingIgnoreCase(String tipo);

    List<Ocorrencia> findByDataHoraAberturaBetween(OffsetDateTime dataHoraAbertura, OffsetDateTime dataHoraAbertura2);
}
