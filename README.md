# robo-guia-recolhimento
Robo que preenche e gera PDFs automaticamente no site de Guia de Recolhimento do Banco do Brasil https://www45.bb.com.br/fmc/frm/fw0707314_1.jsp


POR PRECAUÇÃO:

**Instale o pacote web-streams para salvar os boletos em PDF:
npm install web-streams

**PARA MANIPULAR PLANILHAS:
npm install xlsx

======================================

Vá até Dados.js na linha 4 e edite o caminho da planilha do robo, geralmente é alterado antes de Projeto_Robo:
    vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
"C:\\Users\\Samuel\\Documents\\Projeto JS\\Robo\\Projeto_Robo\\testerobo.xltx"

Após fazer isso, vá ate App.js na linha 72 e altere o caminho que o pdf será salvo, lembrando que você estará livre para escolher qual o caminho, contanto que só modifique o que está antes de /${NumProc}-guia.pdf
vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
C:/Users/Samuel/Documents/Projeto JS/Robo/Guias/${NumProc}-guia.pdf


POR FIM no terminal do VSCode execute:

node App.js
