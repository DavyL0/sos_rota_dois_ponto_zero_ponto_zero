package com.mhd.sosrota.service;

import com.mhd.sosrota.consulta.FiltroAtendimento;
import com.mhd.sosrota.consulta.FiltroBase;
import com.mhd.sosrota.consulta.FiltroPorBairro;
import com.mhd.sosrota.consulta.FiltroPorGravidade;
import com.mhd.sosrota.consulta.FiltroPorStatus;
import com.mhd.sosrota.model.Atendimento;
import com.mhd.sosrota.model.dto.consulta.ConsultaFiltroDTO;
import com.mhd.sosrota.repository.AtendimentoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 07/06/2026
 * @brief Service de consulta avançada
 */
@Service
public class ConsultaAvancadaService {

    private final AtendimentoRepository atendimentoRepository;

    public ConsultaAvancadaService(AtendimentoRepository atendimentoRepository) {
        this.atendimentoRepository = atendimentoRepository;
    }

    public List<Atendimento> consultar(ConsultaFiltroDTO filtro) {
        List<Atendimento> todos = atendimentoRepository.findAll();

        FiltroAtendimento cadeia = new FiltroBase(todos);

        if (filtro.gravidade() != null) {
            cadeia = new FiltroPorGravidade(cadeia, filtro.gravidade());
        }
        if (filtro.bairro() != null && !filtro.bairro().isBlank()) {
            cadeia = new FiltroPorBairro(cadeia, filtro.bairro());
        }
        if (filtro.status() != null) {
            cadeia = new FiltroPorStatus(cadeia, filtro.status());
        }

        return cadeia.filtrar();
    }
}