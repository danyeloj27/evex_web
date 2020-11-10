let listaCamposVaciosTipoBanco = '';

function crearTablaTipoBanco() {
    var tableTipoBanco = $('#tbl-TipoBanco').DataTable({
        'destroy': true,
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/TipoBanco/ListaTipoBanco',
        'autoWidth': false,
        'order': [[1, "asc"]],
        'height': '10%',
        'columns': [
            {
                'title': 'ACCIÓN',
                'targets': -1,
                'data': null,
                'className': 'dt-body-center',
                'defaultContent': '<a class="editTipoBanco" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoTipoBanco" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a>',
                'width': '10%'
            },
            { 'data': 'Cod_Banco', 'title': 'CODIGO' },
            { 'data': 'Nom_Banco', 'title': 'TIPO' },
            { 'data': 'Cod_Sys_Contable', 'title': 'CODIGO CONTABLE' },
        ]
    });
};

function resetTipoBanco() {
    $('#datosTipoBanco').modal('hide');
    $('#registroTipoBanco input').val('');
};

function datoTipoBanco() {
    var tblArr1 = [];
    var tblParametro = {
        Cod_Banco: "",
        Nom_Banco: "",
        Cod_Sys_Contable: "",
        User_Log: ""


    };
    tblParametro.Cod_Banco = document.getElementById("Cod_Banco").value;
    tblParametro.Nom_Banco = (document.getElementById("Nom_Banco").value).toUpperCase();
    tblParametro.Cod_Sys_Contable = document.getElementById("Cod_Sys_Contable").value;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr1.push(tblParametro);
    return JSON.stringify(tblArr1);
};

function TipoBanco(Cod_Banco) {
    var tblArr = [];
    var tblParametro = {
        Cod_Banco: "",
        User_Log: ""
    };
    tblParametro.Cod_Banco = Cod_Banco;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr.push(tblParametro);

    return JSON.stringify(tblArr);
};

function validarVaciosTipoBanco() {
    camposVaciosTipoBanco = false;
    if (document.getElementById('Nom_Banco').value == '') {
        document.getElementById('Nom_Banco').setCustomValidity('No puede ser vacío');
        listaCamposVaciosTipoBanco = listaCamposVaciosTipoLicencia + 'Nombre del Banco, ';
        camposVaciosTipoBanco = true;
    }
    if (document.getElementById('Cod_Sys_Contable').value == '') {
        document.getElementById('Cod_Sys_Contable').setCustomValidity('No puede ser vacío');
        listaCamposVaciosTipoBanco = listaCamposVaciosTipoLicencia + 'Codigo Contable, ';
        camposVaciosTipoBanco = true;
    }
    console.log(listaCamposVaciosTipoBanco);
    return camposVaciosTipoBanco;
};

$(document).ready(function () {
    crearTablaTipoBanco();
});

$('#cerrarTipoBanco').on('click', function () {
    resetTipoBanco();
    document.getElementById('Cod_Banco').setCustomValidity('');
    document.getElementById('Nom_Banco').setCustomValidity('');
    document.getElementById('Cod_Sys_Contable').setCustomValidity('');

});

$(document).on("click", "#nuevoTipoBanco", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Banco
    nuevoTipoBanco = true;
    $('#Cod_Banco').attr('disabled', true);
    $('#datosTipoBanco').modal('show');
});

$(document).on("click", "#guardarTipoBanco", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Banco
    var vaciosTipoBanco = validarVaciosTipoBanco();
    if (vaciosTipoBanco == false) {
        if (nuevoTipoBanco == true) {
            $.ajax(ambiente + "/TipoBanco/GuardarTipoBanco", {
                type: "POST",
                contentType: "application/json",
                data: datoTipoBanco()
            }).done(function () {
                crearTablaTipoBanco();
                resetTipoBanco();
            })

        } else {
            $.ajax(ambiente + "/TipoBanco/ActualizarTipoBanco", {
                type: "POST",
                contentType: "application/json",
                data: datoTipoBanco()
            }).done(function () {
                crearTablaTipoBanco();
                resetTipoBanco();
            })
        }
    } else {
        listaCamposVaciosTipoBanco = listaCamposVaciosTipoBanco.substring(0, listaCamposVaciosTipoBanco.length - 2);
        $('#mensajeVacioTipoBanco').text('Verifique que los siguientes campos no hayan quedado vacíos: ' + listaCamposVaciosTipoBanco);
        $('#alertaCamposVaciosTipoBanco').modal('show');
        listaCamposVaciosTipoBanco = '';
    }
});

$(document).on("click", ".estadoInactivoTipoBanco", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Turno
    Nom_Banco = $(this).parents("tr").find("td:nth-child(3)").text();
    Cod_Banco = $(this).parents("tr").find("td:nth-child(2)").text();
    var nombreCompleto = document.getElementById('#usuario').innerText;
    var campos = nombreCompleto.split(' ');
    var soloNombre = campos[0];
    $('#msgTipoBanco').text('Estimado ' + soloNombre + ':');
    $('#msgTipoBanco1').text('¿Está seguro que desea eliminar este Banco ' + Nom_Banco + '?');
    $('#mensajeAlerta').modal('show');
});

$('#aceptarMensajeTipoBanco').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Turno
    $('#mensajeAlerta').modal('hide');
    var url = ambiente + '/TipoBanco/EliminarTipoBanco?Cod_Banco=' + Cod_Banco + '&&User_Log=' + document.getElementById('#usuario').innerText;
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            Resultado = entry.Resultado;
            $('#msgTipoBanco3').text(Resultado);
            $('#mensajeAlertaEliminarTipoBanco').modal('show');
        })
    });
});
$('#aceptarMensajeEliminarTipoBanco').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Turno
    crearTablaTipoBanco();
});

$(document).on("click", ".editTipoBanco", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Turno
    nuevoTipoBanco = false;
    var valor = document.getElementById('#usuario').innerText;
    if (valor.length != 0) {
        Cod_Banco = $(this).parents("tr").find("td:nth-child(2)").text();
        //Carga de datos del Tipo Banco
        var urlconvenio = ambiente + '/TipoBanco/editTipoBanco?Cod_Banco=' + Cod_Banco;
        $.getJSON(urlconvenio, function (dataconvenio) {
            $("#Cod_Banco").val(dataconvenio.Cod_Banco);
            $('#Cod_Banco').attr('disabled', true);
            $("#Nom_Banco").val(dataconvenio.Nom_Banco);
            $("#Cod_Sys_Contable").val(dataconvenio.Cod_Sys_Contable);
        });
        $('#datosTipoBanco').modal('show');
    } else {
        var url = ambiente + '/Login/Login';
        document.location.href = url;
    }
});

$('#datosTipoBanco').on('shown.bs.modal', function () {
    $('#Nom_Banco').focus();
});
