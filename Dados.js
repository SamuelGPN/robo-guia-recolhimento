const XLSX = require("xlsx");

const workbook = XLSX.readFile(
  "C:\\Users\\Samuel\\Documents\\Projeto JS\\Robo\\Projeto_Robo\\testerobo.xltx"
);
const sheetName = workbook.SheetNames[0]; // Nome da primeira aba
const sheet = workbook.Sheets[sheetName]; //sheet é aba
const data  = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false });// raw false paa ele pegar o valor exatamente como está na celula sem formatar  ver a coluna valor que ele vai sair 0.00 ao inves de só 0

// Número de Linhas
const numRows = data.length;
// Número de Linhas
const numCols = Math.max(...data.map((row) => row.length));
// valor que contem na celula

module.exports = {
  numRows,
  numCols,
  data
}
