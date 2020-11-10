let listaCamposVaciosTipoTurno = '';

function crearTablaTipoTurno() {
    var tableTipoTurno = $('#tbl-TipoTurno').DataTable({
        'destroy': true,
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/TipoTurno/ListaTipoTurno',
        'autoWidth': false,
        'order': [[1, "asc"]],
        'height': '10%',
        'columns': [
            {
                'title': 'ACCIÓN',
                'targets': -1,
                'data': null,
                'className': 'dt-body-center',
                'defaultContent': '<a class="editTipoTurno" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoTipoTurno" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a>',
                'width': '10%'
            },
            { 'data': 'Cod_Turno', 'title': 'CODIGO' },
            { 'data': 'Nom_Turno', 'title': 'TIPO' },
            { 'data': 'Hora_Inicio', 'title': 'HORA INICIO' },
            { 'data': 'Hora_Termino', 'title': 'HORA TERMINO' }
        ]
    });
};

function resetTipoTurno() {
    $('#datosTipoTurno').modal('hide');
    $('#registroTipoTurno input').val('');
};

function datoTipoTurno() {
    var tblArr1 = [];
    var tblParametro = {
        Cod_Turno: "",
        Nom_Turno: "",
        Hora_Inicio: "",
        Hora_Termino: "",
        User_Log: ""
    };
    tblParametro.Cod_Turno = document.getElementById("Cod_Turno").value;
    tblParametro.Nom_Turno = (document.getElementById("Nom_Turno").value).toUpperCase();
    tblParametro.Hora_Inicio = document.getElementById("Hora_Inicio").value;
    tblParametro.Hora_Termino = document.getElementById("Hora_Termino").value;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr1.push(tblParametro);
    return JSON.stringify(tblArr1);
};

function TipoTurno(Cod_Turno) {
    var tblArr = [];
    var tblParametro = {
        Cod_Turno: "",
        User_Log: ""
    };
    tblParametro.Cod_Turno = Cod_Turno;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr.push(tblParametro);

    return JSON.stringify(tblArr);
};

function validarVaciosTipoTurno() {
    camposVaciosTipoTurno = false;
    if (document.getElementById('Nom_Turno').value == '') {
        document.getElementById('Nom_Turno').setCustomValidity('No puede ser vacío');
        listaCamposVaciosTipoLicencia = listaCamposVaciosTipoLicencia + 'Nombre del Turno, ';
        camposVaciosTipoTurno = true;
    }
    console.log(listaCamposVaciosTipoTurno);
    return camposVaciosTipoTurno;
};

$(document).ready(function () {
    crearTablaTipoTurno();
});

$('#cerrarTipoTurno').on('click', function () {
    resetTipoTurno();
    document.getElementById('Cod_Turno').setCustomValidity('');
    document.getElementById('Nom_Turno').setCustomValidity('');
    document.getElementById('Hora_Inicio').setCustomValidity('');
    document.getElementById('Hora_Termino').setCustomValidity('');
});

$(document).on("click", "#nuevoTipoTurno", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Licencia
    nuevoTipoTurno = true;
    $('#Cod_Turno').attr('disabled', true);
    $('#datosTipoTurno').modal('show');
});

$(document).on("click", "#guardarTipoTurno", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Licencia
    var vaciosTipoTurno = validarVaciosTipoTurno();
    if (vaciosTipoTurno == false) {
        if (nuevoTipoTurno == true) {
            $.ajax(ambiente + "/TipoTurno/GuardarTipoTurno", {
                type: "POST",
                contentType: "application/json",
                data: datoTipoTurno()
            }).done(function () {
                crearTablaTipoTurno();
                resetTipoTurno();
            })

        } else {
            $.ajax(ambiente + "/TipoTurno/ActualizarTipoTurno", {
                type: "POST",
                contentType: "application/json",
                data: datoTipoTurno()
            }).done(function () {
                crearTablaTipoTurno();
                resetTipoTurno();
            })
        }
    } else {
        listaCamposVaciosTipoTurno = listaCamposVaciosTipoTurno.substring(0, listaCamposVaciosTipoTurno.length - 2);
        $('#mensajeVacioTipoTurno').text('Verifique que los siguientes campos no hayan quedado vacíos: ' + listaCamposVaciosTipoTurno);
        $('#alertaCamposVaciosTipoTurno').modal('show');
        listaCamposVaciosTipoTurno = '';
    }
});

$(document).on("click", ".estadoInactivoTipoTurno", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Turno
    Nom_Turno = $(this).parents("tr").find("td:nth-child(3)").text();
    Cod_Turno = $(this).parents("tr").find("td:nth-child(2)").text();
    var nombreCompleto = document.getElementById('#usuario').innerText;
    var campos = nombreCompleto.split(' ');
    var soloNombre = campos[0];
    $('#msgTipoTurno').text('Estimado ' + soloNombre + ':');
    $('#msgTipoTurno1').text('¿Está seguro que desea eliminar este Turno ' + Nom_Turno + '?');
    $('#mensajeAlerta').modal('show');
});

$('#aceptarMensajeTipoTurno').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Turno
    $('#mensajeAlerta').modal('hide');
    var url = ambiente + '/TipoTurno/EliminarTipoTurno?Cod_Turno=' + Cod_Turno + '&&User_Log=' + document.getElementById('#usuario').innerText;
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            Resultado = entry.Resultado;
            $('#msgTipoTurno3').text(Resultado);
            $('#mensajeAlertaEliminarTipoTurno').modal('show');
        })
    });
});
$('#aceptarMensajeEliminarTipoTurno').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Turno
    crearTablaTipoTurno();
});

$(document).on("click", ".editTipoTurno", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Turno
    nuevoTipoTurno = false;
    var valor = document.getElementById('#usuario').innerText;
    if (valor.length != 0) {
        Cod_Turno = $(this).parents("tr").find("td:nth-child(2)").text();
        //Carga de datos del Tipo Turno
        var urlconvenio = ambiente + '/TipoTurno/editTipoTurno?Cod_Turno=' + Cod_Turno;
        $.getJSON(urlconvenio, function (dataconvenio) {
            $("#Cod_Turno").val(dataconvenio.Cod_Turno);
            $('#Cod_Turno').attr('disabled', true);
            $("#Nom_Turno").val(dataconvenio.Nom_Turno);
            $("#Hora_Inicio").val(dataconvenio.Hora_Inicio);
            $("#Hora_Termino").val(dataconvenio.Hora_Termino);
        });
        $('#datosTipoTurno').modal('show');
    } else {
        var url = ambiente + '/Login/Login';
        document.location.href = url;
    }
});

$('#datosTipoTurno').on('shown.bs.modal', function () {
    $('#Nom_Turno').focus();
});