export const template = document.createElement("template")
template.innerHTML = `
<div class="tile">
	<svg class="svg"></svg>
</div>

<style>
	.tile {
		border: 3px solid black;
		border-radius: 5px;
		cursor: pointer;
		position: absolute;
		background-color: lightblue;
	}

	.svg {
		position: absolute;
	}

	.circle {
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