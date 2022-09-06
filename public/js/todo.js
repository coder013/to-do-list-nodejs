function list() {
    fetch("/list")
    .then((response) => response.json())
    .then((data) => {
        document.querySelector(".table > tbody").textContent = "";

        for (let i = 0; i < data.list.length; i++) {
            const row = data.list[i];
            const tr = document.createElement("tr");

            const contents = document.createElement("td");
            contents.append(row.contents);

            const doneElement = document.createElement("td");
            const doneButton = document.createElement("button");
            doneButton.classList.add("btn", "btn-success", "btn-done");

            if (row.done) {
                tr.classList.add("tr-done");
                doneButton.setAttribute("disabled", "");
            } else {
                doneButton.addEventListener("click", () => { done(i) });
            }

            const doneIcon = document.createElement("i");
            doneIcon.classList.add("bi", "bi-check-circle");

            doneButton.append(doneIcon);
            doneElement.append(doneButton);

            const removeElement = document.createElement("td");
            const removeButton = document.createElement("button");
            removeButton.classList.add("btn", "btn-danger", "btn-remove");

            const removeIcon = document.createElement("i");
            removeIcon.classList.add("bi", "bi-x-circle");

            removeButton.append(removeIcon);
            removeElement.append(removeButton);

            tr.append(contents, doneElement, removeElement);

            document.querySelector(".table > tbody").append(tr);
        }
    })
    .catch(() => console.log("[Error occurred]"));
}

function done(index) {
    fetch("/done", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "index": index }),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error();
        }

        list();
    })
    .catch(() => console.log("[Error occurred]"));
}

document.getElementsByClassName("btn-add")[0].addEventListener("click", () => {
    fetch("/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "contents": document.getElementsByClassName("input-todo")[0].value }),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error();
        }

        document.getElementsByClassName("input-todo")[0].value = "";
        list();
    })
    .catch(() => console.log("[Error occurred]"));
});

list();