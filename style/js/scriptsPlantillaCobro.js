let codigoPlantilla;
let valorVehiculo;
let tipoVehiculo;
let nuevaPlantilla = false;
let fila;

function datosPlantilla(campo, valor) {
    var tblArr = [];
    var tblParametro = {
        Cod_Plantilla: "",
        Campo: "",
        Valor: ""
    };
    tblParametro.Cod_Plantilla = codigoPlantilla;
    tblParametro.Campo = campo;
    tblParametro.Valor = valor;
    tblArr.push(tblParametro);
    console.log(tblArr);
    return JSON.stringify(tblArr);
};

function limipiarDatosPlantilla() {
    $('#datosPlantilla').modal('hide');
    $('#codPlantilla').attr('disabled', true);
    $('#descPlantilla').val('');
    $('#tbl-plantillaVehiculo tbody').empty();
};

function datosNombrePlanilla() {
    var nombrePlantilla = $('#nombreInicialPlantilla').val(); 
    var tblArr = [];
    var tblParametro = {
        Nom_Plnatilla_Cobro: ""
    };
    tblParametro.Nom_Plnatilla_Cobro = nombrePlantilla.toUpperCase();
    console.log('aqui', nombrePlantilla.toUpperCase());
    tblArr.push(tblParametro);
    return JSON.stringify(tblArr);
}

function crearTabla() {
    var table = $('#tbl-plantilla').DataTable({
        'destroy': true,
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/PlantillaCobro/ListaPlantillaCobro',
        'autoWidth': false,
        'order': [[1, "asc"]],
        'height': '10%',
        'columns': [
            {
                'title': 'ACCIÓN',
                'targets': -1,
                'data': null,
                'className': 'dt-body-center',
                'defaultContent': '<a class="editPlantillaCobro" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="eliminarPlantillaCobro" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a>',
                'width': '10%'
            },
            { 'data': 'Cod_Plantilla', 'title': 'CODIGO' },
            { 'data': 'Nom_Plnatilla_Cobro', 'title': 'NOMBRE' }
        ]
    });
}

$(document).ready(function () {
    crearTabla();
});

$(document).on('click', '.editPlantillaCobro', function () {
    $('#codPlantilla').attr('disabled', true);
    nuevaPlantilla = false;
    var url = ambiente + '/PlantillaCobro/BuscarPlantillaCobro?codPlantilla=' + $(this).parents("tr").find("td:nth-child(2)").text();
    $.getJSON(url, function (dataplantilla) {
        codigoPlantilla = dataplantilla.Cod_Plantilla;
        $('#codPlantilla').val(dataplantilla.Cod_Plantilla);
        $('#descPlantilla').val(dataplantilla.Nom_Plnatilla_Cobro);
        var urltipoVehiculo = ambiente + '/PlantillaCobro/TipoVehiculo';
        $.getJSON(urltipoVehiculo, function (datatipoVehiculo) {
            $.each(datatipoVehiculo, function (i, item) {
                var urlvalores = ambiente + '/PlantillaCobro/BuscarValoresVehiculo?codPlantilla=' + codigoPlantilla + '&&columna=' + item.tipoVehiculo;
                $.getJSON(urlvalores, function (dataplantilla) {
                    console.log('BuscarValoresVehiculo ', dataplantilla.valoresVehiculo)
                    valorVehiculo = dataplantilla.valoresVehiculo;
                }).done(function () {
                    $("#tbl-plantillaVehiculo tbody").append(
                        "<tr>"
                        + "<td>" +
                        '<a class= "editValores" title = "Editar Valores" data-toggle="modal" data-target="" > <i class="material-icons" style="color: #007bff;">&#xE254;</i></a >'
                        + "</td>"
                        + "<td>" + item.tipoVehiculo + "</td>"
                        + "<td>" + valorVehiculo.BAJADA_BANDERA + "</td>"
                        + "<td>" + valorVehiculo.VALOR_KM + "</td>"
                        + "<td>" + valorVehiculo.VALOR_TAG + "</td>"
                        + "<td>" + valorVehiculo.MINUTO_ESPERA + "</td>"
                        + "<td>" + valorVehiculo.VALOR_200MTS + "</td>"
                        + "<td>" + valorVehiculo.BAJADA_BANDERA_VIP + "</td>"
                        + "<td>" + valorVehiculo.VALOR_KM_VIP + "</td>"
                        + "<td>" + valorVehiculo.VALOR_TAG_VIP + "</td>"
                        + "<td>" + valorVehiculo.MINUTO_ESPERA_VIP + "</td>"
                        + "<td>" + valorVehiculo.VALOR_200MTS_VIP + "</td>"
                        + "<td>" + valorVehiculo.MINUTO_ESPERA_VIP + "</td>"
                        + "</tr>"
                    );
                })
            })
        }).done(function () {
            $('#datosPlantilla').modal('show');
        });
    });

});

$('#cerrarPlantilla').on('click', function () {
    $('#datosPlantilla').modal('hide');
})

$('#nuevaPlantilla').on('click', function () {
    nuevaPlantilla = true;
    $('#nombrePlantilla').modal('show');
    $('#codPlantilla').attr('disabled', true);
    $('#nombreInicialPlantilla').val('');
    $('#descPlantilla').val('');
    $('#tbl-plantillaVehiculo tbody').empty();
});

$('#cerrarNombrePlantilla').on('click', function () {
    $('#nombrePlantilla').modal('hide');
});

$('#guardarNombrePlantilla').on('click', function () {
    if (nuevaPlantilla == true) {
        var url = ambiente + '/PlantillaCobro/GuardarNombrePlantilla?NombrePlanilla=' + ($('#nombreInicialPlantilla').val()).toUpperCase();
        $.getJSON(url, function (data) {
            $.each(data, function (key, entry) {
                codigoPlantilla = entry.Cod_Plantilla;
            });
        }).done(function () {
            $('#codPlantilla').attr('disabled', true);
            $('#descPlantilla').attr('disabled', true);
            nuevaPlantilla = false;
            var url = ambiente + '/PlantillaCobro/BuscarPlantillaCobro?codPlantilla=' + codigoPlantilla;
            $.getJSON(url, function (dataplantilla) {
                codigoPlantilla = dataplantilla.Cod_Plantilla;
                $('#codPlantilla').val(dataplantilla.Cod_Plantilla);
                $('#descPlantilla').val(dataplantilla.Nom_Plnatilla_Cobro);
                var urltipoVehiculo = ambiente + '/PlantillaCobro/TipoVehiculo';
                $.getJSON(urltipoVehiculo, function (datatipoVehiculo) {
                    $.each(datatipoVehiculo, function (i, item) {
                        var urlvalores = ambiente + '/PlantillaCobro/BuscarValoresVehiculo?codPlantilla=' + codigoPlantilla + '&&columna=' + item.tipoVehiculo;
                        $.getJSON(urlvalores, function (dataplantilla) {
                            console.log('BuscarValoresVehiculo ', dataplantilla.valoresVehiculo)
                            valorVehiculo = dataplantilla.valoresVehiculo;
                        }).done(function () {
                            $("#tbl-plantillaVehiculo tbody").append(
                                "<tr>"
                                + "<td>" +
                                '<a class= "editValores" title = "Editar Valores" data-toggle="modal" data-target="" > <i class="material-icons" style="color: #007bff;">&#xE254;</i></a >'
                                + "</td>"
                                + "<td>" + item.tipoVehiculo + "</td>"
                                + "<td>" + valorVehiculo.BAJADA_BANDERA + "</td>"
                                + "<td>" + valorVehiculo.VALOR_KM + "</td>"
                                + "<td>" + valorVehiculo.VALOR_TAG + "</td>"
                                + "<td>" + valorVehiculo.MINUTO_ESPERA + "</td>"
                                + "<td>" + valorVehiculo.VALOR_200MTS + "</td>"
                                + "<td>" + valorVehiculo.BAJADA_BANDERA_VIP + "</td>"
                                + "<td>" + valorVehiculo.VALOR_KM_VIP + "</td>"
                                + "<td>" + valorVehiculo.VALOR_TAG_VIP + "</td>"
                                + "<td>" + valorVehiculo.MINUTO_ESPERA_VIP + "</td>"
                                + "<td>" + valorVehiculo.VALOR_200MTS_VIP + "</td>"
                                + "<td>" + valorVehiculo.MINUTO_ESPERA_VIP + "</td>"
                                + "</tr>"
                            );
                        })
                    })
                }).done(function () {
                    $('#nombrePlantilla').modal('hide');
                    $('#datosPlantilla').modal('show');
                });
            });
        })
    }
});

$(document).on("click", ".editValores", function () {
    tipoVehiculo = $(this).parents("tr").find("td:nth-child(2)").text();
    var urlvalores = ambiente + '/PlantillaCobro/BuscarValoresVehiculo?codPlantilla=' + codigoPlantilla + '&&columna=' + $(this).parents("tr").find("td:nth-child(2)").text();
    $.getJSON(urlvalores, function (dataplantilla) {
        $('#bajadaBandera').val(dataplantilla.valoresVehiculo.BAJADA_BANDERA);
        $('#valorKm').val(dataplantilla.valoresVehiculo.VALOR_KM);
        $('#valorTag').val(dataplantilla.valoresVehiculo.VALOR_TAG);
        $('#valorMinuto').val(dataplantilla.valoresVehiculo.MINUTO_ESPERA);
        $('#valor200Mts').val(dataplantilla.valoresVehiculo.VALOR_200MTS);
        $('#bajadaBanderaVip').val(dataplantilla.valoresVehiculo.BAJADA_BANDERA_VIP);
        $('#valorKmVip').val(dataplantilla.valoresVehiculo.VALOR_KM_VIP);
        $('#valorTagVip').val(dataplantilla.valoresVehiculo.VALOR_TAG_VIP);
        $('#valorMinutoVip').val(dataplantilla.valoresVehiculo.MINUTO_ESPERA_VIP);
        $('#valor200MtsVip').val(dataplantilla.valoresVehiculo.VALOR_200MTS_VIP);
        $('#tarifaMinima').val(dataplantilla.valoresVehiculo.TARIFA_MINIMA);
    }).done(function () {
        $('#datosPlantilla').modal('hide');
        $('#datosValoresVehiculos').modal('show');
    })
});

$('#guardarValoresVehiculo').on('click', function () {
    plantilla = document.getElementById('tbl-plantillaVehiculo');
    var valorJson = '{';
    valorJson += '"VALOR_KM": "' + $('#valorKm').val() + '", ';
    valorJson += '"VALOR_TAG": "' + $('#valorTag').val() + '", ';
    valorJson += '"VALOR_200MTS": "' + $('#valor200Mts').val() + '", ';
    valorJson += '"VALOR_KM_VIP": "' + $('#valorKmVip').val() + '", ';
    valorJson += '"MINUTO_ESPERA": "' + $('#valorMinuto').val() + '", ';
    valorJson += '"TARIFA_MINIMA": "' + $('#tarifaMinima').val() + '", ';
    valorJson += '"VALOR_TAG_VIP": "' + $('#valorTagVip').val() + '", ';
    valorJson += '"BAJADA_BANDERA": "' + $('#bajadaBandera').val() + '", ';
    valorJson += '"VALOR_200MTS_VIP": "' + $('#valor200MtsVip').val() + '", ';
    valorJson += '"MINUTO_ESPERA_VIP": "' + $('#valorMinutoVip').val() + '", ';
    valorJson += '"BAJADA_BANDERA_VIP": "' + $('#bajadaBanderaVip').val() + '"';
    valorJson += '}';
    plantilla.rows[fila + 1].cells[2].innerHTML = $('#bajadaBandera').val();
    plantilla.rows[fila + 1].cells[3].innerHTML = $('#valorKm').val();
    plantilla.rows[fila + 1].cells[4].innerHTML = $('#valorTag').val();
    plantilla.rows[fila + 1].cells[5].innerHTML = $('#valorMinuto').val();
    plantilla.rows[fila + 1].cells[6].innerHTML = $('#valor200Mts').val();
    plantilla.rows[fila + 1].cells[7].innerHTML = $('#bajadaBanderaVip').val();
    plantilla.rows[fila + 1].cells[8].innerHTML = $('#valorKmVip').val();
    plantilla.rows[fila + 1].cells[9].innerHTML = $('#valorTagVip').val();
    plantilla.rows[fila + 1].cells[10].innerHTML = $('#valorMinutoVip').val();
    plantilla.rows[fila + 1].cells[11].innerHTML = $('#valor200MtsVip').val();
    plantilla.rows[fila + 1].cells[12].innerHTML = $('#tarifaMinima').val();
    $.ajax(ambiente + "/PlantillaCobro/GuardarPlantilla", {
        type: "POST",
        contentType: "application/json",
        data: datosPlantilla(tipoVehiculo, valorJson)
    }).done(function () {
        $('#datosValoresVehiculos').modal('hide');
        $('#datosPlantilla').modal('show');
    })
});

$('#cerrarValoresVehiculo').on('click', function () {
    $('#datosValoresVehiculos').modal('hide');
    $('#datosPlantilla').modal('show');
});

$('#guardarDatosPlantilla').on('click', function () {

    $('#nombrePlantilla').modal('show');
    limipiarDatosPlantilla();
});

$('#cerrarDatosPlantilla').on('click', function () {
    limipiarDatosPlantilla();
    crearTabla();
});

$('#nombrePlantilla').on('shown.bs.modal', function () {
    $('#nombreInicialPlantilla').focus();
})

$('#datosPlantilla').on('shown.bs.modal', function () {
    $('#descPlantilla').focus();
})

$('#datosValoresVehiculos').on('shown.bs.modal', function () {
    $('#bajadaBandera').focus();
})

$("#tbl-plantillaVehiculo").on("mouseenter", "td", function () {
    fila = $(this).closest("tr").index();
});