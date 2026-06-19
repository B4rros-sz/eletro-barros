# EletroBarros

Site institucional e catálogo de produtos elétricos criado com Next.js 16, React 19 e Tailwind CSS 4.

## Visão geral

`EletroBarros` é uma aplicação web de demonstração com foco em:
- Página inicial com hero visual e destaques de produtos
- Catálogo de produtos com filtros por categoria
- Carrinho/Orçamento para adicionar itens selecionados
- Página de serviços com apresentação detalhada
- Página de contato com formulário validado
- Design responsivo e estilo escuro moderno

## Recursos

- Navegação entre páginas: Home, Produtos, Serviços, Contato
- Lista de produtos com botão de adicionar à lista
- Filtro de categorias na página de produtos
- Carrossel de banners informativos
- Formulário de contato com validação de preenchimento e e-mail
- Contexto global de carrinho/ orçamento com visualização do número de itens
- Layout e tipografia otimizados para desktop e mobile

## Tecnologias

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI
- Embla Carousel
- lucide-react
- class-variance-authority
- shadcn

## Pré-requisitos

- Node.js 18 ou superior
- npm 10 ou superior

## Instalação

1. Clone o repositório:

```bash
git clone <URL-do-repositório>
cd eletro-barros
```

2. Instale as dependências:

```bash
npm install
```

## Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra `http://localhost:3000` no navegador para ver o site.

## Build e produção

Gerar build de produção:

```bash
npm run build
```

Executar a versão de produção:

```bash
npm run start
```

## Lint

Verifique o projeto com ESLint:

```bash
npm run lint
```

## Estrutura do projeto

- `src/app/` - rotas, layout global e páginas da aplicação
- `src/components/` - componentes visuais reutilizáveis
- `src/data/produtos.json` - dados de produtos exibidos no catálogo
- `src/lib/cart-context.tsx` - contexto global de carrinho/ orçamento
- `public/` - imagens e ativos estáticos
- `package.json` - dependências e scripts do projeto

## Páginas

- `/` - home com hero, produtos em destaque, carrossel e serviços
- `/produtos` - catálogo completo com filtros por categoria
- `/servicos` - apresentação dos serviços oferecidos
- `/contato` - formulário de contato com validação e feedback

## Como customizar

- Atualize a home em `src/app/page.tsx`
- Edite os produtos em `src/data/produtos.json`
- Altere a listagem e filtro em `src/components/produtos.tsx`
- Modifique os serviços em `src/components/servicos.tsx`
- Ajuste o formulário e mensagens em `src/app/contato/page.tsx`
- Personalize o header em `src/components/header.tsx`
- Atualize o footer em `src/components/footer.tsx`

## Notas importantes

- O formulário de contato atualmente simula o envio localmente e não envia dados para um servidor real.
- O carrinho de orçamento funciona com estado de contexto e atualiza o badge de itens automaticamente.
- As imagens usadas no site estão em `public/banners` e `public/produtos`.
- O design usa fontes do Google via `next/font/google` e temas escuros com transições suaves.

## Deploy

A aplicação é compatível com plataformas que suportam Next.js, como Vercel, Netlify ou qualquer serviço com suporte a Node.js.

Exemplo de deploy no Vercel:

1. Conecte o repositório ao Vercel.
2. Configure o comando de build: `npm run build`.
3. Configure o diretório de saída: `.` (pasta raiz do projeto).

## Contribuições

Contribuições são bem-vindas. Se quiser aprimorar este projeto:

1. Faça um fork.
2. Crie uma branch com a sua mudança.
3. Abra um pull request explicando as alterações.

---

Feito para demonstrar um site institucional de materiais elétricos com navegação moderna, visual escuro e experiência responsiva.
