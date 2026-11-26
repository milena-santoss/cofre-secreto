const senhaCofre = [6, 7, 2];

let cofreAberto = false;

function executarAcao(acao) {
    const tela = document.getElementById("mensagem");

    const campos = [
        document.getElementById("num0"),
        document.getElementById("num1"),
        document.getElementById("num2")
    ];

    switch (acao) {
        case "jogar": {
            if (cofreAberto) {
                tela.textContent = "O cofre já está aberto! Clique em Limpar para jogar novamente.";
                break;
            }

            const valores = campos.map(campo => campo.value.trim());

            if (valores.some(valor => valor === "")) {
                tela.textContent = "Preencha os três números!";
                break;
            }

            const tentativa = valores.map(Number);

            if (tentativa.some(numero =>
                !Number.isInteger(numero) || numero < 0 || numero > 9
            )) {
                tela.textContent = "Digite apenas números inteiros de 0 a 9!";
                break;
            }

            const acertou = tentativa.every(
                (numero, indice) => numero === senhaCofre[indice]
            );

            if (acertou) {
                cofreAberto = true;
                tela.textContent = "🎉 Parabéns! Você abriu o cofre!";
            } else {
                tela.textContent = "Senha incorreta! Tente novamente.";
            }

            break;
        }

        case "dica": {
            const tipo = senhaCofre[0] % 2 === 0 ? "PAR" : "ÍMPAR";
            tela.textContent = "Dica: o primeiro número da senha é " + tipo + ".";
            break;
        }

        case "limpar": {
            for (let i = 0; i < campos.length; i++) {
                campos[i].value = "";
            }

            cofreAberto = false;
            tela.textContent = "Aguardando tentativa...";
            campos[0].focus();
            break;
        }

        default:
            tela.textContent = "Ação não reconhecida.";
    }
}
