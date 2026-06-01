package com.mhd.sosrota.model.enums;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @author Hartur Sales <hartursalesxavier@gmail.com>
 * @date 01/06/2026
 * @brief Enum TipoAmbulancia
 */
public enum TipoAmbulancia {
    UTI("UTI"),
    BASICA("Basica");
    
    private final String descricao;

    TipoAmbulancia(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

    public static TipoAmbulancia fromDescricao(String descricao) {
        for (TipoAmbulancia tipo : TipoAmbulancia.values()) {
            if (tipo.getDescricao().equalsIgnoreCase(descricao)) {
                return tipo;
            }
        }
        throw new IllegalArgumentException("Tipo inválido: " + descricao);
    }
}
