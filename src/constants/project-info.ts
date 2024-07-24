export const projectTitle: string = "Desafio Frontend 2024 - DPE-PR"

export const projectObjective: string = `Você terá que criar o frontend para apresentação de dados do Senado utilizando API aberta disponível em https://legis.senado.leg.br/dadosabertos/docs/index.html. O frontend deverá apresentar ao usuário as opções para consulta de blocos parlamentares e consulta de senadores.`

export const queryOptions: string[] = [
  "Consulta de blocos parlamentares",
  "Consulta de senadores",
]

export const queryDetailsTitle: string = "Consultas e Detalhes"

export const queryDetails: string[] = [
  "O frontend deverá listar dados do serviço BlocoParlamentarService, possibilitando utilização de filtros por partido, nome do bloco parlamentar e por data de criação (sendo possível utilização de um range de datas).",
  "Será um requisito a possibilidade de detalhar informações de um bloco parlamentar, sendo que neste caso poderá ser utilizado a api passando id do bloco como parâmetro (https://legis.senado.leg.br/dadosabertos/blocoParlamentar/{codigo}).",
  "Campos necessários no detalhe do bloco parlamentar: Sigla, Nome, Sigla Partido, Nome Partido, Data criação.",
  "A partir da página de detalhes do bloco parlamentar deverá ser possível listar os senadores vinculados.",
  "O frontend deverá listar dados do serviço ListaSenadorService (https://legis.senado.leg.br/dadosabertos/senador/lista/atual), possibilitando a utilização de busca por nome, bloco parlamentar e Estado (campo UfParlamentar).",
  "Será um requisito a possibilidade de detalhar informações de um bloco parlamentar, sendo que neste caso poderá ser utilizado a api passando id do bloco como parâmetro (https://legis.senado.leg.br/dadosabertos/senador/{codigo}).",
  "Campos necessários no detalhe do senador: Nome, Estado, Bloco Parlamentar, Foto, Email, Telefone, Link para página parlamentar.",
]

export const nonFunctionalRequirementsTitle: string =
  "Requisitos Não Funcionais"

export const nonFunctionalRequirements: string[] = [
  "Podman ou Docker, docker-compose",
  "Next JS",
  "Material UI para estilização e componentes de UI",
  "Material Icons para os ícones",
  "ESLint para análise estática de código",
  "Quaisquer outros serviços que julgar necessário para atender a alta demanda e garantir muito desempenho.",
  "Versionamento de código com Git",
  "Testes automatizados, unitários e de integração",
]

export const evaluationCriteria: string[] = [
  "Boas práticas de programação",
  "Performance",
  "Escalabilidade da solução",
  "Arquitetura adotada",
  "Design (não é fornecido um protótipo de tela, portanto, o candidato(a) é incentivado(a) a aplicar práticas criativas e eficientes de UX/UI na construção das telas).",
  "Todas as instruções no README.md para que seja possível rodar a aplicação",
  "Observações que julgar necessárias poderão ser incluídas no README.md",
  "O desafio deverá ser entregue em repositório privado do github com permissão de leitura para o usuário @defensoriapr",
]
