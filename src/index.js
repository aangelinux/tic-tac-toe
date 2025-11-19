/**
 * Entrypoint for the application.
 */

import { Game } from "./controller/game"
import { Board } from "./view/board"
import { Random } from "./model/random"

function main() {
	new Game(new Board(new Random))
}

main()