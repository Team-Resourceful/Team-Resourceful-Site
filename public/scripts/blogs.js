
function createBlogEntry(blog) {
    const item = document.createElement("div");
    item.classList.add("item");

    const itemContent = document.createElement("div");
    itemContent.classList.add("item-content");

    const itemText = document.createElement("div");
        itemText.classList.add("item-text");

        const titlea = document.createElement("a");
            titlea.classList.add("no-animation");
            titlea.classList.add("reference");
            titlea.href = `${location.protocol}//${location.host}/blog/${blog.id}`;

            const title = document.createElement("h1");
            title.appendChild(document.createTextNode(blog.title));
            titlea.appendChild(title);

        const description = document.createElement("p");
        description.appendChild(document.createTextNode(blog.description));

        itemText.appendChild(titlea);
        itemText.appendChild(description);

    const itemTags = document.createElement("div");
        itemTags.classList.add("item-tags");

        for (let tag of blog.tags) {
            const tagElement = document.createElement("p");
            tagElement.classList.add("tag");
            tagElement.appendChild(document.createTextNode(tag));
            itemTags.appendChild(tagElement);
        }

        if (blog.tags.length > 0) {
            const separator = document.createElement("p");
            separator.appendChild(document.createTextNode("•"));
            itemTags.appendChild(separator);
        }

        const date = document.createElement("p");
            date.classList.add("item-date");
            date.appendChild(document.createTextNode(blog.date));

        itemTags.appendChild(date);

    itemContent.appendChild(itemText);
    itemContent.appendChild(itemTags);

    item.appendChild(itemContent);

    const imageWrapper = document.createElement("a");
        imageWrapper.classList.add("item-image");
        imageWrapper.classList.add("no-animation");
        imageWrapper.href = `${location.protocol}//${location.host}/blog/${blog.id}`;
        const image = document.createElement("img");
        image.src = blog.image;
        image.alt = blog.title;
        imageWrapper.appendChild(image);

    item.appendChild(imageWrapper);

    return item;
}

const blogsApiUrl = `${location.protocol}//${location.host}/api/blogs`;

fetch(blogsApiUrl)
    .then(response => response.json())
    .then(json => {
        const content = document.getElementById("content");
        for (let blog of json) {
            content.appendChild(createBlogEntry(blog));
        }
    })
    .catch(error => {
        console.error(error);
    });