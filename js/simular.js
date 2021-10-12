const botaoSimular = document.getElementById('simular')
const botaoLimpar = document.getElementById('limpar')
const tbody = document.querySelector('tbody')
const tabelaParcelas = document.getElementById('tabela-parcelas')

const entradaValorTotal = document.getElementById('valor-total')
const entradaPrazoAnos = document.getElementById('prazo-anos')
const entradaJurosAno = document.getElementById('juros-ano')

const tabelaAmortizacao = document.getElementById('amortizacao')
const tabelaTotal = document.getElementById('pagamento-total')
const tabelaJuros = document.getElementById('juros')

let prazoMeses = document.getElementById('prazo-meses')
let jurosMes = document.getElementById('juros-mes')
let jurosAcumulados = document.getElementById('juros-acumulados')

let jurosTotal

botaoSimular.addEventListener('click', ((e) => {   
    e.preventDefault()
    atualizarConteudo()
}))

botaoLimpar.addEventListener('click', ((e) => {
    e.preventDefault()
    tbody.innerHTML = ''
    entradaJurosAno.value = ''
    entradaPrazoAnos.value = ''
    entradaValorTotal.value = ''
    tabelaAmortizacao.textContent = ''
    tabelaTotal.textContent = ''
    prazoMeses.value = ''
    jurosMes.value = ''
    jurosAcumulados.value = ''
    
})) 

function atualizarConteudo() {
    const valorTotal = entradaValorTotal.valueAsNumber
    const prazoAnos = entradaPrazoAnos.valueAsNumber
    const jurosAno = entradaJurosAno.valueAsNumber

    let juros
    
    jurosTotal = 0
    tbody.innerHTML = ''

    prazoMeses.value = prazoAnos * 12
    jurosMes.value = Math.pow((1 + jurosAno), 1/12) - 1
    
    const amortizacao = valorTotal / prazoMeses.valueAsNumber
    let valorRestante = valorTotal
    let totalParcelas = 0

    for (let i = 0; i < prazoMeses.valueAsNumber; i++) {
        juros = valorRestante * jurosMes.valueAsNumber
        parcela = juros + amortizacao

        const linha = tbody.insertRow()

        const tdPrestacao = linha.insertCell()
        tdPrestacao.textContent = i + 1

        const tdAmortizacao = linha.insertCell()
        tdAmortizacao.textContent = amortizacao.toFixed(2)

        const tdJuros = linha.insertCell()
        tdJuros.textContent = juros.toFixed(2)

        const tdTotal = linha.insertCell()
        tdTotal.textContent = parcela.toFixed(2)
   
        jurosTotal += juros
        valorRestante -= amortizacao
        totalParcelas += parcela
    }

    jurosAcumulados.value = jurosTotal.toFixed(2)
    tabelaAmortizacao.textContent = `R$ ${valorTotal.toLocaleString()}`
    tabelaTotal.textContent = `R$ ${totalParcelas.toLocaleString()}`
    tabelaJuros.textContent = `R$ ${jurosTotal.toLocaleString()}`
}
