// funcao para ver margem de lucro de cada aposta:

// a funcao vai receber um vetor com todos os possiveis reltados, exemplo: vitoria, perda ou empate:
function calcularMargem(odds) {
  let somaProbabilidades = 0; // variavel que recebe a soma das odds = probabilidade (100%)

  // a variavel recebe os valores em decimal
  odds.forEach(odd => { 
    somaProbabilidades += (1 / odd);
  });

  // a variavel e mutiplicada por 100, e oque passar de 100 sera a margem de lucro
  const margem = (somaProbabilidades * 100) - 100;
  return margem.toFixed(2); // Retorna com 2 casas decimais
}

// Exemplo de uso:
const oddsExemplo = [2.00, 3.30, 3.60]; // Vitória = 2.00, Empate = 3.30, Derrota = 3.60
const margemCalculada = calcularMargem(oddsExemplo);

console.log(`Margem da casa: ${margemCalculada}%`);
