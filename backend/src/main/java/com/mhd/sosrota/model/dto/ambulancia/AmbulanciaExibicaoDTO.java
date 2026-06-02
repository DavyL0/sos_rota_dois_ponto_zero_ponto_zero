package com.mhd.sosrota.model.dto.ambulancia;

import com.mhd.sosrota.model.Ambulancia;
import com.mhd.sosrota.model.dto.bairro.BairroDTO;
import com.mhd.sosrota.model.enums.StatusAmbulancia;
import com.mhd.sosrota.model.enums.TipoAmbulancia;

public record AmbulanciaExibicaoDTO(
        Long id,
        String placa,
        TipoAmbulancia tipo,
        StatusAmbulancia status,
        BairroDTO bairro
) {
    public AmbulanciaExibicaoDTO(Ambulancia ambulancia) {
        this(
                ambulancia.getId(),
                ambulancia.getPlaca(),
                ambulancia.getTipoAmbulancia(),
                ambulancia.getStatus(),
                new BairroDTO(
                        ambulancia.getBairroBase().getId(),
                        ambulancia.getBairroBase().getNome()
                )
        );
    }
}
