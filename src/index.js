/**
 * Entrypoint for the application.
 */

import { Game } from "./controller/game"
import { Board } from "./view/board"
import { AI } from "./model/ai"
import { Random } from "./model/random"

function main() {
	const random = new Random()

	new Game(new Board(), new AI(random)).start()
}

main()