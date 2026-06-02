package com.mhd.sosrota.repository;

import com.mhd.sosrota.model.Atendimento;
import com.mhd.sosrota.model.enums.GravidadeOcorrencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 01/06/2026
 * @brief Interface AtendimentoRepository
 */
public interface AtendimentoRepository extends JpaRepository<Atendimento, Long> {
    boolean existsByAmbulanciaId(Long ambulanciaId);

    Optional<Atendimento> findByOcorrenciaId(Long ocorrenciaId);

    List<Atendimento> findByAmbulanciaId(Long ambulanciaId);

    // Relatório: Tempo médio por gravidade
    @Query(value = """
            SELECT AVG(DATEDIFF('SECOND', a.data_hora_despacho, a.data_hora_chegada))
            FROM atendimentos a
            JOIN ocorrencias o ON o.id_ocorrencia = a.ocorrencia_id
            WHERE o.gravidade = :gravidade
              AND a.data_hora_despacho IS NOT NULL
              AND a.data_hora_chegada IS NOT NULL
            """, nativeQuery = true)
    Double calculateTempoMedioRespostaByGravidade(GravidadeOcorrencia gravidade);

    @Query("SELECT a.ocorrencia.bairro.nome, COUNT(a.id) FROM Atendimento a GROUP BY a.ocorrencia.bairro.nome ORDER BY COUNT(a.id) DESC")
    List<Object[]> countAtendimentosByBairro();
}
