export const template = document.createElement("template")
template.innerHTML = `
	<div class="board"></div>

	<style>
		.board {
			justify-self: center;
			width: 500px;
			height: 480px;
			display: grid;
			grid-template-columns: auto auto auto;
			grid-template-rows: auto auto auto;
			gap: 3px;
			padding: 2px;
		}
	</style>
`