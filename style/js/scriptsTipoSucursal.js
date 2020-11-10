let listaCamposVaciosTipoSucursal = '';
let Cod_Sucursal;
let estadoSucursal;

function crearTablaTipoSucursal() {
    var tableTipoSucursal = $('#tbl-TipoSucursal').DataTable({
        'destroy': true,
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/TipoSucursal/ListaTipoSucursal',
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
                        '<a class="editTipoSucursal" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoTipoSucursal" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a><a class="estadoTipoSucursal" title="Desactivar" data-toggle="tooltip"><i class="fas fa-check-circle" style="color: #039d06;"></i></a>' :
                        '<a class="editTipoSucursal" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoTipoSucursal" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a><a class="estadoTipoSucursal" title="Activar" data-toggle="tooltip"><i class="fas fa-times-circle" style="color: #E34724;"></i></a>';
                },
                'width': '10%'
            },
            { 'data': 'Cod_Sucursal', 'title': 'CODIGO' },
            { 'data': 'Nom_Sucursal', 'title': 'TIPO' },
            { 'data': 'Estado', 'title': 'ESTADO' }
        ]
    });
};

function resetTipoSucursal() {
    $('#datosTipoSucursal').modal('hide');
    $('#registroTipoSucursal input').val('');
};

function validarVaciosTipoSucursal() {
    camposVaciosTipoSucursal = false;
    if (document.getElementById('Nom_Sucursal').value == '') {
        document.getElementById('Nom_Sucursal').setCustomValidity('No puede ser vacío');
        listaCamposVaciosTipoSucursal = listaCamposVaciosTipoSucursal + 'Nombre de la sucursal, ';
        camposVaciosTipoSucursal = true;
    }
    console.log(listaCamposVaciosTipoSucursal);
    return camposVaciosTipoSucursal;
};

function datoTipoSucursal() {
    var tblArr1 = [];
    var tblParametro = {
        Cod_Sucursal: "",
        Nom_Sucursal: "",
        Estado: "",
        User_Log: ""


    };
    tblParametro.Cod_Sucursal = document.getElementById("Cod_Sucursal").value;
    tblParametro.Nom_Sucursal = (document.getElementById("Nom_Sucursal").value).toUpperCase();
    tblParametro.Estado = "ACTIVO";
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr1.push(tblParametro);
    return JSON.stringify(tblArr1);
};

function EstadoTipoSucursal(Cod_Sucursal, estadoSucursal) {
    var tblArr1 = [];
    var tblParametro = {
        Cod_Sucursal: "",
        Estado: "",
        User_Log: ""
    };
    tblParametro.Cod_Sucursal = Cod_Sucursal;
    tblParametro.Estado = estadoSucursal;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr1.push(tblParametro);
    console.log(tblArr1);
    return JSON.stringify(tblArr1);
};

function TipoSucursal(Cod_Sucursal) {
    var tblArr = [];
    var tblParametro = {
        Cod_Sucursal: "",
        User_Log: ""
    };
    tblParametro.Cod_Sucursal = Cod_Sucursal;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr.push(tblParametro);

    return JSON.stringify(tblArr);
}

$(document).ready(function () {
    crearTablaTipoSucursal();
});

$('#cerrarTipoSucursal').on('click', function () {
    $('input').val('');
    document.getElementById('Cod_Sucursal').setCustomValidity('');
    document.getElementById('Nom_Sucursal').setCustomValidity('');
    $('#datosTipoSucursal').modal('hide');
})

$(document).on("click", "#nuevoTipoSucursal", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    nuevoTipoSucursal = true;
    $('#Cod_Sucursal').attr('disabled', true);
    $('#datosTipoSucursal').modal('show');
});

$(document).on("click", "#guardarTipoSucursal", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    var vaciosTipoSucursal = validarVaciosTipoSucursal();
    if (vaciosTipoSucursal == false) {
        if (nuevoTipoSucursal == true) {
            $.ajax(ambiente + "/TipoSucursal/GuardarTipoSucursal", {
                type: "POST",
                contentType: "application/json",
                data: datoTipoSucursal()
            }).done(function () {
                crearTablaTipoSucursal();
                resetTipoSucursal();
            })

        } else {
            $.ajax(ambiente + "/TipoSucursal/ActualizarTipoSucursal", {
                type: "POST",
                contentType: "application/json",
                data: datoTipoSucursal()
            }).done(function () {
                crearTablaTipoSucursal();
                resetTipoSucursal();
            })
        }
    } else {
        listaCamposVaciosTipoSucursal = listaCamposVaciosTipoSucursal.substring(0, listaCamposVaciosTipoSucursal.length - 2);
        $('#mensajeVacioTipoSucursal').text('Verifique que los siguientes campos no hayan quedado vacíos: ' + listaCamposVaciosTipoSucursal);
        $('#alertaCamposVaciosTipoSucursal').modal('show');
        listaCamposVaciosTipoSucursal = '';
    }
});

$(document).on("click", ".estadoInactivoTipoSucursal", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    Nom_Sucursal = $(this).parents("tr").find("td:nth-child(3)").text();
    Cod_Sucursal = $(this).parents("tr").find("td:nth-child(2)").text();
    var nombreCompleto = document.getElementById('#usuario').innerText;
    var campos = nombreCompleto.split(' ');
    var soloNombre = campos[0];
    $('#msgTipoSucursal').text('Estimado ' + soloNombre + ':');
    $('#msgTipoSucursal1').text('¿Está seguro que desea eliminar la Sucursal ' + Nom_Sucursal + '?');
    $('#mensajeAlerta').modal('show');
});

$(document).on("click", ".estadoTipoSucursal", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    Nom_Sucursal = $(this).parents("tr").find("td:nth-child(3)").text();
    Cod_Sucursal = $(this).parents("tr").find("td:nth-child(2)").text();
    if ($(this).parents("tr").find("td:nth-child(4)").text() == 'ACTIVO') {
        estadoSucursal = 'INACTIVO';
    } else {
        estadoSucursal = 'ACTIVO';
    }
    var nombreCompleto = document.getElementById('#usuario').innerText;
    var campos = nombreCompleto.split(' ');
    var soloNombre = campos[0];
    $('#msgTipoSucursal15').text('Estimado ' + soloNombre + ':');
    $('#msgTipoSucursal4').text('¿Está seguro que desea cambiar de estado a la Sucursal ' + Nom_Sucursal + '?');
    $('#mensajeAlertaEstadoTipoSucursal').modal('show');
});

$('#aceptarMensajeEstadoTipoSucursal').on('click', function () {
    console.log('hola');
    $.ajax(ambiente + "/TipoSucursal/ActualizarEstadoTipoSucursal", {
        type: "POST",
        contentType: "application/json",
        data: EstadoTipoSucursal(Cod_Sucursal, estadoSucursal)
    }).done(function () {
        $('#tbl-TipoSucursal').DataTable().ajax.reload();
    });
    $('#mensajeAlertaEstadoTipoSucursal').modal('hide');
});

$('#aceptarMensajeTipoSucursal').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    $('#mensajeAlerta').modal('hide');
    var url = ambiente + '/TipoSucursal/EliminarTipoSucursal?Cod_Sucursal=' + Cod_Sucursal + '&&User_Log=' + document.getElementById('#usuario').innerText;
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            Resultado = entry.Resultado;
            $('#msgTipoSucursal3').text(Resultado);
            $('#mensajeAlertaEliminarTipoSucursal').modal('show');
        })
    });
});
$('#aceptarMensajeEliminarTipoSucursal').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    crearTablaTipoSucursal();
    resetTipoSucursal();
});

$(document).on("click", ".editTipoSucursal", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    nuevoTipoSucursal = false;
    var valor = document.getElementById('#usuario').innerText;
    if (valor.length != 0) {
        Cod_Sucursal = $(this).parents("tr").find("td:nth-child(2)").text();
        //Carga de datos del Tipo Contrato
        var urlconvenio = ambiente + '/TipoSucursal/editTipoSucursal?Cod_Sucursal=' + Cod_Sucursal;
        $.getJSON(urlconvenio, function (dataconvenio) {
            $("#Cod_Sucursal").val(dataconvenio.Cod_Sucursal);
            $('#Cod_Sucursal').attr('disabled', true);
            $("#Nom_Sucursal").val(dataconvenio.Nom_Sucursal);
        });
        $('#datosTipoSucursal').modal('show');
    } else {
        var url = ambiente + '/Login/Login';
        document.location.href = url;
    }
});

$('#datosTipoSucursal').on('shown.bs.modal', function () {
    $('#Nom_Sucursal').focus();
});