const http = require("http");
const { products } = require("./products");

const port = 4001;

const server = http.createServer((req, res) => {
  let url = require("url");
  let parsedQuery = url.parse(req.url, true);

  if (req.url === "/") {
    res.write("Hi From Product Server :) ");
    res.end();
  } else if (req.url === "/products" && req.method === "GET") {
    console.log(req.url);
    res.write(JSON.stringify(products));
    res.end();
  } else if (req.url === "/insert" && req.method === "POST") {
    // let body = "";
    // req.on("data", (chunk) => {
    //   body += chunk.toString(); // convert Buffer to string
    // });
    // req.on("end", () => {
    //   // console.log(body);
    //   res.end("ok");
    // });

    // products.push(products);

    // console.log(products);
    // // res.write(products);
    res.end();
  } else if (req.method === "DELETE") {
    // console.log(parsedQuery.query.id);

    let deleteID = parsedQuery.query.id;

    let index = products.findIndex((item) => item.id == deleteID);

    products.splice(index, 1);

    res.write(JSON.stringify(products));

    res.end();
  } else if (req.method === "PUT") {
    let keys = Object.keys(parsedQuery.query);

    let ID = parsedQuery.query.id;

    let index = products.findIndex((item) => item.id == ID);

    let tempObj = { ...products[index] };

    if (index >= 0) {
      console.log(tempObj);
      for (let key of keys) {
        if (tempObj.hasOwnProperty(key)) {
          tempObj[key] = parsedQuery.query[key];
        }
      }
    }

    products[index] = tempObj;
    res.write(JSON.stringify(products));
    res.end();
  }

  res.end();
});

server.listen(port, () => {
  console.log(`server listening to ${port}`);
});
