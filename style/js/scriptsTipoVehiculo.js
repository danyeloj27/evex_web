//let listaCamposVaciosTipoVehiculo = '';
//let Cod_EliminaVehiculo;
//let Resultado;

function crearTablaTipoVehiculo() {
    var tableTipoVehiculo = $('#tbl-TipoVehiculo').DataTable({
        'destroy': true,
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/TipoVehiculo/ListaTipoVehiculo',
        'autoWidth': false,
        'order': [[1, "asc"]],
        'height': '10%',
        'columns': [
            {
                'title': 'ACCIÓN',
                'targets': -1,
                'data': null,
                'className': 'dt-body-center',
                'defaultContent': '<a class="editTipoVehiculo" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoTipoVehiculo" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a>',
                'width': '10%'
            },
            { 'data': 'Cod_Vehiculo', 'title': 'CODIGO' },
            { 'data': 'Nom_Vehiculo', 'title': 'TIPO' },
            { 'data': 'Asientos', 'title': 'ASIENTOS' }
        ]
    });
}

function resetTipoVehiculo() {
    $('#datosTipoVehiculo').modal('hide');
    $('#registroTipoVehiculo input').val('');
}

function datoTipoVehiculo() {
    var tblArr1 = [];
    var tblParametro = {
        Cod_Vehiculo: "",
        Nom_Vehiculo: "",
        Asientos: "",
        User_Log: ""
    };
    tblParametro.Cod_Vehiculo = document.getElementById("Cod_Vehiculo").value;
    tblParametro.Nom_Vehiculo = (document.getElementById("Nom_Vehiculo").value).toUpperCase();
    tblParametro.Asientos = (document.getElementById("Asientos").value).toUpperCase();
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr1.push(tblParametro);
    return JSON.stringify(tblArr1);
}

function TipoVehiculo(Cod_Vehiculo) {
    var tblArr = [];
    var tblParametro = {
        Cod_Vehiculo: "",
        User_Log: ""
    };
    tblParametro.Cod_Vehiculo = Cod_Vehiculo;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr.push(tblParametro);
    return JSON.stringify(tblArr);
}

function validarVaciosTipoVehiculo() {
    camposVaciosTipoVehiculo = false;
    if (document.getElementById('Nom_Vehiculo').value == '') {
        document.getElementById('Nom_Vehiculo').setCustomValidity('No puede ser vacío');
        listaCamposVaciosTipoVehiculo = listaCamposVaciosTipoVehiculo + 'Nombre tipo Vehiculo, ';
        camposVaciosTipoVehiculo = true;
    }
    if (document.getElementById('Asientos').value == '') {
        document.getElementById('Asientos').setCustomValidity('No puede ser vacío');
        listaCamposVaciosTipoVehiculo = listaCamposVaciosTipoVehiculo + 'Cantidad Asientos, ';
        camposVaciosTipoVehiculo = true;
    }
    return camposVaciosTipoVehiculo;
}

$(document).ready(function () {
    crearTablaTipoVehiculo();
});

$('#cerrarTipoVehiculo').on('click', function () {
    resetTipoVehiculo();
    document.getElementById('Cod_Vehiculo').setCustomValidity('');
    document.getElementById('Nom_Vehiculo').setCustomValidity('');
    document.getElementById('Asientos').setCustomValidity('');
})


$(document).on("click", "#nuevoTipoVehiculo", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    nuevoTipoVehiculo = true;
    $('#Cod_Vehiculo').attr('disabled', true);
    $('#datosTipoVehiculo').modal('show');
});

$(document).on("click", "#guardarTipoVehiculo", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    var vaciosTipoVehiculo = validarVaciosTipoVehiculo();
    if (vaciosTipoVehiculo == false) {
        if (nuevoTipoVehiculo == true) {
            $.ajax(ambiente + "/TipoVehiculo/GuardarTipoVehiculo", {
                type: "POST",
                contentType: "application/json",
                data: datoTipoVehiculo()
            }).done(function () {
                crearTablaTipoVehiculo();
                resetTipoVehiculo();
            })

        } else {
            $.ajax(ambiente + "/TipoVehiculo/ActualizarTipoVehiculo", {
                type: "POST",
                contentType: "application/json",
                data: datoTipoVehiculo()
            }).done(function () {
                crearTablaTipoVehiculo();
                resetTipoVehiculo();
            })
        }
    } else {
        listaCamposVaciosTipoVehiculo = listaCamposVaciosTipoVehiculo.substring(0, listaCamposVaciosTipoVehiculo.length - 2);
        $('#mensajeVacioTipoVehiculo').text('Verifique que los siguientes campos no hayan quedado vacíos: ' + listaCamposVaciosTipoVehiculo);
        $('#alertaCamposVaciosTipoVehiculo').modal('show');
        listaCamposVaciosTipoVehiculo = '';
    }
});

$(document).on("click", ".estadoInactivoTipoVehiculo", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    Nom_Vehiculo = $(this).parents("tr").find("td:nth-child(3)").text();
    Cod_EliminaVehiculo = $(this).parents("tr").find("td:nth-child(2)").text();
    var nombreCompleto = document.getElementById('#usuario').innerText;
    var campos = nombreCompleto.split(' ');
    var soloNombre = campos[0];
    $('#msg').text('Estimado ' + soloNombre + ':');
    $('#msg1').text('¿Está seguro que desea eliminar el Tipo de Vehiculo ' + Nom_Vehiculo + '?');
    $('#mensajeAlerta').modal('show');
});

$('#aceptarMensajeTipoVehiculo').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    $('#mensajeAlerta').modal('hide');
    var url = ambiente + '/TipoVehiculo/EliminarTipoVehiculo?Cod_Vehiculo=' + Cod_EliminaVehiculo + '&&User_Log=' + document.getElementById('#usuario').innerText;
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            Resultado = entry.Resultado;
            $('#msgTipoVehiculo').text(Resultado);
            $('#mensajeAlertaEliminarTipoVehiculo').modal('show');
        })
    });
});

$('#aceptarMensajeEliminarTipoVehiculo').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    crearTablaTipoVehiculo();
    resetTipoVehiculo();
});

$(document).on("click", ".editTipoVehiculo", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    console.log('hola');
    nuevoTipoVehiculo = false;
    var valor = document.getElementById('#usuario').innerText;
    if (valor.length != 0) {
        Cod_Vehiculo = $(this).parents("tr").find("td:nth-child(2)").text();
        //Carga de datos del Tipo Vehiculo
        var urlconvenio = ambiente + '/TipoVehiculo/EditTipoVehiculo?Cod_Vehiculo=' + Cod_Vehiculo;
        $.getJSON(urlconvenio, function (dataconvenio) {
            $("#Cod_Vehiculo").val(dataconvenio.Cod_Vehiculo);
            $('#Cod_Vehiculo').attr('disabled', true);
            $("#Nom_Vehiculo").val(dataconvenio.Nom_Vehiculo);
            $("#Asientos").val(dataconvenio.Asientos);
        });
        $('#datosTipoVehiculo').modal('show');
    } else {
        var url = ambiente + '/Login/Login';
        document.location.href = url;
    }
});

$('#datosTipoVehiculo').on('shown.bs.modal', function () {
    $('#Nom_Vehiculo').focus();
})
