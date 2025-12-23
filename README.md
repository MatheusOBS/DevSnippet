<div align="center">
  <img width="800" alt="DevSnippet Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
  <h1>🚀 DevSnippet</h1>
  <p><strong>Transforme sua produtividade com um gerenciador de snippets inteligente.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
    <img src="https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
    <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img src="https://img.shields.io/badge/Google-Gemini-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white" />
  </p>
</div>

---

## 🌟 Visão Geral

O **DevSnippet** é uma plataforma moderna projetada para desenvolvedores que desejam organizar, compartilhar e aprimorar seus fragmentos de código. Com integração nativa ao **Google Gemini AI**, o projeto vai além de um simples repositório, oferecendo explicações técnicas e geração automática de código.

## ✨ Funcionalidades Principais

- **🤖 Magic Compose (IA):** Gere snippets complexos a partir de descrições em linguagem natural.
- **🧠 Análise Técnica:** Obtenha explicações detalhadas sobre o funcionamento de qualquer snippet via IA.
- **📊 Dashboard Analytics:** Acompanhe estatísticas de uso, linguagens mais utilizadas e heatmap de contribuições.
- **📱 Design Premium:** Interface ultra-responsiva com suporte nativo a Dark Mode e efeitos de Glassmorphism.
- **🔍 Filtros Avançados:** Organize por categorias, favoritos, fixados ou busca textual instantânea.
- **📸 Screenshot Dinâmico:** Gere imagens formatadas dos seus snippets para compartilhar em redes sociais.

## 🛠️ Tecnologias Utilizadas

- **Core:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (via CDN configurado)
- **AI Engine:** Google Generative AI (Gemini 1.5 Flash)
- **Icons:** Google Material Symbols
- **Fonts:** Inter & Fira Code

## 🚀 Como Executar

### Pré-requisitos

- Node.js (v18+)
- Uma API Key do [Google AI Studio](https://aistudio.google.com/)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/MatheusOBS/DevSnippet.git
cd DevSnippet
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env.local` na raiz do projeto e adicione sua chave:
```env
GEMINI_API_KEY=sua_chave_aqui
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 📂 Estrutura do Projeto

```text
src/
├── components/     # Componentes reutilizáveis (Card, Header, etc.)
├── pages/          # Páginas principais (Dashboard, Editor)
├── types/          # Definições de tipos TypeScript
├── constants/      # Dados estáticos e configurações
├── App.tsx         # Componente raiz e roteamento
└── index.tsx       # Ponto de entrada
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
<p align="center">Desenvolvido com ☕ e ❤️ por <a href="https://github.com/MatheusOBS">MatheusOBS</a></p>
