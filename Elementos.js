const XLSX = require("xlsx");

module.exports = {
  dado: function (a) {
    const dado = [
      'input[name="nome"]',
      'input[name="rg"]',
      'input[name="cpf"]',
      'input[name="cnpj"]',
     // 'input[name="num_processo"]',
      'input[name="unidade"]',
      'input[name="cep"]',
      'input[name="endereco"]',
      'textarea[name="area1"]',
      'input[id="cod"]',            
      'input[name="valorDespesa07"]'
    ];

    return dado[a];
  },
};
