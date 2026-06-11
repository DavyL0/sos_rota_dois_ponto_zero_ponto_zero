package com.mhd.sosrota.model;

import java.util.*;

/**
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @author Hartur Sales Xavier <hartursalesxavier@gmail.com>
 * @date 05/06/2026
 * @brief Grafo de Cidália com Dijkstra.
 *
 */
public class GrafoCidade {

    private static GrafoCidade instance;

    private List<Bairro> bairros;
    private List<Rua> ruas;
    private transient Map<Bairro, List<Rua>> adjacencia;

    public GrafoCidade() {}

    public GrafoCidade(List<Bairro> bairros, List<Rua> ruas) {
        this.bairros = bairros;
        this.ruas = ruas;
        construirAdjacencia();
    }

    public static void setInstance(GrafoCidade grafo) {
        instance = grafo;
    }

    public static GrafoCidade getInstance() {
        if (instance == null) {
            throw new IllegalStateException(
                    "GrafoCidade ainda não foi inicializado. Aguarde o @PostConstruct do GrafoCidadeService.");
        }
        return instance;
    }

    public void construirAdjacencia() {
        this.adjacencia = new HashMap<>();
        for (Bairro b : bairros) {
            adjacencia.put(b, new ArrayList<>());
        }
        for (Rua rua : ruas) {
            adjacencia.computeIfAbsent(rua.getOrigem(), _ -> new ArrayList<>()).add(rua);
            adjacencia.computeIfAbsent(rua.getDestino(), _ -> new ArrayList<>()).add(rua);
        }
    }

    public Map<Bairro, Double> calcularDistanciasParaTodos(Bairro origem) {
        Map<Bairro, Double> distancias = new HashMap<>();
        Set<Bairro> visitados = new HashSet<>();
        PriorityQueue<NoDijkstra> filaPrioridade = new PriorityQueue<>();

        for (Bairro b : bairros) {
            distancias.put(b, Double.POSITIVE_INFINITY);
        }
        distancias.put(origem, 0.0);
        filaPrioridade.add(new NoDijkstra(origem, 0.0));

        while (!filaPrioridade.isEmpty()) {
            NoDijkstra atualNo = filaPrioridade.poll();
            Bairro atual = atualNo.bairro;

            if (visitados.contains(atual)) continue;
            visitados.add(atual);

            List<Rua> ruasSaida = adjacencia.getOrDefault(atual, Collections.emptyList());
            for (Rua rua : ruasSaida) {
                Bairro vizinho = rua.getOrigem().equals(atual) ? rua.getDestino() : rua.getOrigem();
                if (!visitados.contains(vizinho)) {
                    double novaDist = distancias.get(atual) + rua.getDistanciaKm();
                    if (novaDist < distancias.get(vizinho)) {
                        distancias.put(vizinho, novaDist);
                        filaPrioridade.add(new NoDijkstra(vizinho, novaDist));
                    }
                }
            }
        }
        return distancias;
    }

    public List<Bairro> getBairros() { return bairros; }
    public void setBairros(List<Bairro> bairros) { this.bairros = bairros; }
    public List<Rua> getRuas() { return ruas; }
    public void setRuas(List<Rua> ruas) { this.ruas = ruas; }

    private static class NoDijkstra implements Comparable<NoDijkstra> {
        Bairro bairro;
        double distancia;

        public NoDijkstra(Bairro bairro, double distancia) {
            this.bairro = bairro;
            this.distancia = distancia;
        }

        @Override
        public int compareTo(NoDijkstra outro) {
            return Double.compare(this.distancia, outro.distancia);
        }
    }
}