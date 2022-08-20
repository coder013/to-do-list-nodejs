function list() {
    fetch("/list")
    .then((response) => response.json())
    .then((data) => {
        document.querySelector(".table > tbody").textContent = "";

        for (const row of data.list) {
            const tr = document.createElement("tr");

            const contents = document.createElement("td");
            const done = document.createElement("td");
            const remove = document.createElement("td");

            const doneButton = document.createElement("button");
            const removeButton = document.createElement("button");

            doneButton.classList.add("btn", "btn-done");
            removeButton.classList.add("btn", "btn-remove");

            contents.append(row.contents);
            doneButton.append("Done");
            removeButton.append("Remove");
            
            done.append(doneButton);
            remove.append(removeButton);

            tr.append(contents, done, remove);

            document.querySelector(".table > tbody").append(tr);
        }
    })
    .catch(() => console.log("[Error occurred]"));
}

document.getElementById("add").addEventListener("click", () => {
    fetch("/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "contents": document.getElementById("content").value }),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        document.getElementById("content").value = "";
        list();
    })
    .catch(() => console.log("[Error occurred]"));
});

list();