const express = require("express");
const { products } = require("./products");

let app = express();

let isObjectEmpty=(obj)=>{
  
  return (Object.keys(obj).length>0)? true : false

};

app.use(express.json());

app.get("/", (req, res) => {
  res.write("Welcome :)");
  res.end();
});

app.get("/products", (req, res) => {
  res.write(JSON.stringify(products));
  res.end();
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  let filteredObj;
  for (let item of products) {
    if (item.id == id) {
      filteredObj = item;
    }
  }

  res.write(JSON.stringify(filteredObj));
  res.end();
});

app.post("/insert", (req, res) => {
  // console.log(typeof req.body);
  if(isObjectEmpty(req.body))
  {
    products.push(req.body);
    res.send(JSON.stringify(products));
  }
  else
  {
  res.send('No value Found');
  }
 
  res.end();
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let index = products.findIndex((item) => item.id == id );

  console.log(products[index]);
  products.splice(index, 1);
  console.log(products);

  // res.write("Deleted");
  res.send(JSON.stringify(products));
  res.end();
});

app.put('/update/:id',(req,res)=>{
  console.log(req.query);
  res.end();
});


app.listen(4000, () => {
  console.log("listening at port 4000");
});
