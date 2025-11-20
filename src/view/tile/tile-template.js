export const template = document.createElement("template")
template.innerHTML = `
<div class="tile" marked="false"></div>

<style>
	.tile {
		border: 3px solid black;
		border-radius: 5px;
		cursor: pointer;
	}
</style>
`