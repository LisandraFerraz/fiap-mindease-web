# MindEase Web

MindEase Web é uma aplicação front-end Angular para apoiar a gestão de bem-estar mental e produtividade, combinando recursos como atividades, registro de humor, checklist, kanban, pomodoro, notas adesivas e painel de acompanhamento.

## Estrutura do Projeto

- **src/app/pages** – principais telas (páginas) da aplicação:
  - `landing-page` (home + modal de autenticação)
  - `dashboard` (visão geral, widgets e gráficos)
  - `checklist` (listas de tarefas com seleção de cor)
  - `kanban` (quadro estilo kanban com modal de item)
  - `pomodoro` (timer de produtividade)
  - `sticky-notes` (notas adesivas)
  - `preferencias` (configurações de conta, interface, etc)
  - `not-found` (página 404)
- **src/app/notifications-modal** – componente modal para exibir notificações
- **src/shared** – componentes reutilizáveis (botões, cards, inputs, modais, etc)
- **src/shared/services/theme-service** – serviço para gerenciamento de tema (claro/escuro)
- **src/shared/styles** – temas e animações
- **src/shared/utils** – funções, modelos e tipos utilitários
- **src/core/env** – configuração de ambientes

## Tecnologias e bibliotecas principais

- **Angular 21** (core, router, forms, material)
- **Angular Material** (UI, layout, componentes)
- **Highcharts + highcharts-angular** (gráficos de evolução e estatísticas)
- **ngx-toastr** (notificações toast)
- **ngx-loading-bar** (barra de carregamento para requisições HTTP)
- **uuid** (geração de IDs)
- **json-server** (mock de API via `npm run start:mock`)

## Scripts úteis

- `npm start` – inicia a aplicação (`ng serve`)
- `npm run build` – gera build de produção
- `npm run watch` – build em modo watch para desenvolvimento
- `npm test` – executa testes (Angular)
- `npm run start:mock` – inicia mock API local em `http://localhost:3001`

## Rotas / Telas (Pages)

- **/** – Home (landing page)  
  Apresenta o app, chamadas para ação e modal de login/cadastro.

- **/login** – Login  
  Formulário de autenticação (e-mail e senha). Integração com backend para obtenção de token.

- **/register** – Cadastro  
  Criação de conta com validação de campos e confirmação de senha.

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

- **/settings** (se houver) – Configurações adicionais  
  Preferências de notificações, tema (claro/escuro) e privacidade.

- **/not-found** – Página 404  
  Exibida quando rota não encontrada.

## Componentes e Features Principais

- **Modais**: autenticação, notificações, edição de itens kanban.
- **Componentes reutilizáveis**: botões, inputs (texto, data, select), cards (kanban, todo, nota), sidenav.
- **Tema**: suporte a modo claro/escuro via `theme-service`.
- **Layout responsivo**: adaptado para desktop e mobile.
- **Feedback**: toasts de sucesso/erro e barra de carregamento em requisições HTTP.
- **Mock de backend**: `json-server` para desenvolvimento offline e testes.

---

### Como iniciar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie o servidor mock (opcional):

   ```bash
   npm run start:mock
   ```

3. Inicie a aplicação:
   ```bash
   npm start
   ```
