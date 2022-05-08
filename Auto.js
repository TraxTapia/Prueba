let selectMarca;
$(document).ready(function () {
  llenarSelectMarca();
  const selectMarca = document.getElementById("selectMarca");
  const selectSubmarca = document.getElementById("selectSubmarca");
  const selectModelo = document.getElementById("selectModelo");
  const selectDescripcion = document.getElementById("selectDescripcion");

  $("#frmAuto").on("submit", function (e) {
    e.preventDefault();
    let validate = validarFrmAuto();
    if (validate) {
    }
  });
  selectMarca.addEventListener("change", async (event) => {
    let value = event.target.value;
    cleanSelect(selectSubmarca);
    cleanSelect(selectModelo);
    cleanSelect(selectDescripcion);
    if (value > 0) {
      let reqSubmarca = {
        NombreCatalogo: "Submarca",
        Filtro: event.target.value,
        IdAplication: 2,
      };
      let data = await getData(reqSubmarca);
      addOptions("selectSubmarca", data, "sSubMarca", "iIdSubMarca");
      console.log("miEvent", value);
    }
  });
  selectSubmarca.addEventListener("change", async (event) => {
    let value = event.target.value;
    cleanSelect(selectModelo);
    cleanSelect(selectDescripcion);
    if (value > 0) {
      let reqSubmarca = {
        NombreCatalogo: "Modelo",
        Filtro: event.target.value,
        IdAplication: 2,
      };
      let data = await getData(reqSubmarca);
      addOptions("selectModelo", data, "sModelo", "iIdModelo");
      console.log("miEvent", value);
    }
  });
  selectModelo.addEventListener("change", async (event) => {
    let value = event.target.value;
    console.log("value es =>", value);
    cleanSelect(selectDescripcion);
    if (value > 0) {
      let reqSubmarca = {
        NombreCatalogo: "DescripcionModelo",
        Filtro: event.target.value,
        IdAplication: 2,
      };
      let data = await getData(reqSubmarca);
      addOptions(
        "selectDescripcion",
        data,
        "sDescripcion",
        "iIdDescripcionModelo"
      );
      console.log("miEvent", value);
    }
  });
});
async function llenarSelectMarca() {
  var req = {
    NombreCatalogo: "Marca",
    Filtro: "2",
    IdAplication: 2,
  };
  let dataMarca = [];
  console.log("req", req);
  let data = await getData(req);
  console.log("optionsData", data);
  addOptions("selectMarca", data, "sMarca", "iIdMarca");
}
async function getData(req) {
  let data;
  let urlApi = "https://apitestcotizamatico.azurewebsites.net/api/catalogos";
  const requests = await fetch(urlApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
  const res = await requests.json();

  data = JSON.parse(res.CatalogoJsonString);
  console.log("data", data);
  return data;
}
function addOptions(domElement, data, value, id) {
  var select = document.getElementsByName(domElement)[0];

  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
    var option = document.createElement("option");
    option.text = data[i][value];
    option.value = data[i][id];
    select.add(option);
  }
}
function cleanSelect($select) {
  for (let i = $select.options.length; i >= 1; i--) {
    $select.remove(i);
  }
}
function submitFrm() {}
function validarFrmAuto() {
  let selectMarca, selectSubmarca, selectModelo, selectDescripcion;
  selectMarca = document.getElementById("selectMarca");
  selectSubmarca = document.getElementById("selectSubmarca");
  selectModelo = document.getElementById("selectModelo");
  selectDescripcion = document.getElementById("selectDescripcion");
  if (
    selectMarca.value == 0 ||
    selectSubmarca.value == 0 ||
    selectModelo.value == 0 ||
    selectDescripcion.value == 0
  ) {
    swal({
      title: "Upss....!",
      text: "Todos los campos son requeridos.",
      icon: "warning",
      dangerMode: true,
    });
    return false;
  } else {
    swal({
      title: "Genial...!",
      text: "Has seleccionado todos los campos",
      icon: "success",
    }).then(function () {
      cleanSelect(selectMarca);
      cleanSelect(selectSubmarca);
      cleanSelect(selectModelo);
      cleanSelect(selectDescripcion);
      llenarSelectMarca();
    });
    return true;
  }
}
