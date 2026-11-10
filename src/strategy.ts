import { State } from "./state";
export function decidirMovimiento(estado: State): Record<string, string> {
     const movimientos: Record<string, string> = {};
     const tablero = estado.tablero;

     const cantidadFilas = tablero.length;
     const cantidadColumnas = tablero[0].length;

     const casas: [number, number][] = [];
    
     function calcularDestino(
        fila: number,
        columna: number,
        direccion: "N" | "E",
        dado: number,
        cantidadFilas: number,
        cantidadColumnas: number
        ): [number, number] {
     
        let nuevaFila = fila;
        let nuevaColumna = columna;

        for (let i = 0; i < dado; i++) {
            if (direccion === "N") {
                nuevaFila --;
                if (nuevaFila < 0) {
                    nuevaFila = cantidadFilas - 1;
                }
            }
            if (direccion === "E") {
                nuevaColumna ++;
                if (nuevaColumna >= cantidadColumnas) {
                    nuevaColumna = 0;
                }
            }
        }
        return [nuevaFila, nuevaColumna];
    }
     //Buscamos las casas que todavia quedan en el tablero 
    for ( let fila = 0; fila < cantidadFilas; fila++) {
        for (let columna = 0; columna < cantidadColumnas; columna++) {

            if (tablero[fila][columna] === "N") {
                casas.push([fila, columna]);
            }
        }
    }
    
    const fichas: { id: string, fila: number, columna: number }[] = [];
    // Buscamos las fichas de nuestro jugador
    for (let fila = 0; fila < cantidadFilas; fila++) {
        for (let columna = 0; columna < cantidadColumnas; columna++) {

            const ficha = tablero[fila][columna];
            if (!ficha.startsWith(estado.jugador)) {
                continue;
            }
            fichas.push({
                id: ficha,
                fila: fila,
                columna: columna
            });
        }
    }
            fichas.sort((a, b) => 
                a.id.localeCompare(b.id));

            const objetivos = new Map<string, [number, number]>();

            for (let i = 0; i < fichas.length; i++) {
                if (i < casas.length) {
                    objetivos.set(fichas[i].id, casas[i]);
                }
            }

         for (const fichaActual of fichas) {
            const ficha = fichaActual.id;
            const fila = fichaActual.fila;
            const columna = fichaActual.columna;

            if (casas.length === 0) {
                movimientos[ficha] = "N";
                continue;
            }

            const objetivo = objetivos.get(ficha);
            let mejorDireccion: "N" | "E" = "N";

            if (objetivo) {
                const filaCasa = objetivo[0];
                const columnaCasa = objetivo[1];

               const destinoN = calcularDestino(
             fila,
             columna,
             "N",
             estado.dado,
             cantidadFilas,
             cantidadColumnas
             );

            const destinoE = calcularDestino(
              fila,
             columna,
             "E",
             estado.dado,
             cantidadFilas,
             cantidadColumnas
            );
            
            const distanciaN = Math.abs(destinoN[0] - filaCasa) + Math.abs(destinoN[1] - columnaCasa);
            const distanciaE = Math.abs(destinoE[0] - filaCasa) + Math.abs(destinoE[1] - columnaCasa);
            
             if (distanciaN <= distanciaE) {
             mejorDireccion = "N";
             } else {
            mejorDireccion = "E";
             }
            
             
            }
             movimientos[ficha] = mejorDireccion;
        }
        
     return movimientos;
 }
           

           