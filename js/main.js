'use strict';

const limparFormulario = (endereco) => { //Método que limpa os campos
    document.getElementById('endereco').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('uf').value = "";
    document.getElementById('ibge').value = "";
}


const preencherFormulario = (endereco) => { //Método para preencher o formulário com valores recebidos pela API-ViaCep
    limparFormulario();
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('uf').value = endereco.uf;
    document.getElementById('ibge').value = endereco.ibge;

}

const eNumero = (numero) => /^[0-9]+$/.test(numero); //Verifica se o número informado é até 9 digitos
const cepValido = (cep) => cep.length == 8 && eNumero(cep); //Se o CEP tem o Tamanho de 8 Digítos e é um Número = Então retorna true

//Método que pesquisa o CEP
const pesquisarCep = async () => {
    limparFormulario();
    const cep = document.getElementById('cep').value; //Pega o valor cep pelo seu ID, informado no doc HTML pelo Usuário
    const url = `https://viacep.com.br/ws/${cep}/json/`; //Pega a URL da Api e armazena os dados da variável Cep
    if (cepValido(cep)){//Se o Cep é válido...
        const dados = await fetch(url); //Aguarda pelos dados recebidos da URL
        const endereco = await dados.json(); //Pega os dados aguardados da URL e aguarda por arquivo em formato JSON
            if (endereco.hasOwnProperty('erro')){
                document.getElementById('endereco').value = 'CEP não encontrado!';
            } else {
                preencherFormulario(endereco);
        }
    } else {
        document.getElementById('cep').value = 'CEP Incorreto!';
        limparFormulario();
    }
}

document.getElementById('cep')
        .addEventListener('focusout', pesquisarCep); //Método que retorna o cep informado e seus dados

        function salvarDados(){
        localStorage.info = document.getElementById('endereco').value;
        localStorage.info = document.getElementById('bairro').value;
        localStorage.info = document.getElementById('cidade').value;
        localStorage.info = document.getElementById('uf').value;
        localStorage.info = document.getElementById('ibge').value;
        }