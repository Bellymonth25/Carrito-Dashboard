// RECIBIR DATOS -------------------------------------------------------------------

var velocidad = [];
var distancia = [];
var umbralMin = 3;
var umbralMax = 12;
var marcha = 0;
var velCarrito = 1;

var indicadorVelocidad = document.getElementById("barra-velocidad");
var indicadorC1Red = document.getElementById("c1-red");
var indicadorC2Red = document.getElementById("c2-red");
var indicadorC1Yellow = document.getElementById("c1-yellow");
var indicadorC2Yellow = document.getElementById("c2-yellow");
var indicadorC1Green = document.getElementById("c1-green");
var indicadorC2Green = document.getElementById("c2-green");

fetch("https://esp32ivandistcarro.s3.amazonaws.com")
  .then((res) => res.text())
  .then((res) => {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(res, "text/xml");
    // console.log()

    for (let item of xmlDoc.getElementsByTagName("Key")) {
      let url = item.childNodes[0].nodeValue;

      if (url.replace("dataLake/", "") != "") {
        getData(url);
      }
    }

    // console.log(velocidad);
    console.log(distancia);
  });

const getData = (url) => {
  fetch("https://esp32ivandistcarro.s3.amazonaws.com/" + url)
    .then((data) => data.json())
    .then((data) => {
      velocidad.push(data.bateria);

      // // Se obteiene el angulo con el porcentaje

      // let ang = ((data.bateria - 0) / 100) * 180 + 45;

      // indicadorVelocidad.style.transform = "rotate(" + String(ang) + "deg)";

      // Se obtiene la distancia del carrito

      // console.log(data);

      distancia.push(data.distancia);

      if (data.distancia < umbralMin) {
        indicadorC1Red.style.visibility = "visible";
        indicadorC2Red.style.visibility = "visible";
        indicadorC1Yellow.style.visibility = "hidden";
        indicadorC2Yellow.style.visibility = "hidden";
        indicadorC1Green.style.visibility = "hidden";
        indicadorC2Green.style.visibility = "hidden";
      } else if (data.distancia >= umbralMin && data.distancia < umbralMax) {
        indicadorC1Red.style.visibility = "visible";
        indicadorC2Red.style.visibility = "visible";
        indicadorC1Yellow.style.visibility = "visible";
        indicadorC2Yellow.style.visibility = "visible";
        indicadorC1Green.style.visibility = "hidden";
        indicadorC2Green.style.visibility = "hidden";
      } else if (data.distancia > umbralMax) {
        indicadorC1Red.style.visibility = "visible";
        indicadorC2Red.style.visibility = "visible";
        indicadorC1Yellow.style.visibility = "visible";
        indicadorC2Yellow.style.visibility = "visible";
        indicadorC1Green.style.visibility = "visible";
        indicadorC2Green.style.visibility = "visible";
      }
    });
};

// ENVIAR DATOS -------------------------------------------------------------------

const primeraVel = document.getElementById("vel-1");
const segundaVel = document.getElementById("vel-2");
const terceraVel = document.getElementById("vel-3");

const W_botton = document.getElementById("button-w");
const A_botton = document.getElementById("button-a");
const S_botton = document.getElementById("button-s");
const D_botton = document.getElementById("button-d");
const parar_botton = document.getElementById("parar-carro");

primeraVel.addEventListener("click", () => {
  console.log("1");
  velCarrito = 1;
});

segundaVel.addEventListener("click", () => {
  console.log("2");
  velCarrito = 2;
});

terceraVel.addEventListener("click", () => {
  console.log("3");
  velCarrito = 3;
});

W_botton.addEventListener("click", () => {
  console.log("w");
  const action = "publish/w";
  const actionVel = "publish/" + String(velCarrito);

  fetchPublishData(action);
  fetchPublishData(actionVel);
});

A_botton.addEventListener("click", () => {
  console.log("a");
  const action = "publish/a";
  const actionVel = "publish/" + String(velCarrito);

  fetchPublishData(action);
  fetchPublishData(actionVel);
});

S_botton.addEventListener("click", () => {
  console.log("s");
  const action = "publish/s";
  const actionVel = "publish/" + String(velCarrito);

  fetchPublishData(action);
  fetchPublishData(actionVel);
});

D_botton.addEventListener("click", () => {
  console.log("d");
  const action = "publish/d";
  const actionVel = "publish/" + String(velCarrito);

  fetchPublishData(action);
  fetchPublishData(actionVel);
});

parar_botton.addEventListener("click", () => {
  console.log("q");
  const action = "publish/q";

  fetchPublishData(action);
});

const fetchPublishData = (action) => {
  fetch(document.URL + action)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
};

// Se llama a la función para recibir la información del broker cada 5 segundos
setTimeout(function () {
  fetch("https://esp32ivandistcarro.s3.amazonaws.com")
    .then((res) => res.text())
    .then((res) => {
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(res, "text/xml");

      for (let item of xmlDoc.getElementsByTagName("Key")) {
        let url = item.childNodes[0].nodeValue;

        if (url.replace("dataLake/", "") != "") {
          getData(url);
        }
      }
    });
}, 10000);
