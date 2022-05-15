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
        "contents": "",
		"complete": false
    };

    todo.contents = req.body.contents;

    fs.readFile("./todo_list.json", {
        "encoding" : "utf8"
    }, (err, list) => {
        data = JSON.parse(data);

        data.list.push(todo);

        fs.writeFile("./todo_list.json", JSON.stringify(data), (err) => {
            res.json(true);
        });
    });
};

exports.complete = (req, res) => {
    fs.readFile("./todo_list.json", {
        "encoding" : "utf8"
    }, (err, list) => {
        data = JSON.parse(data);

        data.list[req.body.index].complete = true;

        fs.writeFile("./todo_list.json", JSON.stringify(data), (err) => {
            res.json(true);
        });
    });
};

exports.del = (req, res) => {
    fs.readFile("./todo_list.json", {
        "encoding" : "utf8"
    }, (err, list) => {
        data = JSON.parse(data);

        data.list[req.body.index] = null;
        data.list = data.list.filter(Boolean);

        fs.writeFile("./todo_list.json", JSON.stringify(data), (err) => {
            res.json(true);
        });
    });
};