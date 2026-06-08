package com.mhd.sosrota.controller;

import com.mhd.sosrota.model.dto.dashboard.DashboardDTO;
import com.mhd.sosrota.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 08/06/2026
 * @brief Controller do dashboard
 */
@RestController
@RequestMapping("api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public ResponseEntity<DashboardDTO> getDashboard() {
        return ResponseEntity.ok(dashboardService.gerarDashboard());
    }
}