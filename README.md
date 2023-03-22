# Sobre
Essa biblioteca foi criada utilizando NodeJs e ela serve para testar e validar links a partir de um arquivo de texto.

# Como funciona:

- Crie um arquivo de texto, popule com algum texto que contenha links de sites e salve ele dentro da pasta "arquivos".

- Execute no terminal o comando **npm run cli** passando o caminho do arquivo.

- Se desejar apenas testar os links, então o comando acima irá bastar, porém, se desejar também validar e receber o retorno com o código e nome do status da requisição 
HTTPS, então é preciso passar a flag **-- --validar** ao final do comando.
