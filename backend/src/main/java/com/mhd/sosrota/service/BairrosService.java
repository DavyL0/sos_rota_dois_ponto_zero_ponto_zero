package com.mhd.sosrota.service;

import com.mhd.sosrota.repository.BairroRepository;
import org.springframework.stereotype.Service;

@Service
public class BairrosService {

    BairroRepository repository;

    public BairrosService(BairroRepository repository) {
        this.repository = repository;
    }

    public Iterable<com.mhd.sosrota.model.Bairro> findAll() {
        return repository.findAll();
    }

    public com.mhd.sosrota.model.Bairro findById(Long id) {
        return repository.findById(id).orElse(null);
    }
}
