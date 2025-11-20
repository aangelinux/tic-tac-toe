export const template = document.createElement("template")
template.innerHTML = `
	<div class="board">
		<div class="tile" id="1"></div>
		<div class="tile" id="2"></div>
		<div class="tile" id="3"></div>
		<div class="tile" id="4"></div>
		<div class="tile" id="5"></div>
		<div class="tile" id="6"></div>
		<div class="tile" id="7"></div>
		<div class="tile" id="8"></div>
		<div class="tile" id="9"></div>
	</div>

	<style>
		.board {
			justify-self: center;
			width: 500px;
			height: 500px;
			display: grid;
			grid-template-columns: auto auto auto;
			grid-template-rows: auto auto auto;
			gap: 3px;
			padding: 5px;
			background-color: lightblue;
		}

		.svg {
			position: absolute;
		}

		.nought {
			fill: none;
			stroke: black;
			stroke-width: 10;
		}

		.cross {
			stroke: black;
			stroke-width: 10;
		}
	</style>
`