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
    Optional<Atendimento> findByOcorrenciaId(Long ocorrenciaId);

    List<Atendimento> findByAmbulanciaId(Long ambulanciaId);

    // Relatório: Tempo médio por gravidade
    @Query("SELECT AVG(FUNCTION('EXTRACT', EPOCH FROM (a.dataHoraChegada - a.dataHoraDespacho))) " +
            "FROM Atendimento a WHERE a.ocorrencia.gravidadeOcorrencia = :gravidade AND a.dataHoraChegada IS NOT NULL")
    Double calculateTempoMedioRespostaByGravidade(GravidadeOcorrencia gravidade);

    @Query("SELECT a.ocorrencia.bairro.nome, COUNT(a.id) FROM Atendimento a GROUP BY a.ocorrencia.bairro.nome ORDER BY COUNT(a.id) DESC")
    List<Object[]> countAtendimentosByBairro();
}
