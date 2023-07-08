async function obtener_api(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  catch (error) {
    throw 'Error al obtener los datos';
  }
}

async function mostrar_data(datos) {
  try {
    escribir_card.innerHTML = ``
    ciudad = document.querySelector("#selec").value;
    const data = await datos;
    console.log(data);
    const card = document.createElement('div');
    card.innerHTML = `
    <div class="row d-flex justify-content-center m-3">
      <div class="card col-sm-7 col-3">
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title fw-bold fs-2">Clima en ${ciudad}</h5>
        </div>
        <ul class="list-group list-group-flush fw-bold fs-3">
          <li class="list-group-item">${data.weather[0].description}</li>
          <li class="list-group-item">Humedad: ${data.main.humidity} %💧</li>
          <li class="list-group-item">Temperatura: ${data.main.temp} c°🌡</li>
        </ul  >
      </div>
    </div>
  `
  escribir_card.appendChild(card);
  }
  catch (error) {
    throw 'Error al obtener los datos1';
  }
}

async function seleccionar() {
  ciudad = document.querySelector("#selec").value;
  const api_ciudad = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad}&limit=1&appid=c0f9e9ee1eb24902bad51c1b4bfaf9c1`;
  console.log(ciudad);
  const altitudes = await obtener_api(api_ciudad)
  console.log(altitudes[0].lat);
  console.log(altitudes[0].lon);
  const api_full = `https://api.openweathermap.org/data/2.5/weather?lat=${altitudes[0].lat}&lon=${altitudes[0].lon}&appid=c0f9e9ee1eb24902bad51c1b4bfaf9c1&units=metric&lang=es`;

  const datos = await obtener_api(api_full)

  console.log(datos)
  mostrar_data(datos)
}
const escribir_card = document.querySelector("#data-container");
