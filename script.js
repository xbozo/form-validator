let B7Validator = {
    handleSubmit: (event) => {
        event.preventDefault()
        let send = true

        let inputs = form.querySelectorAll("input")

        B7Validator.clearErrors()                    // evita que as mensagens de erro se acumulem
        for(let i = 0; i < inputs.length; i++) {
            let input = inputs[i]
            let check = B7Validator.checkInput(input)
            if(check !== true) {
                send = false
                B7Validator.showError(input, check)
            }
        }

        if(send) {
            form.submit()
        }
    },

    checkInput:(input) => {
        let rules = input.getAttribute("data-rules")
        if(rules !== null) {
            rules = rules.split("|")    // separa as rules pelo |
            for(let k in rules) {
                let ruleDetails = rules[k].split("=")   // separa os parametros das rules pelo |
                switch(ruleDetails[0]) {
                    case "required":
                        if(input.value == "") {
                            return "Este campo é obrigatório."
                        }
                    break

                    case "min":
                        if(input.value.length < ruleDetails[1]) {          // o ruleDetails se refere ao 2° item do data-rules, que no caso é o min (value desse parametro)
                            return "Este campo precisa de ao menos " +ruleDetails[1]+ " caracteres."
                        }
                    break

                    case "email":
                        if(input.value != "") {              // se o campo estiver preenchido, deverá seguir os padrões
                            let regex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm
                            if(!regex.test(input.value.toLowerCase())) {              // o ! em regex significa uma negação
                                return "Endereço de email inválido."
                            }
                        } 

                    break
                }
            }
        }

        return true
    },

    showError:(input, error) => {
        input.style.borderColor = "#ff0000"

        let errorElement = document.createElement("div")
        errorElement.classList.add("error")
        errorElement.innerHTML = error;    // texto que capta o valor do parâmetro da função

        input.parentElement.insertBefore(errorElement, input.ElementSibling)      // parentElement é o elemento pai, insertBefore recebe o parâmetro do que vai inserir e antes de quem, o elementsibling é o que fará ele inserir depois
    },
    
    clearErrors:() => {                                       // limpa os erros para que nao se acumulem
        let inputs = form.querySelectorAll("input")
        for(let i = 0; i < inputs.length; i++) {
            inputs[i].style = ""
        }

        let errorElements = document.querySelectorAll(".error")
        for(let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove()
        }
    }
}

let form = document.querySelector(".b7validator")
form.addEventListener("submit", B7Validator.handleSubmit)