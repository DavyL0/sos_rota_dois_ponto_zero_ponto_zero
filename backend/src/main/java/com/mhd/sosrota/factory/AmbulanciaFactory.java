package com.mhd.sosrota.factory;

import com.mhd.sosrota.model.Ambulancia;
import com.mhd.sosrota.model.Bairro;
import com.mhd.sosrota.model.enums.StatusAmbulancia;
import com.mhd.sosrota.model.enums.TipoAmbulancia;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 06/06/2026
 * @brief Fábrica de ambulâncias.
 */
public class AmbulanciaFactory {
    public static Ambulancia criarBasica(String placa, Bairro bairroBase) {
        return new Ambulancia(StatusAmbulancia.INATIVA, TipoAmbulancia.BASICA, placa, bairroBase);
    }

    public static Ambulancia criarUTI(String placa, Bairro bairroBase) {
        return new Ambulancia(StatusAmbulancia.INATIVA, TipoAmbulancia.UTI, placa, bairroBase);
    }

    public static Ambulancia criar(TipoAmbulancia tipo, String placa, Bairro bairroBase) {
        return switch (tipo) {
            case UTI -> criarUTI(placa, bairroBase);
            case BASICA -> criarBasica(placa, bairroBase);
        };
    }
}