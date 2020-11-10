let listaCamposVaciosTipoContrato = '';

function crearTablaTipoContrato() {
    var tableTipoContrato = $('#tbl-TipoContrato').DataTable({
        'destroy': true,
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/TipoContrato/ListaTipoContrato',
        'autoWidth': false,
        'order': [[1, "asc"]],
        'height': '10%',
        'columns': [
            {
                'title': 'ACCIÓN',
                'targets': -1,
                'data': null,
                'className': 'dt-body-center',
                'defaultContent': '<a class="editTipoContrato" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoTipoContrato" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a>',
                'width': '10%'
            },
            { 'data': 'Cod_Contrato', 'title': 'CODIGO' },
            { 'data': 'Nom_Contrato', 'title': 'TIPO' },
            { 'data': 'Tipo_Descuento', 'title': 'DESCUENTOS' },
            { 'data': 'Valor_Descuento', 'title': 'VALOR' }
        ]
    });
};

function resetTipoContrato() {
    $('#datosTipoContrato').modal('hide');
    $('#registroTipoContrato input').val('');
}

function validarVaciosTipoContrato() {
    camposVaciosTipoContrato = false;
    if (document.getElementById('Nom_Contrato').value == '') {
        document.getElementById('Nom_Contrato').setCustomValidity('No puede ser vacío');
        listaCamposVaciosTipoContrato = listaCamposVaciosTipoContrato + 'Nombre tipo Contrato, ';
        camposVaciosTipoContrato = true;
    }
    if (document.getElementById('Tipo_Descuento').value == '') {
        document.getElementById('Tipo_Descuento').setCustomValidity('No puede ser vacío');
        listaCamposVaciosTipoContrato = listaCamposVaciosTipoContrato + 'tipo Contrato, ';
        camposVaciosTipoContrato = true;
    }
    if (document.getElementById('Valor_Descuento').value == '') {
        document.getElementById('Valor_Descuento').setCustomValidity('No puede ser vacío');
        listaCamposVaciosTipoContrato = listaCamposVaciosTipoContrato + 'Valor tipo Contrato, ';
        camposVaciosTipoContrato = true;
    }
    console.log(listaCamposVaciosTipoContrato);
    return camposVaciosTipoContrato;
}

function datoTipoContrato() {
    var tblArr1 = [];
    var tblParametro = {
        Cod_Contrato: "",
        Nom_Contrato: "",
        Tipo_Descuento: "",
        Valor_Descuento: "",
        User_Log: ""
    };
    tblParametro.Cod_Contrato = document.getElementById("Cod_Contrato").value;
    tblParametro.Nom_Contrato = (document.getElementById("Nom_Contrato").value).toUpperCase();
    tblParametro.Tipo_Descuento = (document.getElementById("Tipo_Descuento").value).toUpperCase();
    tblParametro.Valor_Descuento = document.getElementById("Valor_Descuento").value;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr1.push(tblParametro);
    return JSON.stringify(tblArr1);
}

function TipoContrato(Cod_Contrato) {
    var tblArr = [];
    var tblParametro = {
        Cod_Contrato: "",
        User_Log: ""
    };
    tblParametro.Cod_Contrato = Cod_Contrato;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr.push(tblParametro);
    return JSON.stringify(tblArr);
}

$(document).ready(function () {
    crearTablaTipoContrato()
});

$('#cerrarTipoContrato').on('click', function () {
    $('input').val('');
    document.getElementById('Cod_Contrato').setCustomValidity('');
    document.getElementById('Nom_Contrato').setCustomValidity('');
    document.getElementById('Tipo_Descuento').setCustomValidity('');
    document.getElementById('Valor_Descuento').setCustomValidity('');
    $('#datosTipoContrato').modal('hide');
})

$(document).on("click", "#nuevoTipoContrato", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    nuevoTipoContrato = true;
    $('#Cod_Contrato').attr('disabled', true);
    $('#datosTipoContrato').modal('show');
});

$(document).on("click", "#guardarTipoContrato", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    var vaciosTipoContrato = validarVaciosTipoContrato();
    if (vaciosTipoContrato == false) {
        if (nuevoTipoContrato == true) {
            $.ajax(ambiente + "/TipoContrato/GuardarTipoContrato", {
                type: "POST",
                contentType: "application/json",
                data: datoTipoContrato()
            }).done(function () {
                crearTablaTipoContrato();
                resetTipoContrato();
            })

        } else {
            $.ajax(ambiente + "/TipoContrato/ActualizarTipoContrato", {
                type: "POST",
                contentType: "application/json",
                data: datoTipoContrato()
            }).done(function () {
                crearTablaTipoContrato();
                resetTipoContrato();
            })
        }
    } else {
        listaCamposVaciosTipoContrato = listaCamposVaciosTipoContrato.substring(0, listaCamposVaciosTipoContrato.length - 2);
        $('#mensajeVacioTipoContrato').text('Verifique que los siguientes campos no hayan quedado vacíos: ' + listaCamposVaciosTipoContrato);
        $('#alertaCamposVaciosTipoContrato').modal('show');
        listaCamposVaciosTipoContrato = '';
    }
});

$(document).on("click", ".estadoInactivoTipoContrato", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    Nom_Contrato = $(this).parents("tr").find("td:nth-child(3)").text();
    Cod_Contrato = $(this).parents("tr").find("td:nth-child(2)").text();
    var nombreCompleto = document.getElementById('#usuario').innerText;
    var campos = nombreCompleto.split(' ');
    var soloNombre = campos[0];
    $('#msgTipoContrato').text('Estimado ' + soloNombre + ':');
    $('#msgTipoContrato1').text('¿Está seguro que desea eliminar el Tipo de Contrato ' + Nom_Contrato + '?');
    $('#mensajeAlerta').modal('show');
});

$('#aceptarMensajeTipoContrato').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    $('#mensajeAlerta').modal('hide');
    var url = ambiente + '/TipoContrato/EliminarTipoContrato?Cod_Contrato=' + Cod_Contrato + '&&User_Log=' + document.getElementById('#usuario').innerText;
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            Resultado = entry.Resultado;
            $('#msgTipoContrato3').text(Resultado);
            $('#mensajeAlertaEliminarTipoContrato').modal('show');
        })
    });
});
$('#aceptarMensajeEliminarTipoContrato').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    crearTablaTipoContrato();
    resetTipoContrato();
});

$(document).on("click", ".editTipoContrato", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    nuevoTipoContrato = false;
    var valor = document.getElementById('#usuario').innerText;
    if (valor.length != 0) {
        Cod_Contrato = $(this).parents("tr").find("td:nth-child(2)").text();
        //Carga de datos del Tipo Contrato
        var urlconvenio = ambiente + '/TipoContrato/editTipoContrato?Cod_Contrato=' + Cod_Contrato;
        $.getJSON(urlconvenio, function (dataconvenio) {
            $("#Cod_Contrato").val(dataconvenio.Cod_Contrato);
            $('#Cod_Contrato').attr('disabled', true);
            $("#Nom_Contrato").val(dataconvenio.Nom_Contrato);
            $("#Tipo_Descuento").val(dataconvenio.Tipo_Descuento);
            $("#Valor_Descuento").val(dataconvenio.Valor_Descuento);
        });
        $('#datosTipoContrato').modal('show');
    } else {
        var url = ambiente + '/Login/Login';
        document.location.href = url;
    }
});

$('#datosTipoContrato').on('shown.bs.modal', function () {
    $('#Nom_Contrato').focus();
});