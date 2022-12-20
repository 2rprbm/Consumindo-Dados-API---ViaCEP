const cepDigitado = document.querySelector("#cep")
cepDigitado.addEventListener('blur', (evento) => {
    if(evento.target.value !== ""){
        buscaCep(evento.target.value)
    } 
})

async function buscaCep(cep){
    try{
        const objetoCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const objetoCepConvertido = await objetoCep.json()
         if(objetoCepConvertido.erro){
              alert("CEP inexistente")
              limpaFormulario()
            } else{
            preencheFormulario(objetoCepConvertido)
         }
    } catch (erro){
        alert("CEP Inválido. Verifique")
        limpaFormulario()
    }
}

function preencheFormulario(cepCompleto){
    document.querySelector("#endereco").value = cepCompleto.logradouro
    document.querySelector("#bairro").value = cepCompleto.bairro
    document.querySelector("#cidade").value = cepCompleto.localidade
    document.querySelector("#cep").value = cepCompleto.cep
    document.querySelector("#estado").value = cepCompleto.uf
}

function limpaFormulario(){
    document.querySelector("#endereco").value = ""
    document.querySelector("#bairro").value = ""
    document.querySelector("#cidade").value = ""
    document.querySelector("#cep").value = ""
    document.querySelector("#estado").value = "" 
    document.querySelector("#cep").focus()
}