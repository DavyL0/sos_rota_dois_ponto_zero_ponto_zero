package com.mhd.sosrota.model.dto.ambulancia;

import com.mhd.sosrota.model.enums.StatusAmbulancia;
import com.mhd.sosrota.model.enums.TipoAmbulancia;
import jakarta.validation.constraints.Pattern;

public record AmbulanciaCadastroDTO(
        @Pattern(regexp = "^[A-Z]{3}[0-9][A-Z][0-9]{2}$", message = "A placa deve seguir o formato ABC1D23")
        String placa,
        StatusAmbulancia status,
        TipoAmbulancia tipo,
        Long bairroId
) {
}
