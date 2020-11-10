function crearTablaHolding() {
    var tableholding = $('#tbl-Holding').DataTable({
        'destroy': true,
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/Holding/ListaHolding',
        'autoWidth': false,
        'order': [[1, "asc"]],
        'height': '10%',
        'columns': [
            {
                'title': 'ACCIÓN',
                'targets': -1,
                'data': 'Estado',
                'className': 'dt-body-center',
                'render': function (data, type, full, meta) {
                    return (data === 'ACTIVO') ?
                        '<a class="editHolding" title="Editar""><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoHolding" title="Desactivar" data-toggle="tooltip"><i class="fas fa-check-circle" style="color: #039d06;"></i></a><a class="infoHolding" title="Info" data-toggle="tooltipHolding"><i class="fas fa-info-circle" style="color: #ff6c00;"></i></a>' :
                        '<a class="editHolding" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoHolding" title="Activar" data-toggle="tooltip"><i class="fas fa-times-circle" style="color: #E34724;"></i></a><a class="infoHolding" title="Info" data-toggle="tooltipHolding"><i class="fas fa-info-circle" style="color: #ff6c00;"></i></a>';
                },
                'width': '10%'
            },
            {
                'data': 'Rut',
                'title': 'RUT'
            },
            { 'data': 'Nom_Fantasia', 'title': 'NOM. FANTASÍA' },
            { 'data': 'Estado', 'title': 'ESTADO' },
            { 'data': 'Motivo', 'title': 'MOTIVO', 'visible': false }
        ]
    });
}


$(document).ready(function () {
    crearTablaHolding();
});

$("#tbl-Holding").on("mouseenter", "td", function () {
    filaHolding = $('#tbl-Holding').DataTable().cell(this).index().row;
    var dataholding = $('#tbl-Holding').DataTable().row(filaHolding).data();
    titulo = dataholding['Motivo'];
    if (dataholding['Motivo'] != null) {
        $('[data-toggle="tooltipHolding"]').attr("title", titulo).tooltip("_fixTitle");
    }
});

$("#tbl-Holding").on("mouseleave", "td", function () {
    $('[data-toggle="tooltipHolding"]').tooltip('dispose');
});

function limpiarModalHolding() {
    $('input').val('');
    document.getElementById('Rut').setCustomValidity('');
    document.getElementById('Razon_Social').setCustomValidity('');
    document.getElementById('Nom_Fantasia').setCustomValidity('');
    document.getElementById('Direccion').setCustomValidity('');
    $('#datosHolding').modal('hide');
}

$('#cerrarHolding').on('click', function () {
    limpiarModalHolding();
})


$(document).on("click", "#nuevoHolding", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    nuevoHolding = true;
    $('#datosHolding').modal('show');
});

$(document).on("click", "#guardarHolding", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    var vaciosHolding = validarVaciosHolding();
    if (vaciosHolding == false) {
        if (nuevoHolding == true) {
            $.ajax(ambiente + "/Holding/GuardarHolding", {
                type: "POST",
                contentType: "application/json",
                data: datoHolding()
            }).done(function () {
                limpiarModalHolding();
                crearTablaHolding();
            })

        } else {
            $.ajax(ambiente + "/Holding/ActualizarHolding", {
                type: "POST",
                contentType: "application/json",
                data: datoHolding()
            }).done(function () {
                limpiarModalHolding();
                crearTablaHolding();
            })
        }
    } else {
        listaCamposVaciosHolding = listaCamposVaciosHolding.substring(0, listaCamposVaciosHolding.length - 2);
        $('#mensajeVacioHolding').text('Verifique que los siguientes campos no hayan quedado vacíos: ' + listaCamposVaciosHolding);
        $('#alertaCamposVaciosHolding').modal('show');
        listaCamposVaciosHolding = '';
    }
});

function datoHolding() {
    var tblArr1 = [];
    var tblParametro = {
        Rut: "",
        Razon_Social: "",
        Nom_Fantasia: "",
        Direccion: "",
        Obs: "",
        Estado: "",
        User_Log: ""


    };
    tblParametro.Rut = document.getElementById("Rut").value;
    tblParametro.Razon_Social = (document.getElementById("Razon_Social").value).toUpperCase();
    tblParametro.Nom_Fantasia = (document.getElementById("Nom_Fantasia").value).toUpperCase();
    tblParametro.Direccion = (document.getElementById("Direccion").value).toUpperCase();
    tblParametro.Obs = (document.getElementById("Obs").value).toUpperCase();
    tblParametro.Estado = 'ACTIVO';
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr1.push(tblParametro);
    return JSON.stringify(tblArr1);
}

$(document).on("click", ".estadoInactivoHolding", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    holding = $(this).parents("tr").find("td:nth-child(3)").text();
    var nombreCompleto = document.getElementById('#usuario').innerText;
    var campos = nombreCompleto.split(' ');
    var soloNombre = campos[0];
    codigoHoldingSel = $(this).parents('tr').find('td:nth-child(2)').text();
    if ($(this).parents('tr').find('td:nth-child(4)').text() == 'ACTIVO') {
        estadoHoldingSel = 'INACTIVO';
    } else {
        estadoHoldingSel = 'ACTIVO';
    }
    $('#msgHolding1').text('Estimado ' + soloNombre + ':');
    $('#msgHolding2').text('¿Está seguro que desea cambiar de estado al holding: ');
    $('#msgHolding3').text(holding);
    $('#mensajeAlertaEstadoHolding').modal('show');
});

$('#aceptarMensajeEstadoHolding').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    //$('#mensajeAlerta').modal('show');
    $('#mensajeAlertaEstadoHolding').modal('hide');
    $('#modalCambioEstadoHolding').modal('show');
});

$('#cerrarMensajeEstadoHolding').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    crearTablaHolding()
});

$('#modalCambioEstadoHolding').on('shown.bs.modal', function () {
    $('#motivoCambioEstadoHolding').focus();
})

$('#cerrarCambioEstadorHolding').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    crearTablaHolding()
});

$('#guardarCambioEstadoHolding').on('click', function () {
    $.ajax(ambiente + "/Holding/ActualizarEstadoHolding", {
        type: "POST",
        contentType: "application/json",
        data: EstadoHolding(codigoHoldingSel, estadoHoldingSel)
    }).done(function () {
        $('#tbl-Holding').DataTable().ajax.reload();
        $('#mensajeAlertaHolding').modal('hide');
        $('#modalCambioEstadoHolding').modal('hide');
        $('#motivoCambioEstadoHolding').val('');
    });
});

function Holding(Rut) {
    var tblArr = [];
    var tblParametro = {
        Rut: "",
        User_Log: ""
    };
    tblParametro.Rut = Rut;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr.push(tblParametro);

    return JSON.stringify(tblArr);
}


$(document).on("click", ".editHolding", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    nuevoHolding = false;
    var valor = document.getElementById('#usuario').innerText;
    if (valor.length != 0) {
        Rut = $(this).parents("tr").find("td:nth-child(2)").text();
        //Carga de datos del Holding
        var urlconvenio = ambiente + '/Holding/editHolding?Rut=' + Rut;
        $.getJSON(urlconvenio, function (dataconvenio) {
            $("#Rut").val(dataconvenio.Rut);
            $("#Razon_Social").val(dataconvenio.Razon_Social);
            $("#Nom_Fantasia").val(dataconvenio.Nom_Fantasia);
            $("#Direccion").val(dataconvenio.Direccion);
            $("#Obs").val(dataconvenio.Observacion);
            $("#Estado").val(dataconvenio.Estado);
        });
        $('#datosHolding').modal('show');
    } else {
        var url = ambiente + '/Login/Login';
        document.location.href = url;
    }
});