# sgp_front
FRONT-END do sistema de gerenciamento de projetos em feiras científicas
# to open the image terminal
docker-compose run --rm app sh

# tu run the project
docker-compose up app

== configurando .env ==

para o primeiro acesso, copie o .env.example e mude: 
  -- VUE_APP_URL_API = http://localhost:80/api/
  -- VUE_APP_ENV = development

== PRIMEIRO ACESSO ==

PARA A PRIMEIRA EXECUÇÃO É NECESSÁRIO RODAR O COMANDO `npm i`, porém dentro do bash container do sgp_front.
  -- 1 =>  ENTRE NO BASH DO CONTAINER
    abra um terminal e execute `docker-compose run --rm app sh`
  -- 2 =>  DENTRO DO CONTAINER EXECUTE `npm i`
    lembre-se, o container irá carregar as imagens e ao fim, aparecerá o cursor e um # indicando que pode ser digitado, esse # indica o bash do container, é só executar o `npm i`
  -- 3 => saia do bash, digite `exit` e enter
  -- 4 => no diretório do projeto, execute o projeto
    `docker-compose up app`