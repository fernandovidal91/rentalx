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
### Se você tem uma classe S e essa classe é um subtipo de T então todos os objetos de tipo T dentro de um programa eles podem ser substituidos pelos objetos do tipo S sem que seja necessário alterar as propriedades deste programa.

### Pra criar um sistema de software partes intercanbiaveis elas devem aderir a um contrato que permita que elas sejam substituidas umas pelas outras sem que aja impacto no sistema.

### PostgresCategoriesRepository implementa ICategoriesRepository. PostgresCategoriesRepository é um subtipo de ICategoriesRepository

```
import { Category } from '../model/Category';

interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create(name: string, description: string): void;
}

export { ICategoriesRepository };
```
```
import { Category } from '../model/Category';
import { ICategoriesRepository } from './ICategoriesRepository';

class PostgresCategoriesRepository implements ICategoriesRepository {
  findByName(name: string): Category {
    console.log(name);
    return null;
  }

  list(): Category[] {
    console.log('lista');
    return null;
  }

  create(name: string, description: string): void {
    console.log(name, description);
    return null;
  }
}

export { PostgresCategoriesRepository };
```

```
import { Category } from '../model/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from './ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO): void {

  }

  list(): Category[] {

  }

  findByName(name: string): Category {

  }
}

export { CategoriesRepository };

```

### Tanto a classe PostgresCategoriesRepository quanto a classe CategoriesRepository são subtipos de ICategoriesRepository.
### Agora no service se chamar a contante de `new PostgresCategoriesRepository()` ou de `new CategoriesRepository()` continua funcionando.

## D - Princípio da inversão de dependência
### O código que implementa uma pólitica de alto nível não deve depender do código que implementa detalhes de baixo nível.
### Exemplo a classe `CreateCategoryService` instancia a classe `categoriesRepository`. A inversão de dependendia diria para que ao inves do `CreateCategoryService` ter a depêndencia de fazer a instancia da classe isso seria invertido para quem chamar o `CreateCategoryService` ter a responsabilidade de fazer a instancia da classe
```
  // Antes

  execute({ name, descrption }: IRequest) {
    const categoriesRepository = new CategoriesRepository();

    const categoryAlreadyExists = categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Category already exists');
    }

    categoriesRepository.create({ name, description });
  }
```

```
  // Depois

  // rota
  categoriesRoutes.post('/', (req, res) => {
    const { name, description } = req.body;

    const createCategoryService = new CreateCategoryService(categoriesRepository);

    createCategoryService.execute({ name, description });

    return res.status(201).send();
  });

  // Classe do service
  class CreateCategoryService {
  private categoriesRepository: CategoriesRepository;

  constructor(categoriesRepository: CategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Category already exists');
    }

    this.categoriesRepository.create({ name, description });
  }
}
```

1. Controllers
São responsáveis pelo recebimento e retorno das requisições e delegação dos dados recebidos.

2. Services/UseCases
São responsáveis pelas regras de negócio, lançamento de exceções.

3. Repositories
São responsáveis pelas implementações concretas, sejam utilizados em memória, sejam utilizando o typeorm.

# Rotas -> Service -> Repository

## O service não deve conhecer o tipo do repository
## Service = auto nível (Uma das ultimas camadas da aplicação).
## Rotas = Baixo nível pois estão mais proximas do contato com o usuário

## Auto nível = é a camada que está mais próxima do domínio
## Baixo nível = é o que está mais perto do usuário

## Contrato = Interface de uma classe (diz quais metodos ela tem)

## A responsabilidade de um arquivo de rota
### É ele receber uma requisição e repassar sem precisar chamando nada.

## UseCases
### São as operações que estamos fazendo (regra de negócio da aplicação).

# Singleton Pattern
### Deve existir apenas uma instancia de uma classe que deve ser global

# Create Migration

```
yarn typeorm migration:create -n migrationName
```

# Rodar uma migration

```
yarn typeorm migration:run
```

# Reverter uma migration

```
yarn typeorm migration:revert
```
