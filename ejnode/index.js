var http = require("http");
const axios = require("axios");
const fs = require("fs");

const urlProveedores =
  "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";

const urlClientes =
  "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";

let get = (getType, res) => {
  let url;
  if (getType === "clientes") {
    console.log("GetClientes");
    url = urlClientes;
  } else if (getType === "proveedores") {
    console.log("GetProveedores");
    url = urlProveedores;
  }
  axios.get(url).then((res) => {
    let JSONResponse = res.data;
    console.log(JSONResponse.length);
    processJSON(JSONResponse, res);
  });
};

let processJSON = (JSONResponse, res) => {
  if (JSONResponse.length == 91) {
    //Clientes
    readFile((data) => {
        res.writeHead(200,{"Content-Type": "text/html"});
        res.end(data.toString());
    });
    JSONResponse.forEach((element) => {
      console.log(element.idCliente);
    });
  } else {
    //Proveedores
  }
};

let readFile = (callback) => {
    let contenido;
  fs.readFile("index.html", (err, data) => {
     contenido = data.toString();
    contenido.replace("{{replace}}", "HOLAAA");
  });
  callback(contenido);
};

http
  .createServer((req, res) => {
    // Encabezado de la respuesta por defecto del servidor
    if (req.url.endsWith("api/clientes")) {
      get("clientes", res);
    } else if (req.url.endsWith("api/proveedores")) {
      get("proveedores", res);
    }

    // Contenido de la respuesta por defecto del servidor
    res.end("Hello World!");
  })
  .listen(8081);
