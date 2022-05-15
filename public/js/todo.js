const xhr = new XMLHttpRequest();

xhr.open("GET", "/list", true);

xhr.onload = () => {
    if (xhr.readyState != xhr.DONE) {
        return;
    }

    let data = JSON.parse(xhr.response);

    for (let row of data.list) {
        let tr = document.createElement("tr");

        let contents = document.createElement("td");
        let done = document.createElement("td");
        let remove = document.createElement("td");

        let doneButton = document.createElement("button");
        let removeButton = document.createElement("button");

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
};

xhr.onerror = () => {
    console.log("[Error occurred]");
};

xhr.send();