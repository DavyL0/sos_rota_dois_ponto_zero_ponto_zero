package com.mhd.sosrota.repository;

import com.mhd.sosrota.model.Ambulancia;
import com.mhd.sosrota.model.enums.StatusAmbulancia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 01/06/2026
 * @brief Interface AmbulanciaRepository
 */
public interface AmbulanciaRepository extends JpaRepository<Ambulancia, Long> {
    List<Ambulancia> findByStatus(StatusAmbulancia status);
}
