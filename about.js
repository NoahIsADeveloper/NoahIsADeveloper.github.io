const LINKS = {
    socialLinks: [
        ["https://github.com/NoahIsADeveloper", "github.png", "Github Profile"],
        ["https://www.roblox.com/users/703202541/profile", "roblox.png", "Roblox Profile"],
        ["https://steamcommunity.com/id/NoahIsADeveloper/", "steam.png", "Steam Profile"],
        ["https://www.youtube.com/@NoahIsADeveloper", "youtube.png", "YouTube Channel"],
    ],
    groupLinks: [
        ["https://discord.gg/5qdzBtBgjx", "discord.png", "Discord Server"],
        ["https://www.roblox.com/communities/34672685/NoahDev#!/about", "roblox.png", "Roblox Group"]
    ],
    projectLinks: []
};

function linksToHTML(links, imagePath) {
    if (links.length === 0) return "<p>No links available.</p>";

    let newHTML = '<div class="links">';
    for (let link of links) {
        newHTML += `<a href="${link[0]}" target="_blank">
                        <img src="${imagePath + link[1]}" alt="${link[2]}">
                        <div class="link">${link[2]}</div>
                    </a>`;
    }
    newHTML += '</div>';
    return newHTML;
}

document.addEventListener("DOMContentLoaded", function () {
	document.querySelector("#projects").innerHTML = "<h2>Projects</h2>" + linksToHTML(LINKS.projectLinks, "assets/link_icons/");
    document.querySelector("#socials").innerHTML = "<h2>Socials</h2>" + linksToHTML(LINKS.socialLinks, "assets/link_icons/");
    document.querySelector("#groups").innerHTML = "<h2>Groups</h2>" + linksToHTML(LINKS.groupLinks, "assets/link_icons/");
	
    let script = document.createElement("script");
    script.src = "snow.js";
    script.defer = true;
    document.body.appendChild(script);
});