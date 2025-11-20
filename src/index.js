/**
 * Entrypoint for the application.
 */

import { Game } from "./controller/game.js"
import { Board } from "./view/board/board.js"
import { AI } from "./model/ai.js"
import { Random } from "./model/random.js"

function main() {
	const random = new Random()

	new Game(new Board(), new AI(random)).start()
}

main()