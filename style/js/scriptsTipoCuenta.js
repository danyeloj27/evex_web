let listaCamposVaciosTipoCuenta = '';

function crearTablaTipoCuenta() {
    var tableTipoCuenta = $('#tbl-TipoCuenta').DataTable({
        'destroy': true,
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/TipoCuenta/ListaTipoCuenta',
        'autoWidth': false,
        'order': [[1, "asc"]],
        'height': '10%',
        'columns': [
            {
                'title': 'ACCIÓN',
                'targets': -1,
                'data': null,
                'className': 'dt-body-center',
                'defaultContent': '<a class="editTipoCuenta" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoTipoCuenta" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a>',
                'width': '10%'
            },
            { 'data': 'Cod_Cuenta', 'title': 'CODIGO' },
            { 'data': 'Nom_Cuenta', 'title': 'TIPO' }
        ]
    });
};

function resetTipoCuenta() {
    $('#datosTipoCuenta').modal('hide');
    $('#registroTipoCuenta input').val('');
};

function validarVaciosTipoCuenta() {
    camposVaciosTipoCuenta = false;
    if (document.getElementById('Nom_Cuenta').value == '') {
        document.getElementById('Nom_Cuenta').setCustomValidity('No puede ser vacío');
        listaCamposVaciosTipoCuenta = listaCamposVaciosTipoCuenta + 'Nombre del tipo de Cuenta, ';
        camposVaciosTipoCuenta = true;
    }
    console.log(listaCamposVaciosTipoCuenta);
    return camposVaciosTipoCuenta;
};

function TipoCuenta(Cod_Cuenta) {
    var tblArr = [];
    var tblParametro = {
        Cod_Cuenta: "",
        User_Log: ""
    };
    tblParametro.Cod_Cuenta = Cod_Cuenta;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr.push(tblParametro);

    return JSON.stringify(tblArr);
};

function datoTipoCuenta() {
    var tblArr1 = [];
    var tblParametro = {
        Cod_Cuenta: "",
        Nom_Cuenta: "",
        User_Log: ""


    };
    tblParametro.Cod_Cuenta = document.getElementById("Cod_Cuenta").value;
    tblParametro.Nom_Cuenta = (document.getElementById("Nom_Cuenta").value).toUpperCase();
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr1.push(tblParametro);
    return JSON.stringify(tblArr1);
};

$(document).ready(function () {
    crearTablaTipoCuenta();
});

$('#cerrarTipoCuenta').on('click', function () {
    $('input').val('');
    document.getElementById('Cod_Cuenta').setCustomValidity('');
    document.getElementById('Nom_Cuenta').setCustomValidity('');
    $('#datosTipoCuenta').modal('hide');
});

$(document).on("click", "#nuevoTipoCuenta", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Cuentas
    nuevoTipoCuenta = true;
    $('#Cod_Cuenta').attr('disabled', true);
    $('#datosTipoCuenta').modal('show');
});

$(document).on("click", "#guardarTipoCuenta", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Cuentas
    var vaciosTipoCuenta = validarVaciosTipoCuenta();
    if (vaciosTipoCuenta == false) {
        if (nuevoTipoCuenta == true) {
            $.ajax(ambiente + "/TipoCuenta/GuardarTipoCuenta", {
                type: "POST",
                contentType: "application/json",
                data: datoTipoCuenta()
            }).done(function () {
                crearTablaTipoCuenta();
                resetTipoCuenta();
            })

        } else {
            $.ajax(ambiente + "/TipoCuenta/ActualizarTipoCuenta", {
                type: "POST",
                contentType: "application/json",
                data: datoTipoCuenta()
            }).done(function () {
                crearTablaTipoCuenta();
                resetTipoCuenta();
            })
        }
    } else {
        listaCamposVaciosTipoCuenta = listaCamposVaciosTipoCuenta.substring(0, listaCamposVaciosTipoCuenta.length - 2);
        $('#mensajeVacioTipoCuenta').text('Verifique que los siguientes campos no hayan quedado vacíos: ' + listaCamposVaciosTipoCuenta);
        $('#alertaCamposVaciosTipoCuenta').modal('show');
        listaCamposVaciosTipoCuenta = '';
    }
});

$(document).on("click", ".estadoInactivoTipoCuenta", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Cuentas
    Nom_Cuenta = $(this).parents("tr").find("td:nth-child(3)").text();
    Cod_Cuenta = $(this).parents("tr").find("td:nth-child(2)").text();
    var nombreCompleto = document.getElementById('#usuario').innerText;
    var campos = nombreCompleto.split(' ');
    var soloNombre = campos[0];
    $('#msgTipoCuenta').text('Estimado ' + soloNombre + ':');
    $('#msgTipoCuenta1').text('¿Está seguro que desea eliminar el tipo de Cuenta ' + Nom_Cuenta + '?');
    $('#mensajeAlerta').modal('show');
});

$('#aceptarMensajeTipoCuenta').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Cuentas
    $('#mensajeAlerta').modal('hide');
    var url = ambiente + '/TipoCuenta/EliminarTipoCuenta?Cod_Cuenta=' + Cod_Cuenta + '&&User_Log=' + document.getElementById('#usuario').innerText;
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            Resultado = entry.Resultado;
            $('#msgTipoCuenta3').text(Resultado);
            $('#mensajeAlertaEliminarTipoCuenta').modal('show');
        })
    });
});
$('#aceptarMensajeEliminarTipoCuenta').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Cuentas
    crearTablaTipoCuenta();
    resetTipoCuenta();
});

$(document).on("click", ".editTipoCuenta", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de cuentas
    nuevoTipoCuenta = false;
    var valor = document.getElementById('#usuario').innerText;
    if (valor.length != 0) {
        Cod_Cuenta = $(this).parents("tr").find("td:nth-child(2)").text();
        //Carga de datos del Tipo Contrato
        var urlconvenio = ambiente + '/TipoCuenta/editTipoCuenta?Cod_Cuenta=' + Cod_Cuenta;
        $.getJSON(urlconvenio, function (dataconvenio) {
            $("#Cod_Cuenta").val(dataconvenio.Cod_Cuenta);
            $('#Cod_Cuenta').attr('disabled', true);
            $("#Nom_Cuenta").val(dataconvenio.Nom_Cuenta);
        });
        $('#datosTipoCuenta').modal('show');
    } else {
        var url = ambiente + '/Login/Login';
        document.location.href = url;
    }
});

$('#datosTipoCuenta').on('shown.bs.modal', function () {
    $('#Nom_Cuenta').focus();
});