let listaCamposVaciosTipoLicencia = '';

function crearTablaTipoLicencia() {
    var tableTipoLicencia = $('#tbl-TipoLicencia').DataTable({
        'destroy': true,
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'scrollX': true,
        'scrollcollapse': true,
        'ajax': ambiente + '/TipoLicencia/ListaTipoLicencia',
        'autoWidth': false,
        'order': [[1, "asc"]],
        'height': '10%',
        'columns': [
            {
                'title': 'ACCIÓN',
                'targets': -1,
                'data': null,
                'defaultContent': '<a class="editTipoLicencia" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoTipoLicencia" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a>',
                'width': '10%'
            },
            { 'data': 'Cod_Licencia', 'title': 'CODIGO', 'width': '100px' },
            { 'data': 'Nom_Licencia', 'title': 'TIPO' },
            { 'data': 'Descripcion', 'title': 'DESCRIPCION', 'className': 'left' }
        ]
    });
};

function resetTipoLicencia() {
    $('#datosTipoLicencia').modal('hide');
    $('#registroTipoLicencia input').val('');
};

function validarVaciosTipoLicencia() {
    camposVaciosTipoLicencia = false;
    if (document.getElementById('Nom_Licencia').value == '') {
        document.getElementById('Nom_Lincencia').setCustomValidity('No puede ser vacío');
        listaCamposVaciosTipoLicencia = listaCamposVaciosTipoLicencia + 'Nombre de la licencia, ';
        camposVaciosTipoGrupo = true;
    }
    if (document.getElementById('Descripcion').value == '') {
        document.getElementById('Descripcion').setCustomValidity('No puede ser vacío');
        listaCamposVaciosTipoLicencia = listaCamposVaciosTipoLicencia + 'Descripcion de la Licencia, ';
        camposVaciosTipoLicencia = true;
    }
    console.log(listaCamposVaciosTipoLicencia);
    return camposVaciosTipoLicencia;
};

function TipoLicencia(Cod_Licencia) {
    var tblArr = [];
    var tblParametro = {
        Cod_Licencia: "",
        User_Log: ""
    };
    tblParametro.Cod_Licencia = Cod_Licencia;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr.push(tblParametro);

    return JSON.stringify(tblArr);
};

function datoTipoLicencia() {
    var tblArr1 = [];
    var tblParametro = {
        Cod_Licencia: "",
        Nom_Licencia: "",
        Descripcion: "",
        User_Log: ""


    };
    tblParametro.Cod_Licencia = document.getElementById("Cod_Licencia").value;
    tblParametro.Nom_Licencia = (document.getElementById("Nom_Licencia").value).toUpperCase();
    tblParametro.Descripcion = (document.getElementById("Descripcion").value).toUpperCase();
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr1.push(tblParametro);
    return JSON.stringify(tblArr1);
};

$(document).ready(function () {
    crearTablaTipoLicencia();
});

$('#cerrarTipoLicencia').on('click', function () {
    resetTipoLicencia();
    document.getElementById('Cod_Licencia').setCustomValidity('');
    document.getElementById('Nom_Licencia').setCustomValidity('');
    document.getElementById('Descripcion').setCustomValidity('');
    $('#datosTipoLicencia').modal('hide');
})


$(document).on("click", "#nuevoTipoLicencia", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Licencia
    nuevoTipoLicencia = true;
    $('#Cod_Licencia').attr('disabled', true);
    $('#datosTipoLicencia').modal('show');
});

$(document).on("click", "#guardarTipoLicencia", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Licencia
    var vaciosTipoLicencia = validarVaciosTipoLicencia();
    if (vaciosTipoLicencia == false) {
        if (nuevoTipoLicencia == true) {
            $.ajax(ambiente + "/TipoLicencia/GuardarTipoLicencia", {
                type: "POST",
                contentType: "application/json",
                data: datoTipoLicencia()
            }).done(function () {
                crearTablaTipoLicencia();
                resetTipoLicencia();
            })

        } else {
            $.ajax(ambiente + "/TipoLicencia/ActualizarTipoLicencia", {
                type: "POST",
                contentType: "application/json",
                data: datoTipoLicencia()
            }).done(function () {
                crearTablaTipoLicencia();
                resetTipoLicencia();
            })
        }
    } else {
        listaCamposVaciosTipoLicencia = listaCamposVaciosTipoLicencia.substring(0, listaCamposVaciosTipoLicencia.length - 2);
        $('#mensajeVacioTipoLicencia').text('Verifique que los siguientes campos no hayan quedado vacíos: ' + listaCamposVaciosTipoLicencia);
        $('#alertaCamposVaciosTipoLicencia').modal('show');
        listaCamposVaciosTipoLicencia = '';
    }
});

$(document).on("click", ".estadoInactivoTipoLicencia", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Grupo
    Nom_Licencia = $(this).parents("tr").find("td:nth-child(3)").text();
    Cod_Licencia = $(this).parents("tr").find("td:nth-child(2)").text();
    var nombreCompleto = document.getElementById('#usuario').innerText;
    var campos = nombreCompleto.split(' ');
    var soloNombre = campos[0];
    $('#msgTipoLicencia').text('Estimado ' + soloNombre + ':');
    $('#msgTipoLicencia1').text('¿Está seguro que desea eliminar este Grupo ' + Nom_Licencia + '?');
    $('#mensajeAlerta').modal('show');
});

$('#aceptarMensajeTipoLicencia').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Grupo
    $('#mensajeAlerta').modal('hide');
    var url = ambiente + '/TipoLicencia/EliminarTipoLicencia?Cod_Licencia=' + Cod_Licencia + '&&User_Log=' + document.getElementById('#usuario').innerText;
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            Resultado = entry.Resultado;
            $('#msgTipoLicencia3').text(Resultado);
            $('#mensajeAlertaEliminarTipoLicencia').modal('show');
        })
    });
});
$('#aceptarMensajeEliminarTipoLicencia').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Grupo
    crearTablaTipoLicencia();
    resetTipoLicencia();
});

$(document).on("click", ".editTipoLicencia", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Licencia
    nuevoTipoLicencia = false;
    var valor = document.getElementById('#usuario').innerText;
    if (valor.length != 0) {
        Cod_Licencia = $(this).parents("tr").find("td:nth-child(2)").text();
        //Carga de datos del Tipo Licencia
        var urlconvenio = ambiente + '/TipoLicencia/editTipoLicencia?Cod_Licencia=' + Cod_Licencia;
        $.getJSON(urlconvenio, function (dataconvenio) {
            $("#Cod_Licencia").val(dataconvenio.Cod_Licencia);
            $('#Cod_Licencia').attr('disabled', true);
            $("#Nom_Licencia").val(dataconvenio.Nom_Licencia);
            $("#Descripcion").val(dataconvenio.Descripcion);
        });
        $('#datosTipoLicencia').modal('show');
    } else {
        var url = ambiente + '/Login/Login';
        document.location.href = url;
    }
});

$('#datosTipoLicencia').on('shown.bs.modal', function () {
    $('#Nom_Licencia').focus();
});
