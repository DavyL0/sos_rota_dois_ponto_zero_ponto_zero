package com.mhd.sosrota.model;

import com.mhd.sosrota.model.enums.StatusAmbulancia;
import com.mhd.sosrota.model.enums.TipoAmbulancia;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 01/06/2026
 * @brief Class Ambulancia
 */
@Entity
@Table(name = "ambulancias")
public class Ambulancia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ambulancia")
    private Long id;

    @Column(nullable = false, unique = true, length = 7)
    @Pattern(regexp = "^[A-Z]{3}[0-9][A-Z][0-9]{2}$", message = "A placa deve seguir o formato ABC1D23")
    private String placa;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    private TipoAmbulancia tipoAmbulancia;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusAmbulancia status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bairro_base_id", nullable = false)
    private Bairro bairroBase;

    public Ambulancia(StatusAmbulancia status, TipoAmbulancia tipoAmbulancia, String placa, Bairro bairroBase) {
        this.status = status;
        this.tipoAmbulancia = tipoAmbulancia;
        this.placa = placa;
        this.bairroBase = bairroBase;
    }

    public Ambulancia() {
    }

    public StatusAmbulancia getStatus() {
        return status;
    }

    public void setStatus(StatusAmbulancia statusAmbulancia) {
        this.status = statusAmbulancia;
    }

    public TipoAmbulancia getTipoAmbulancia() {
        return tipoAmbulancia;
    }

    public void setTipoAmbulancia(TipoAmbulancia tipoAmbulancia) {
        this.tipoAmbulancia = tipoAmbulancia;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Bairro getBairroBase() {
        return bairroBase;
    }

    public void setBairroBase(Bairro bairroBase) {
        this.bairroBase = bairroBase;
    }

    @Override
    public String toString() {
        return "Ambulancia{" +
                "id=" + id +
                ", placa='" + placa + '\'' +
                ", tipoAmbulancia=" + tipoAmbulancia +
                ", statusAmbulancia=" + status +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Ambulancia that)) return false;
        return id != null && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}
