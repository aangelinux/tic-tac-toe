/**
 * Entrypoint for the application.
 */

import { Game } from "./controller/game.js"
import { Board } from "./view/board/board.js"
import { AI } from "./model/ai.js"
import { Random } from "./model/random.js"
import { Timer } from "./model/timer.js"
import { UI } from "./view/ui/ui.js"

function main() {
	const random = new Random()
	const game = new Game(new Board(), new AI(random), new Timer(), new UI())
	
	game.start()
}

main()