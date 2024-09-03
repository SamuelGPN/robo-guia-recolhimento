const XLSX = require("xlsx");
const puppeteer = require("puppeteer");
const { ReadableStream } = require("web-streams");
global.ReadableStream = ReadableStream;
const inputs = require("./Elementos.js"); //importa o modulo Elementos.js com a função dado()
const { numCols, numRows, data } = require("./Dados.js");
const { timeout } = require("puppeteer");
const { RETRY_DELAY } = require("puppeteer");



(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 0 });
  const page = await browser.newPage();
  await page.goto("https://www45.bb.com.br/fmc/frm/fw0707314_1.jsp#");
  //for (let n = 0; n <= teste.numLinhas(); n++) {
  //  await page.type(dados.dado(n), teste.valCelulas());
  //}
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  
  console.log("numero de colunas " + numCols);
  for (let a = 1; a < numRows; a++) {
    //Cada repetição ele 'pula' de linha
    let NumProc = data[a][4] // Numero do processo que sera salvo o pdf, coluna 5 que no arry é 4
    console.log(NumProc)

    await page.goto("https://www45.bb.com.br/fmc/frm/fw0707314_1.jsp#"); //Site da Guia de recolhimento

    for (let b = 0; b < numCols; b++) {
      //Cada repetição ele 'pula' de coluna
      let celulas = data[a][b];
      let input = inputs.dado(b);
      //console.log(data[a][b])
      if (celulas === undefined) {
        await page.waitForSelector(`${input}`, { timeout: 10000 });
        await page.type(`${input}`, "");
      } else if (input == 'input[id="cod"]') {
        // PARA TRATAR A TABELA DO CÓDIGO
        await page.click(`${input}`); //clica no elemento 'cod'
        await page.evaluate((input, celulas) => {// Função para encontrar e clicar no elemento com onclick específico
          //O input e celulas ^^^^^ ^^^^^^^^ devem ser passadas para o page.evaluate pq o codigo dentro dele e executado dentro da pagina
          // Localiza o elemento com base no atributo onclick
          console.log(`${celulas}`)
          console.log(`${input}`);
          const elements = Array.from(document.querySelectorAll("a")); // Substitua o seletor 'a' se necessário
          const element = elements.find(
            (el) =>
              el.getAttribute("onclick") &&
              el.getAttribute("onclick").includes("mshowDropDown") &&
              el.getAttribute("onclick").includes(celulas) // Adicionar o this
          );
          if (element) {
            element.click();
          } else {
            console.error(
              "Elemento com o atributo onclick desejado não encontrado"
            );            
          }
        }, input, celulas ); //ao final da chamada de page.evaluate para garantir que essas variáveis sejam passadas para o contexto da página.
      }else{
        await page.click(`${input}`);
        await page.type(`${input}`, `${celulas}`);
      }
    }
    await page.keyboard.press("Tab");
    await page.click('input[name="Pb"]');

    console.log('ainda não!!!')
    //await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 20000 }); //Quando o slowMo estiver 0 recomendado
    await delay(1000)
    console.log('passou do fornavigation!!!')
    const savePath = `C:/Users/Samuel/Documents/Projeto JS/Robo/Guias/${NumProc}-guia.pdf`; //Local onde o pdf será salvo
    console.log('quaseeee!!!')
    await page.pdf({
      path: savePath, // Nome do arquivo PDF
      format: "A4", // Formato do papel
      printBackground: true, // Inclui o fundo da página no PDF
    });
    console.log('passsouuuu!!!')

  }  
})();
