let listaCamposVaciosTipoTecnologia = '';

function crearTablaTipoTecnologia() {
    var tableTipoTecnologia = $('#tbl-TipoTecnologia').DataTable({
        'destroy': true,
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/TipoTecnologia/ListaTipoTecnologia',
        'autoWidth': false,
        'order': [[1, "asc"]],
        'height': '10%',
        'columns': [
            {
                'title': 'ACCIÓN',
                'targets': -1,
                'data': null,
                'className': 'dt-body-center',
                'defaultContent': '<a class="editTipoTecnologia" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoTipoTecnologia" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a>',
                'width': '10%'
            },
            { 'data': 'Cod_Tecnologia', 'title': 'CODIGO' },
            { 'data': 'Nom_Tecnologia', 'title': 'TIPO' }
        ]
    });
};

function resetTipoTecnologia() {
    $('#datosTipoTecnologia').modal('hide');
    $('#registroTipoTecnologia input').val('');
}

function validarVaciosTipoTecnologia() {
    camposVaciosTipoTecnologia = false;
    if (document.getElementById('Nom_Tecnologia').value == '') {
        document.getElementById('Nom_Tecnologia').setCustomValidity('No puede ser vacío');
        listaCamposVaciosTipoTecnologia = listaCamposVaciosTipoTecnologia + 'Nombre tipo Tecnologia, ';
        camposVaciosTipoTecnologia = true;
    }
    console.log(listaCamposVaciosTipoTecnologia);
    return camposVaciosTipoTecnologia;
}

function datoTipoTecnologia() {
    var tblArr1 = [];
    var tblParametro = {
        Cod_Tecnologia: "",
        Nom_Tecnologia: "",
        User_Log: ""


    };
    tblParametro.Cod_Tecnologia = document.getElementById("Cod_Tecnologia").value;
    tblParametro.Nom_Tecnologia = (document.getElementById("Nom_Tecnologia").value).toUpperCase();
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr1.push(tblParametro);
    return JSON.stringify(tblArr1);
}

function TipoTecnologia(Cod_Tecnologia) {
    var tblArr = [];
    var tblParametro = {
        Cod_Tecnologia: "",
        User_Log: ""
    };
    tblParametro.Cod_Tecnologia = Cod_Tecnologia;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr.push(tblParametro);

    return JSON.stringify(tblArr);
}

$(document).ready(function () {
    crearTablaTipoTecnologia();
});

$('#cerrarTipoTecnologia').on('click', function () {
    $('input').val('');
    document.getElementById('Cod_Tecnologia').setCustomValidity('');
    document.getElementById('Nom_Tecnologia').setCustomValidity('');
    $('#datosTipoTecnologia').modal('hide');
})


$(document).on("click", "#nuevoTipoTecnologia", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    nuevoTipoTecnologia = true;
    $('#Cod_Tecnologia').attr('disabled', true);
    $('#datosTipoTecnologia').modal('show');
});

$(document).on("click", "#guardarTipoTecnologia", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    var vaciosTipoTecnologia = validarVaciosTipoTecnologia();
    if (vaciosTipoTecnologia == false) {
        if (nuevoTipoTecnologia == true) {
            $.ajax(ambiente + "/TipoTecnologia/GuardarTipoTecnologia", {
                type: "POST",
                contentType: "application/json",
                data: datoTipoTecnologia()
            }).done(function () {
                crearTablaTipoTecnologia();
                resetTipoTecnologia();
            })

        } else {
            $.ajax(ambiente + "/TipoTecnologia/ActualizarTipoTecnologia", {
                type: "POST",
                contentType: "application/json",
                data: datoTipoTecnologia()
            }).done(function () {
                crearTablaTipoTecnologia();
                resetTipoTecnologia();
            })
        }
    } else {
        listaCamposVaciosTipoTecnologia = listaCamposVaciosTipoTecnologia.substring(0, listaCamposVaciosTipoTecnologia.length - 2);
        $('#mensajeVacioTipoTecnologia').text('Verifique que los siguientes campos no hayan quedado vacíos: ' + listaCamposVaciosTipoTecnologia);
        $('#alertaCamposVaciosTipoTecnologia').modal('show');
        listaCamposVaciosTipoTecnologia = '';
    }
});

$(document).on("click", ".estadoInactivoTipoTecnologia", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    Nom_Tecnologia = $(this).parents("tr").find("td:nth-child(3)").text();
    Cod_Tecnologia = $(this).parents("tr").find("td:nth-child(2)").text();
    var nombreCompleto = document.getElementById('#usuario').innerText;
    var campos = nombreCompleto.split(' ');
    var soloNombre = campos[0];
    $('#msgTipoTecnologia').text('Estimado ' + soloNombre + ':');
    $('#msgTipoTecnologia1').text('¿Está seguro que desea eliminar el Tipo de Tecnologia ' + Nom_Tecnologia + '?');
    $('#mensajeAlerta').modal('show');
});

$('#aceptarMensajeTipoTecnologia').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    $('#mensajeAlerta').modal('hide');
    var url = ambiente + '/TipoTecnologia/EliminarTipoTecnologia?Cod_Tecnologia=' + Cod_Tecnologia + '&&User_Log=' + document.getElementById('#usuario').innerText;
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            Resultado = entry.Resultado;
            $('#msgTipoTecnologia3').text(Resultado);
            $('#mensajeAlertaEliminarTipoTecnologia').modal('show');
        })
    });
});
$('#aceptarMensajeEliminarTipoTecnologia').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    crearTablaTipoTecnologia();
    resetTipoTecnologia();
});

$(document).on("click", ".editTipoTecnologia", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    nuevoTipoTecnologia = false;
    var valor = document.getElementById('#usuario').innerText;
    if (valor.length != 0) {
        Cod_Tecnologia = $(this).parents("tr").find("td:nth-child(2)").text();
        //Carga de datos del Tipo Tecnologia
        var urlconvenio = ambiente + '/TipoTecnologia/editTipoTecnologia?Cod_Tecnologia=' + Cod_Tecnologia;
        $.getJSON(urlconvenio, function (dataconvenio) {
            $("#Cod_Tecnologia").val(dataconvenio.Cod_Tecnologia);
            $('#Cod_Tecnologia').attr('disabled', true);
            $("#Nom_Tecnologia").val(dataconvenio.Nom_Tecnologia);
        });
        $('#datosTipoTecnologia').modal('show');
    } else {
        var url = ambiente + '/Login/Login';
        document.location.href = url;
    }
});

$('#datosTipoTecnologia').on('shown.bs.modal', function () {
    $('#Nom_Tecnologia').focus();
});