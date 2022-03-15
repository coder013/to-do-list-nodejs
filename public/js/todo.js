const xhr = new XMLHttpRequest();

xhr.open("GET", "/list", true);

xhr.onload = () => {
    if (xhr.readyState == xhr.DONE) {
        console.log(xhr.response);
    }
};

xhr.onerror = () => {
    console.log("[Error occurred]");
};

xhr.send();