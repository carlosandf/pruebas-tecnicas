// 1 - Arregla esta función para que el código posterior funcione como se espera:
import net from 'node:net'

export const ping = (ip, callback) => {
  const startTime = process.hrtime()

  const client = net.connect({ port: 80, host: ip }, () => {
    callback({ time: process.hrtime(startTime), ip })
    client.end()
  })

  client.on('error', (err) => {
    callback(err)
  })
}

ping('midu.dev', (err, info) => {
  if (err) console.error(err)
  console.log(info)
})

// 2 - Transforma la siguiente función para que funcione con promesas en lugar de callbacks:
export function obtenerDatosPromise({ time = 0 } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 'datos importantes' });
    }, time * 1000);
  })
}


// 3
// - Explica qué hace la funcion.
// - Identifica y corrige los errores en el siguiente código.
// - Si ves algo innecesario, elimínalo.
// - Luego mejoralo para que siga funcionando con callback
// - Luego haz lo que consideres para mejorar su legibilidad.

import fs from 'node:fs'

export function procesarArchivo(callback) {
  fs.readFile('input.txt', 'utf8', (error, contenido) => {
    if (error) {
      console.error('Error leyendo archivo:', error.message);
      return callback(error, null);
    }
    const textoProcesado = contenido.toUpperCase();

    fs.writeFile('output.txt', textoProcesado, error => {
      if (error) {
        console.error('Error guardando archivo:', error.message);
        return callback(error);
      }

      console.log('Archivo procesado y guardado con éxito');
      return callback(null, contenido);
    });
  });
}

export async function procesarArchivoPromise () {
  try {
    const textoProcesado = await fs.promises.readFile('input.txt', 'utf8');
    await fs.promises.writeFile('output.txt', textoProcesado.toUpperCase());
  } catch (error) {
    console.error(error);
  }
}




// 4 - ¿Cómo mejorarías el siguiente código y por qué? Arregla los tests si es necesario:

export async function leerArchivos() {

  const [text1, text2, text3] = await Promise.allSettled([
    fs.promises.readFile('archivo1.txt', 'utf8'),
    fs.promises.readFile('archivo2.txt', 'utf8'),
    fs.promises.readFile('archivo3.txt', 'utf8')
  ])

  return `${text1.value} ${text2.value} ${text3.value}`
}


// 5 - Escribe una funcion `delay` que retorne una promesa que se resuelva después de `n` milisegundos. Por ejemplo:

export function delay (ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ms)
    }, ms)
  })
}

delay(3000).then(() => console.log('Hola mundo'));
// o..
await delay(3000)
console.log('Hola mundo')

