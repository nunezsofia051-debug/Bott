import { State } from "./state";
export function decidirMovimiento(estado: State): Record<string, string> {
     const movimientos: Record<string, string> = {};
     const tablero = estado.tablero;

     const fila = tablero.length;
     const columna = tablero[0].length;

     const casas: [number, number][] = [];

     //Buscamos las casas que todavia quedan en el tablero 
    for ( let fila = 0; fila < fila; fila++) {
        for (let columna = 0; columna < columna; columna++) {

            if (tablero[fila][columna] === "N") {
                casas.push([fila, columna]);
            }
        }
    }

    // Buscamos las fichas de nuestro jugador
    for (let fila = 0; fila < fila; fila++) {
        for (let columna = 0; columna < columna; columna++) {

            const ficha = tablero[fila][columna];
            if (!ficha.startsWith(estado.jugador)) {
                continue;
            }

            // Si no quedan casas, seguimoa hacia arriba 

            if (casas.length === 0) {
                movimientos[ficha] = "N";
                continue;
            }
            let mejorCasa: [number, number] | null = null;
            let menorDistancia = Infinity;
            let distanciaArribaElegida = 0;
            let distanciaDerechaElegida = 0;

            //Calculamos cual casa esta mas cerca y usamos solamente arriba y derecha 

            for (const casa of casas) {
                const distanciaArriba = (fila - casa[0] + filas) % filas;
                const distanciaDerecha = (casa[1] - columna + columnas) % columnas;
                const distanciaTotal = distanciaArriba + distanciaDerecha;

                if (distanciaTotal < menorDistancia) {
                    menorDistancia = distanciaTotal;
                    mejorCasa = casa;
                    distanciaArribaElegida = distanciaArriba;
                    distanciaDerechaElegida = distanciaDerecha;
                }
            }
            //Elige el eje que nos acercamos a la casa 
            if (distanciaArribaElegida >= distanciaDerechaElegida && distanciaArribaElegida > 0) {
                movimientos[ficha] = "N";
            } else if (distanciaDerechaElegida > 0) {
                movimientos[ficha] = "E";
            } else {
                movimientos[ficha] = "N";
            }
        }
    }
    return movimientos;
} 