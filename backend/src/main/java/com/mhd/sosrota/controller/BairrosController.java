package com.mhd.sosrota.controller;

import com.mhd.sosrota.model.Bairro;
import com.mhd.sosrota.service.BairrosService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bairros")
public class BairrosController {

    BairrosService bairrosService;

    public BairrosController(BairrosService bairrosService) {
        this.bairrosService = bairrosService;
    }

    @RequestMapping
    public Iterable<Bairro> findAll() {
        return bairrosService.findAll();
    }

    @RequestMapping("/{id}")
    public Bairro findById(@PathVariable Long id) {
        return bairrosService.findById(id);
    }
}
