package com.mhd.sosrota.controller;

import com.mhd.sosrota.model.Bairro;
import com.mhd.sosrota.service.BairrosService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/bairros")
public class BairrosController {
    BairrosService bairrosService;

    public BairrosController(BairrosService bairrosService) {
        this.bairrosService = bairrosService;
    }

    @GetMapping
    public ResponseEntity<Iterable<Bairro>> findAll() {
        return ResponseEntity.ok().body(bairrosService.findAll());
    }

    @GetMapping("/{id}")
    public Bairro findById(@PathVariable Long id) {
        return bairrosService.findById(id);
    }
}
