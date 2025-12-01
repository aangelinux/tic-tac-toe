export const template = document.createElement("template")
template.innerHTML = `
<div id="ui">
	<p>Turn: 1, Player: Human</p>
</div>

<style>
	#ui {
		justify-self: center;
		width: 300px;
		font-size: 1rem;
		font-weight: bold;
		font-family: Verdana, Geneva, Tahoma, sans-serif;
	}

	p {
		justify-self: center;
	}
</style>
`