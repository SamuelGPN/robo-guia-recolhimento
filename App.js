const XLSX = require("xlsx");
const puppeteer = require("puppeteer");
const { ReadableStream } = require("web-streams");
global.ReadableStream = ReadableStream;
const inputs = require("./Elementos.js"); //importa o modulo Elementos.js com a função dado()
const { numCols, numRows, data } = require("./Dados.js");
const { timeout } = require("puppeteer");
const { RETRY_DELAY } = require("puppeteer");



(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 0});
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
    let NumProcUnic = data[a][10]
    console.log(NumProc)

    await page.goto("https://www45.bb.com.br/fmc/frm/fw0707314_1.jsp#"); //Site da Guia de recolhimento

    // O numCols -3 é pq terá duas coluna a mais com o numero do Processo unico
    for (let b = 0; b < numCols -3; b++) {
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
          )
          if (element) {
            element.click();
          } else {
            console.error(
              "Elemento com o atributo onclick desejado não encontrado"
            );            
          }
        }, input, celulas ); //ao final da chamada de page.evaluate para garantir que essas variáveis sejam passadas para o contexto da página.
      }else if(input == 'textarea[name="area1"]'){
        await page.click(`${input}`)
        await page.type(`${input}`, `${data[a][b+4]} \n\n${data[a][b+5]} X ${celulas} \n\nGUIA DESARQUIVAMENTO`)

      }else{
        await page.click(`${input}`);
        await page.type(`${input}`, `${celulas}`);
      }
      
    }
    console.log('quase')
    await page.keyboard.press("Tab");
    await page.click('input[name="Pb"]');

    console.log('ainda não!!!')
    //await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 20000 }); //Quando o slowMo estiver 0 recomendado
    await delay(1000)

    // Injetar texto azul no corpo da página
    await page.evaluate((NumProcUnic) => {
      console.log('NumProcUnic dentro do evaluate:', NumProcUnic); // Verifique se NumProcUnic está disponível
      const tbody = document.querySelectorAll('tbody')[1]; // Seleciona o primeiro <tbody> encontrado
      
      const h3 = document.createElement('h3'); // Cria uma nova célula
      h3.style.color = 'blue'; // Define a cor do texto como azul
      h3.textContent = NumProcUnic; // Define o texto da célula
      tbody.appendChild(h3); // Adiciona a linha ao <tbody>

    },NumProcUnic);

    console.log('passou do fornavigation!!!')
    const savePath = `C:/Users/Samuel/Documents/Projeto JS/Robo/Guias/${NumProcUnic}.pdf`; //Local onde o pdf será salvo
    console.log('quaseeee!!!')
    await page.pdf({
      path: savePath, // Nome do arquivo PDF
      format: "A4", // Formato do papel
      printBackground: true, // Inclui o fundo da página no PDF
    });
    console.log('passsouuuu!!!')

  } 
  await browser.close();
})();
