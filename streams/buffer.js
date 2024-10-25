// Maneira mais fácil para escrever dados na memória do computador, converte de uma maneira que o computador entenda.

const buf = Buffer.from("Vitor")

console.log(buf.toJSON())