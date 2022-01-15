function createGroupInArray(base) {
  const resultado = [[]];
  const maximo = 2;
  let grupo = 0;

  for (let indice = 0; indice < base.length; indice += 1) {
    if (resultado[grupo] === undefined) {
      resultado[grupo] = [];
    }

    resultado[grupo].push(base[indice]);

    if ((indice + 1) % maximo === 0) {
      grupo += 1;
    }
  }

  return resultado;
}

export default createGroupInArray;

// const meuArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// /* separo meu array em grupos de 3 chaves */
// console.log(separar(meuArray, 3));

// function createGroupInArray(base: any[][], max: int): any[][] {
//   const res = [];
//   for (let i = 0; i < base.length; i++) {
//     res.push(base.slice);
//   }
// }
