let selectMarca;
$(document).ready(function () {
  let txtCodigoPostal = document.getElementById("txtCodigoPostal");
  txtCodigoPostal.onkeypress = function (e) {
    if (isNaN(this.value + String.fromCharCode(e.charCode))) return false;
  };
  txtCodigoPostal.onpaste = function (e) {
    e.preventDefault();
  };

  txtCodigoPostal.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      cargaDireccion();
    }
  });

  $("#frmDomicilio").on("submit", function (e) {
    e.preventDefault();
    let validate = validarFrmDomicilio();
    if (validate) {
    }
  });
});

function validarFrmDomicilio() {
  let txtCodigoPostal, txtEstado, txtMunicipio, txtColonia;
  txtCodigoPostal = document.getElementById("txtCodigoPostal").value;
  txtEstado = document.getElementById("txtEstado");
  txtMunicipio = document.getElementById("txtMunicipio");
  txtColonia = document.getElementById("txtColonia");
  if (
    txtCodigoPostal.value == "" ||
    txtEstado.value == 0 ||
    txtMunicipio.value == 0 ||
    txtColonia.value == 0
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
      cleanFrmDomiciliO();
    });
    return true;
  }
}
function cleanFrmDomiciliO() {
  document.getElementById("frmDomicilio").reset();
}
async function cargaDireccion(event) {
  let data;
  let txtCodigoPostal = document.getElementById("txtCodigoPostal").value;
  let txtEstado = document.getElementById("txtEstado");
  let txtMunicipio = document.getElementById("txtMunicipio");
  let txtColonia = document.getElementById("txtColonia");

  if (txtCodigoPostal.length >= 5) {
    let reqDireccion = {
      NombreCatalogo: "Sepomex",
      Filtro: txtCodigoPostal,
      IdAplication: 2,
    };
    let urlApi = "https://apitestcotizamatico.azurewebsites.net/api/catalogos";

    const requests = await fetch(urlApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqDireccion),
    });
    const res = await requests.json();
    data = JSON.parse(res.CatalogoJsonString);
    txtEstado.value = data[0].Municipio.Estado.sEstado;
    txtMunicipio.value = data[0].Municipio.sMunicipio;
    txtColonia.value = data[0].Ubicacion[0].sUbicacion;
    return data;
  } else {
    swal({
      title: "Upss....!",
      text: "Deves ingresar 5 caracteres solo se permiten números",
      icon: "warning",
      dangerMode: true,
    });
  }
}
