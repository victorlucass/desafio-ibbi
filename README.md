
### Descrição Informativa do Projeto: Controle de Vendas para E-commerce

#### Visão Geral
A aplicação desenvolvida serve como um controle de vendas para um e-commerce, permitindo a gestão eficiente de categorias e produtos, além de fornecer um ambiente de vendas e monitoramento de estoque e histórico de vendas. A seguir, detalharemos as funcionalidades principais da aplicação.

#### Funcionalidades

1. **Cadastro de Categoria**
   - Permite ao usuário informar a descrição da categoria que deseja cadastrar.

2. **Cadastro de Produtos**
   - **Descrição do Produto**: O usuário pode fornecer uma descrição detalhada do produto.
   - **Valor do Produto**: O valor é informado em reais.
   - **Categoria do Produto**: O usuário associa o produto a uma categoria previamente cadastrada.
   - **Quantidade em Estoque**: É possível informar a quantidade disponível em estoque.

3. **Telas da Aplicação**
   
   **1.1 Tela de Login**
   - O sistema permite que o usuário faça login inserindo suas credenciais.
   - Possui uma tela para cadastro de novos usuários.

   **1.2 Tela Principal**
   - Apresenta uma lista de produtos cadastrados pelo usuário em forma de card.
   - Cada card exibe a descrição, imagem do produto, quantidade disponível em estoque, valor em real e dólar, botão de compra e status do produto.
     - **Status do Produto**:
       - **Vermelho**: Quantidade disponível menor que a sugerida.
       - **Amarelo**: Diferença entre quantidade disponível e a sugerida é menor ou igual a 5.
       - **Verde**: Situação normal.
   - **Funcionalidades da Tela Principal**:
     - Filtro por categoria, com possibilidade de múltiplas seleções.
     - Input para buscar produtos por descrição.
     - Seleção de quantidade desejada antes de realizar a compra.
     - Produtos esgotados não aparecem na lista.

   **1.3 Dashboard**
   - Fornece controle sobre a quantidade de produtos em estoque e histórico de vendas.

     **Cards do Dashboard**:
     - **Histórico de Vendas**:
       - Mostra as 4 últimas vendas, com informações de data e hora, nome do usuário que cadastrou o produto e quantidade vendida.
       - Cada linha representa uma venda única, permitindo múltiplas entradas do mesmo produto.
     - **Venda por Categoria**:
       - Gráfico de donut apresentando as 3 categorias mais vendidas e a categoria "Outros" (soma das demais vendas).
     - **Venda por Produto**:
       - Ranking dos 10 produtos mais vendidos.

#### Considerações Técnicas
- Utilização de uma API pública para conversão do valor dos produtos de reais para dólares.
- Sistema de cores intuitivo para status de estoque, facilitando a visualização e gestão por parte do usuário.
- Filtros e buscas otimizados para facilitar a localização de produtos específicos.
- Histórico detalhado de vendas para monitoramento e análise de desempenho.

Esta aplicação se destaca pela interface intuitiva, funcionalidades abrangentes de gerenciamento e uma visão clara e detalhada das operações de vendas e estoque, tornando-se uma ferramenta valiosa para qualquer e-commerce.

# Aplicação de Controle de Vendas para E-commerce

Esta aplicação serve como um sistema de controle de vendas para uma plataforma de e-commerce, permitindo a gestão eficiente de categorias e produtos, além de fornecer um ambiente de vendas e monitoramento de estoque e histórico de vendas.

## Funcionalidades

- **Gestão de Categorias**
  - Cadastro de categorias com descrições.

- **Gestão de Produtos**
  - Cadastro de produtos com descrições, preços em BRL, categorias e quantidades em estoque.

- **Autenticação de Usuário**
  - Login e registro de usuários.

- **Listagem de Produtos**
  - Exibição de produtos em formato de card com detalhes como descrição, imagem, quantidade em estoque, preços em BRL e USD, botão de compra e indicador de status.

- **Dashboard**
  - Monitoramento de quantidades em estoque e histórico de vendas com diversas métricas e visualizações.

## Instruções de Configuração

### Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados na sua máquina.

## Serviços

- **mysql_service**
  - Serviço de banco de dados MySQL.

- **back_service**
  - Serviço de backend.

- **front_service**
  - Serviço de frontend.

### Estrutura de Diretórios

Organize seus arquivos da seguinte maneira:

```
project-root/
├── backend/
│   ├── Dockerfile
│   └── ... (outros arquivos de backend)
├── frontend/
│   ├── Dockerfile
│   └── ... (outros arquivos de frontend)
└── docker-compose.yml
```

### Passos para Subir os Serviços

1. **Navegue até o diretório raiz do projeto (onde o arquivo `docker-compose.yml` está localizado).**

2. **Construa e inicie os serviços (acima ⬆️):**

   ```sh
   docker-compose up --build <nome do serviço>
   ```

3. **Acesse os serviços:**
   - Frontend: `http://localhost:4200/login`
   - Backend: `http://localhost:8000/docs`

4. **Para parar os serviços:**

   ```sh
   docker-compose down
   ```

5. **Para rodar os serviços em segundo plano:**

   ```sh
   docker-compose up -d
   ```

## Conclusão

Essa configuração proporciona um ambiente robusto para desenvolvimento e testes da sua aplicação de controle de vendas para e-commerce utilizando Docker e Docker Compose. Aproveite para desenvolver e aprimorar sua aplicação!