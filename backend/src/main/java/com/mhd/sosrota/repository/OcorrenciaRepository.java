package com.mhd.sosrota.repository;

import com.mhd.sosrota.model.Ocorrencia;
import com.mhd.sosrota.model.enums.StatusOcorrencia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.OffsetDateTime;
import java.util.List;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 01/06/2026
 * @brief Interface OcorrenciaRepository
 */
public interface OcorrenciaRepository extends JpaRepository<Ocorrencia, Long> {
    List<Ocorrencia> findByStatusOcorrencia(StatusOcorrencia status);

    List<Ocorrencia> findByTipoOcorrenciaContainingIgnoreCase(String tipo);

    List<Ocorrencia> findByDataHoraAberturaBetween(OffsetDateTime dataHoraAbertura, OffsetDateTime dataHoraAbertura2);
}
