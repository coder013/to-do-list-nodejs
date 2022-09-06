const fs = require("fs");

exports.list = (req, res) => {
    const exists = fs.existsSync("./todo_list.json");

    if (exists) {
        fs.readFile("./todo_list.json", "utf8", (err, data) => {
            res.json(JSON.parse(data));
        });
    } else {
        const data = { "list": [] };

        fs.writeFile("./todo_list.json", JSON.stringify(data), (err) => {
            res.json(data);
        });
    }
};

exports.add = (req, res) => {
    const todo = {
        "contents": req.body.contents,
		"done": false
    };

    fs.readFile("./todo_list.json", {
        "encoding" : "utf8"
    }, (err, data) => {
        const jsonData = JSON.parse(data);

        jsonData.list.push(todo);

        fs.writeFile("./todo_list.json", JSON.stringify(jsonData), (err) => {
            res.json(true);
        });
    });
};

exports.done = (req, res) => {
    fs.readFile("./todo_list.json", {
        "encoding" : "utf8"
    }, (err, data) => {
        const jsonData = JSON.parse(data);

        jsonData.list[req.body.index].done = true;

        fs.writeFile("./todo_list.json", JSON.stringify(jsonData), (err) => {
            res.json(true);
        });
    });
};

exports.del = (req, res) => {
    fs.readFile("./todo_list.json", {
        "encoding" : "utf8"
    }, (err, data) => {
        const jsonData = JSON.parse(data);

        jsonData.list[req.body.index] = null;
        jsonData.list = jsonData.list.filter(Boolean);

        fs.writeFile("./todo_list.json", JSON.stringify(jsonData), (err) => {
            res.json(true);
        });
    });
};