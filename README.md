### Código limpo
### Arquitetura limpa
### S.O.L.I.D

## Responsabilidades
### Repository - Repositories são responsáveis somente por ter contato com o banco de dados.

## Routes -> Repositories
### As rotas não precisão saber oque á dentro do category model. As rotas devem ter acesso somente ao que o repository precisara de dados para executar o metodo create e o repository tera acesso ao model pois é lá que contem oque é necessário para inserir os dados no banco de dados.


## DTO (Data Transfer Object)
### É um conceito de criar um objeto que será responavel por fazer a transferencia de dados entre classes. Ao criar um DTO é interresante separalo em um pasta. Devemos usar o DTO quando queremos passar dados de uma classe para a outra, por exemplo, categories.routes.ts não é uma classe porem é uma camada então ao passar os dados para o repository devemos utilizar um DTO. caso seja necessario criar um interface para tipar os dados que vem no compor da requisição então não é utilizado DTO mas sim um interface simples.

### DTO é responsavel por dizer quais dados o routes tera acesso?

# S.O.L.I.D

## S - Princípio da responsabilidade única
## O - Princípio aberto/fechado
## L - Princípio de substituição de Liskov
## I - Princípio da segregação de interface
## D - Princípio da inversão de dependência
