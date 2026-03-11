# MindEase Web

MindEase Web é uma aplicação front-end em Angular para apoiar a gestão acadêmica e profissional de pessoas neurodivergentes e/ou com desafios de processamento cognitivo e produtividade, combinando recursos como checklist, kanban, pomodoro, notas adesivas e painel de acompanhamento.

## Estrutura do Projeto

- **src/app/pages** – principais telas (páginas) da aplicação:
  - `landing-page` (home + modal de autenticação)
  - `dashboard` (visão geral, widgets e gráficos)
  - `checklist` (listas de tarefas com agrupamento, visualização de progresso e seleção de cor)
  - `kanban` (quadro de tarefas ordenadas por status)
  - `pomodoro` (timer de produtividade)
  - `sticky-notes` (notas adesivas com agrupamento)
  - `preferencias` (configurações de conta, interface, etc)
  - `not-found` (página 404)
- **src/app/notifications-modal** – componente modal para exibir notificações
- **src/shared** – componentes reutilizáveis (botões, cards, inputs, modais, etc)
- **src/shared/services/theme-service** – serviço para gerenciamento de tema (claro/escuro) e tamanho de textos
- **src/shared/styles** – temas e animações
- **src/shared/utils** – funções, modelos e tipos utilitários
- **src/core/env** – configuração de ambientes

## Tecnologias e bibliotecas principais

- **Angular 21** (core, router, forms, material)
- **Angular Material** (UI, layout, componentes)
- **Jest** (testes unitários)
- **Highcharts + highcharts-angular** (gráficos de evolução e estatísticas)
- **ngx-toastr** (notificações toast)
- **ngx-loading-bar** (barra de carregamento para requisições HTTP)
- **uuid** (geração de IDs)

## Scripts úteis

- `npm start` – inicia a aplicação (`ng serve`)
- `npm run build` – gera build de produção
- `npm run watch` – build em modo watch para desenvolvimento
- `npm test` – executa testes (Angular)

## Rotas / Telas (Pages)

- **/** – Home (landing page)  
  Apresenta o app, chamadas para ação e modal de login/cadastro.

- **/dashboard** – Painel Principal  
  Visão geral do usuário (estatísticas, cards, gráficos, atalhos para ferramentas).

- **/checklist** – Checklist  
  Listas de tarefas com seleção de cores e itens marcáveis.

- **/kanban** – Kanban  
  Quadro de tarefas com colunas e modal para edição/criação de itens.

- **/pomodoro** – Pomodoro  
  Timer de produtividade com ciclos de foco e descanso.

- **/sticky-notes** – Notas Adesivas  
  Painel de notas rápidas com edição e organização.

- **/preferences** – Preferências  
  Configurações de conta (conta-options) e interface (interface-options), com templates reutilizáveis.

- **/not-found** – Página 404  
  Exibida quando rota não encontrada.

## Componentes e Features Principais

- **Modais**: autenticação, notificações, edição de itens kanban.
- **Componentes reutilizáveis**: botões, inputs (texto, data, select), cards (kanban, todo, nota), sidenav.
- **Tema**: suporte a modo claro/escuro via `theme-service`.
- **Layout responsivo**: adaptado para desktop e mobile.
- **Feedback**: toasts de sucesso/erro e barra de carregamento em requisições HTTP.
- **Integração com API**: dados informados nas ferramentas são salvos e é possível visualizar em ambos os Front-ends (WEB e Mobile)
- **CI/CD**: verificação de testes para merge na branch principal e deploy.

---

### Como iniciar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie a aplicação:
   ```bash
   ng serve
   ```
3. Acesse a aplicação em localhost:4200
