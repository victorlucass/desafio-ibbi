
# FullStack -Sistema de Estoque / Compra de produtos. 
## Controle de estoque de produtos


> Aplicação funciona como um controle de vendas para um e-commerce.
Na aplicação é possível:

 - Cadastrar categoria:
 - Informar descrição da categoria.
 - Cadastrar produtos.
 -  Informar descrição do produto.
 - Informar valor do produto em real.
 - Informar categoria do produto.
 -  Informar quantidade em estoque.

1. Telas
1.1 Tela de Login
O sistema permite que o usuário faça login na aplicação inserindo suas credenciais.
Há também uma tela para cadastro de usuário.
1.2 Tela Principal
Tela principal onde mostra uma lista contendo todos os
produtos cadastrados pelo usuário em forma de card. Cada card, apresenta a descrição,
imagem do produto, quantidade disponível em estoque, o valor do produto, tanto em real
quanto em dólar (Utilizei uma API pública para buscar a cotação do dólar e converter o valor
corretamente), um botão para o usuário comprar o produto e o status do produto. O status
do produto tem a seguinte representação em cores:
● Vermelho - Se a quantidade disponível em estoque for menor que o sugerido;
● Amarelo - Se a diferença entre a quantidade disponível e o valor sugerido for <=5;
● Verde - Caso contrário.
A tela ainda possui:
● Um filtro por categoria. Sendo possível filtrar por mais de 1 categoria;
● Um input para buscar produtos por descrição;
● Caso o usuário deseje comprar um determinado produto, o usuário deve selecionar a
quantidade que deseja antes de realizar a compra.
● Caso o usuário compre todas as unidades em estoque, o produto não aparece na lista.

1.3 Dashboard
Dashboard para controle da quantidade de produtos em estoque e histórico de vendas.

Informações sobre cada card do Dashboard:

1. Histórico de vendas - Neste card deve é mostrado as 4 últimas vendas no site,
mostrando informação de data e hora, nome do usuário que cadastrou o produto no
site e a quantidade vendida do produto. Cada linha neste card é uma única venda,
então se um determinado usuário vendeu o mesmo produto mais de uma vez, ele
pode aparecer em mais de uma linha no card.
2. Venda por categoria - Este card contém um gráfico de donut possuindo 4
informações: as 3 categorias mais vendidas e “outros” (que seria o somatório de
vendas de todas as outras categorias).
3. Venda por produto - Este card contém um ranking dos 10 produtos mais
vendidos.

# Orientações

<details>
  <summary><strong>🐳 Rodando no Docker</strong></summary>

  ### 👉 Com Docker

**:warning: Antes de começar, seu docker-compose precisa estar na versão v2.5 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `2.5.0`.**

> :information_source: Rode os serviços `mysql_service` e `back_service` e `front_service`  com o comando `docker-compose up -d` na raiz do projeto.

- Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`);
- Esses serviços irão inicializar um container chamado `estoque_db`, `estoque_back`  e outro chamado `estoque_front`;
 Lembre-se de liberar a porta padrão (`4200`) do Angular para o frontend;

 - A partir daqui você pode abrir: `http://localhost:8000/docs` a documentação da API no Swagger UI.
 - Acessar `http://localhost:4200/login` para ir para o frontend da aplicação.

 O banco já vem populado com alguns usuários, categorias, produtos e vendas.

 Abaixo os usuários para se testar login:
 
 ```
 [
	{
		"id" : 1,
		"usuario" : "admin",
		"senha" : "admin"
	},
	{
		"id" : 2,
		"usuario" : "user",
		"senha" : "user"
	},
	{
		"id" : 3,
		"usuario" : "oppenheimer",
		"senha" : "oppenheimer"
	},
	{
		"id" : 4,
		"usuario" : "barbie",
		"senha" : "barbie"
	},
	{
		"id" : 5,
		"usuario" : "oppenbarbie",
		"senha" : "oppenbarbie"
	}
]
 ``` 


