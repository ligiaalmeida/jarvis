# J.A.R.V.I.S. Just A Rather Very Intelligent System

O Jarvis é um avançado dashboard que possibilita reunir e analisar dados entre máquinas, permitindo processos mais rápidos, mais flexíveis e mais eficientes para produção de alta qualidade a custos reduzidos. Além de promover o aumento de produtividade, nossa solução é capaz de prever possíveis falhas e paradas de máquinas, identificar padrões, e até mesmo mudar o comportamento da linha de produção para que os processos sejam mais produtivos e assertivos.
Este projeto foi inicializado com [Create React App](https://github.com/facebook/create-react-app).

## Comandos disponíveis

No diretório do projeto, você pode executar:

### Instalar as dependencias do projeto

```bash
npm run install
```

### Iniciar o projeto em desenvolvimento

```bash
npm run start
```

Executa o aplicativo no modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador.

A página será recarregada se você fizer edições.\
Você também verá quaisquer erros de lint no console.

### Executando testes no projeto

```bash
npm run test
```

Inicia o executor de teste no modo de observação interativo.\
Consulte a seção sobre [running tests](https://facebook.github.io/create-react-app/docs/running-tests) para obter mais informações.

### Gerando o build da aplicação

```bash
npm run build
```

Cria o aplicativo para produção na pasta `build`.\
Ele empacota corretamente o React no modo de produção e otimiza a compilação para obter o melhor desempenho.

A compilação é minificada e os nomes dos arquivos incluem os hashes.\
Seu aplicativo está pronto para ser implantado!

Consulte a seção sobre [deployment](https://facebook.github.io/create-react-app/docs/deployment) para obter mais informações.

### Ejetar o projeto

```bash
npm run eject
```

**Nota: esta é uma operação unidirecional. Depois de 'ejetar', você não pode voltar!**

Se você não estiver satisfeito com a ferramenta de construção e opções de configuração, você pode `ejetar` a qualquer momento. Este comando removerá a dependência de compilação única do seu projeto.

Em vez disso, ele copiará todos os arquivos de configuração e as dependências transitivas (webpack, Babel, ESLint, etc) diretamente para o seu projeto, para que você tenha controle total sobre eles. Todos os comandos, exceto `eject`, ainda funcionarão, mas apontarão para os scripts copiados para que você possa ajustá-los. Neste ponto, você está por conta própria.

Você nunca precisará usar `eject`. O conjunto de recursos selecionados é adequado para implantações pequenas e médias, e você não deve se sentir obrigado a usar esse recurso. No entanto, entendemos que esta ferramenta não seria útil se você não pudesse personalizá-la quando estivesse pronto para ela.

### Deploy com docker

Para levantar containers preparados para desenvolvimento utilize:

```bash
./run-app-deploy.sh --dev
```

Para levantar containers preparados para produção utilize:

```bash
./run-app-deploy.sh --prod
```

p.s: se você tiver problemas para executar o arquivo `run-app-deploy.sh` execute o seguinte comando:

```bash
chmod +x run-app-deploy.sh
```

## Saiba mais

Você pode aprender mais na [documentação do Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Para aprender React, confira a [React documentação](https://reactjs.org/).
