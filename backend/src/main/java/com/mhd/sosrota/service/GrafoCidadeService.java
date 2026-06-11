package com.mhd.sosrota.service;

import com.mhd.sosrota.model.Bairro;
import com.mhd.sosrota.model.GrafoCidade;
import com.mhd.sosrota.model.Rua;
import com.mhd.sosrota.repository.BairroRepository;
import com.mhd.sosrota.repository.RuaRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 05/06/2026
 * @brief Service do Grafo
 */
@Service
public class GrafoCidadeService {

    private final BairroRepository bairroRepository;
    private final RuaRepository ruaRepository;
    private GrafoCidade grafo;

    public GrafoCidadeService(BairroRepository bairroRepository, RuaRepository ruaRepository) {
        this.bairroRepository = bairroRepository;
        this.ruaRepository = ruaRepository;
    }

    @PostConstruct
    public void carregarGrafo() {
        List<Bairro> bairros = bairroRepository.findAll();
        List<Rua> ruas = ruaRepository.findAllWithBairros();
        this.grafo = new GrafoCidade(bairros, ruas);
        GrafoCidade.setInstance(this.grafo);
    }

    public GrafoCidade obterGrafo() {
        if (this.grafo == null) carregarGrafo();
        return this.grafo;
    }

    public List<Bairro> obterBairros() { return obterGrafo().getBairros(); }
    public List<Rua> obterRuas() { return obterGrafo().getRuas(); }
}