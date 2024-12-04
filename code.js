const LINKS = {
	soicalLinks : [
		["https://github.com/NoahIsADeveloper", "github.png", "Github Profile"],
		["https://www.roblox.com/users/703202541/profile", "roblox.png", "Roblox Profile"],
		["https://steamcommunity.com/id/NoahIsADeveloper/", "steam.png", "Steam Profile"],
		["https://www.youtube.com/@NoahIsADeveloper", "youtube.png", "YouTube Channel"],
	],
	groupLinks : [
		["https://discord.gg/5qdzBtBgjx", "discord.png", "Discord Server"],
		["https://www.roblox.com/communities/34672685/NoahDev#!/about", "roblox.png", "Roblox Group"]
	],
	projectLinks : [
		
	]
}

function linksToHTML(links, imagePath) {
	let newHTML = ''

	for (let link of links) {
		newHTML += `<a href="${link[0]}" target="_blank"> <img src="${imagePath + link[1]}" alt="GitHub"> ${link[2]} </a>`
	}

	return newHTML
}

document.addEventListener("DOMContentLoaded", () => {
	document.querySelector("#projects").innerHTML = "<h2>Projects</h2>" + linksToHTML(LINKS.projectLinks, "assets/link_icons/")
	document.querySelector("#socials").innerHTML = "<h2>Socials</h2>" + linksToHTML(LINKS.soicalLinks, "assets/link_icons/")
	document.querySelector("#groups").innerHTML = "<h2>Groups</h2>" + linksToHTML(LINKS.groupLinks, "assets/link_icons/")
})