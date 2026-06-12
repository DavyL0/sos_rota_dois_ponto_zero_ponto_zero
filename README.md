# 🚑 SosRota 2.0

**Sistema de Gerenciamento de Rota e Despacho de Ambulâncias**

SosRota é uma aplicação full-stack moderna para gerenciar ocorrências, despacho de ambulâncias e rotas de atendimento emergencial. Desenvolvida com **Spring Boot** no backend e **Angular** no frontend, oferece uma interface intuitiva para otimizar o gerenciamento de emergências médicas.

---

## ✨ Características

- 📊 **Dashboard de Ocorrências** - Visualize e gerencie ocorrências em tempo real
- 🚨 **Gerenciamento de Despacho** - Despache ambulâncias de forma otimizada
- 📈 **Relatórios Detalhados** - Geração de relatórios de atendimento
- ⏱️ **Monitoramento de SLA** - Acompanhamento de tempos de resposta
- 🗺️ **Gerenciamento de Rotas** - Otimização de rotas de ambulâncias
- 🔐 **Interface Segura** - Desenvolvido com boas práticas de segurança
- 🎨 **UI Moderna** - Interface responsiva com PrimeNG

---

## 🏗️ Arquitetura

```
sos_rota_dois_ponto_zero_ponto_zero/
├── backend/                    # API REST - Spring Boot
│   ├── src/main/java/
│   │   └── com/mhd/sosrota/
│   │       ├── SosRotaApplication.java
│   │       └── ...
│   └── src/test/
├── frontend/                   # Interface Web - Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── screens/        # Telas principais
│   │   │   │   ├── ocorrencias/
│   │   │   │   └── relatorios/
│   │   │   ├── component/      # Componentes reutilizáveis
│   │   │   ├── app.ts
│   │   │   └── app.config.ts
│   │   └── main.ts
│   └── package.json
└── README.md
```

---

## 🛠️ Stack Tecnológico

### Backend
- **Java 17+** com Spring Boot
- **Spring Data JPA** para persistência de dados
- **Spring Web** para API REST
- Testes com JUnit 5

### Frontend
- **Angular 21.2.7** - Framework principal
- **TypeScript** - Tipagem estática
- **PrimeNG** - Componentes UI avançados
- **Vitest** - Testes unitários
- **HTML5 & CSS3** - Markup e estilos

### Composição de Linguagens
- **Java**: 47.1%
- **TypeScript**: 31.3%
- **HTML**: 14.8%
- **CSS**: 6.8%

---

## 📋 Pré-requisitos

### Backend
- Java 17 ou superior
- Maven 3.8+
- MySQL ou banco de dados compatível

### Frontend
- Node.js 18+ e npm/yarn
- Angular CLI 21.2.7+

---

## 🚀 Como Executar

### Backend

1. **Navegue até o diretório backend:**
   ```bash
   cd backend
   ```

2. **Configure o banco de dados** (se necessário):
   - Edite `application.properties` ou `application.yml` com suas credenciais

3. **Execute a aplicação:**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

4. **A API estará disponível em:** `http://localhost:8080`

### Frontend

1. **Navegue até o diretório frontend:**
   ```bash
   cd frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run start
   # ou
   ng serve
   ```

4. **Abra o navegador e acesse:** `http://localhost:4200`

---

## 📦 Comandos Úteis

### Backend
```bash
# Compilar
mvn clean compile

# Executar testes
mvn test

# Gerar build de produção
mvn clean package

# Executar aplicação
mvn spring-boot:run
```

### Frontend
```bash
# Instalar dependências
npm install

# Desenvolvimento com hot-reload
ng serve

# Executar testes unitários
ng test

# Executar testes E2E
ng e2e

# Gerar build de produção
ng build --configuration production

# Gerar novo componente
ng generate component nome-do-componente

# Gerar novo serviço
ng generate service nome-do-servico
```

---

## 📄 Estrutura de Diretórios Frontend

```
frontend/src/
├── app/
│   ├── screens/
│   │   ├── ocorrencias/          # Tela de ocorrências
│   │   │   ├── ocorrencias.ts
│   │   │   ├── ocorrencias.html
│   │   │   ├── ocorrencias.css
│   │   │   └── ocorrencias.spec.ts
│   │   └── relatorios/           # Tela de relatórios
│   │       ├── relatorios.ts
│   │       ├── relatorios.html
│   │       ├── relatorios.css
│   │       └── relatorios.spec.ts
│   ├── component/
│   │   ├── sidebar/              # Barra lateral de navegação
│   │   └── ocorrencia-detalhes-component/
│   │       ├── ocorrencia-detalhes-component.ts
│   │       ├── ocorrencia-detalhes-component.html
│   │       └── ocorrencia-detalhes-component.spec.ts
│   ├── app.ts                    # Componente raiz
│   ├── app.html
│   ├── app.css
│   ├── app.config.ts             # Configuração da aplicação
│   ├── app.routes.ts             # Definição de rotas
│   └── app.spec.ts
├── theme/                        # Temas customizados
├── main.ts                       # Ponto de entrada
└── index.html
```

---

## 📊 Funcionalidades Principais

### Tela de Ocorrências
- Listagem de ocorrências com status
- Filtros e busca avançada
- Monitoramento de SLA em tempo real
- Detalhes da ocorrência em modal
- Informações da ambulância despachada

### Tela de Relatórios
- Geração de relatórios customizáveis
- Exportação de dados
- Análise de performance

### Gerenciamento de Ambulâncias
- Rastreamento de status
- Histórico de atendimentos
- Informações de rotas

---

## 🔒 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**Davy Lopes** - [@DavyL0](https://github.com/DavyL0)

---

## 📝 Changelog

Veja o arquivo [CHANGELOG.md](CHANGELOG.md) para histórico de versões e alterações.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📞 Suporte

Se você tiver dúvidas ou encontrar problemas, abra uma [issue](https://github.com/DavyL0/sos_rota_dois_ponto_zero_ponto_zero/issues) no repositório.

---

## 🗺️ Roadmap

- [ ] Integração com API de mapas (Google Maps/Leaflet)
- [ ] Sistema de notificações em tempo real
- [ ] Dashboard com gráficos de performance
- [ ] Autenticação e autorização
- [ ] Integração com banco de dados
- [ ] Containerização com Docker
- [ ] Deploy em produção

---

**Desenvolvido com ❤️ para melhorar o gerenciamento de emergências médicas**
