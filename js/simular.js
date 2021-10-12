const botaoSimular = document.getElementById('simular')
const botaoLimpar = document.getElementById('limpar')
const tbody = document.querySelector('tbody')
const tabelaParcelas = document.getElementById('tabela-parcelas')

const entradaValorTotal = document.getElementById('valor-total')
const entradaPrazoAnos = document.getElementById('prazo-anos')
const entradaJurosAno = document.getElementById('juros-ano')

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
    prazoMeses.value = ''
    jurosMes.value = ''
    jurosAcumulados.value = ''
})) 

function atualizarConteudo() {
    const valorTotal = Number(entradaValorTotal.value.toLocaleString())
    const prazoAnos = entradaPrazoAnos.valueAsNumber
    const jurosAno = Number(entradaJurosAno.value.toLocaleString())

    let juros
    
    jurosTotal = 0
    tbody.innerHTML = ''

    prazoMeses.value = prazoAnos * 12
    jurosMes.value = Math.pow((1 + jurosAno), 1/12) - 1
    
    const amortizacao = valorTotal / prazoMeses.valueAsNumber
    let valorRestante = valorTotal

    for (let i = 0; i < prazoMeses.valueAsNumber; i++) {
        juros = valorRestante * jurosMes.valueAsNumber

        const linha = tbody.insertRow()

        const tdPrestacao = linha.insertCell()
        tdPrestacao.textContent = i + 1

        const tdAmortizacao = linha.insertCell()
        tdAmortizacao.textContent = amortizacao.toFixed(2)

        const tdJuros = linha.insertCell()
        tdJuros.textContent = juros.toFixed(2)

        const tdTotal = linha.insertCell()
        tdTotal.textContent = (juros + amortizacao).toFixed(2)
   
        jurosTotal += juros
        valorRestante -= amortizacao
    }

    jurosAcumulados.value = jurosTotal.toFixed(2)
}
