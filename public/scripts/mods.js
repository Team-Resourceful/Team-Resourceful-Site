
function createModEntry(mod) {
    const item = document.createElement("div");
    item.classList.add("item");

    const itemContent = document.createElement("div");
    itemContent.classList.add("item-content");

    const itemText = document.createElement("div");
        itemText.classList.add("item-text");

        const title = document.createElement("h1");
        title.appendChild(document.createTextNode(mod.title));

        const description = document.createElement("p");
        description.appendChild(document.createTextNode(mod.description));

        itemText.appendChild(title);
        itemText.appendChild(description);

    const itemLinks = document.createElement("div");
    itemLinks.classList.add("item-links");

        for (let tag of mod.links) {
            const linkA = document.createElement("a");
            linkA.classList.add("link");
            linkA.classList.add("no-animation");
            linkA.href = tag.url;
            const linkImg = document.createElement("img");
            linkImg.src = `assets/lucide/${tag.icon}.svg`;
            linkA.appendChild(linkImg);
            itemLinks.appendChild(linkA);
        }

    itemContent.appendChild(itemText);
    itemContent.appendChild(itemLinks);

    item.appendChild(itemContent);

    const image = document.createElement("img");
        image.src = mod.image;
        image.alt = mod.title;

    item.appendChild(image);

    return item;
}

const modsApiUrl = `${location.protocol}//${location.host}/api/mods`;

fetch(modsApiUrl)
    .then(response => response.json())
    .then(json => {
        const content = document.getElementById("content");
        for (let mod of json) {
            content.appendChild(createModEntry(mod));
        }
    })
    .catch(error => {
        console.error(error);
    });