package com.mhd.sosrota.consulta;

import com.mhd.sosrota.model.Atendimento;

import java.util.List;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 07/06/2026
 * @brief Interface base do padrão Decorator de filtros.
  */
public interface FiltroAtendimento {
    List<Atendimento> filtrar();
}