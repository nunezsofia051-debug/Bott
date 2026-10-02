import { State } from "./state";
import { decidirMovimiento } from "./strategy";

export function procesarMovimiento(estado: State) {
    return decidirMovimiento(estado);
} 