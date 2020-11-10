$(document).ready(function () {
    

    let comboPasajero = $('#EmpresaPasajero');
    comboPasajero.empty();
    comboPasajero.append('<option selected="true" disabled>Seleccione</option>');
    comboPasajero.prop('selectedIndex', 0);
    var url = ambiente + '/Pasajeros/EmpresaPasajero';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            comboPasajero.append($('<option></option>').attr('value', entry.Cod_Empresa).text(entry.Nom_Fantasia));
        })
    });
});


/*****************************PASAJEROS(INICIO)*****************************/

let listaCamposVaciosPasajero = '';
let EstadoPasajero;

$('#cerrarPasajero').on('click', function () {
    $('input').val('');
    document.getElementById('Cod_Pasajero').setCustomValidity('');
    document.getElementById('Nom_Pasajero').setCustomValidity('');
    document.getElementById('Correo').setCustomValidity('');
    $('#datosPasajero').modal('hide');
})

function datoPasajero() {
    var tblArr1 = [];
    var tblParametro = {
        Cod_Pasajero: "",
        Cod_Emp: "",
        Nom_Com: "",
        Correo: "",
        Telefono: "",
        Estado: "",
        User_Log: ""


    };
    tblParametro.Cod_Pasajero = document.getElementById("Cod_Pasajero").value;
    tblParametro.Cod_Emp = $('#EmpresaPasajero').val();
    tblParametro.Nom_Com = (document.getElementById("Nom_Com").value).toUpperCase();
    tblParametro.Correo = (document.getElementById("Correo").value).toUpperCase();
    tblParametro.Telefono = (document.getElementById("Telefono").value).toUpperCase();
    tblParametro.Estado = "ACTIVO";
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr1.push(tblParametro);
    return JSON.stringify(tblArr1);
}

$('#BuscarEmpresaPasajero').on("click", function () {
    console.log($('#EmpresaPasajero').val());
    var tablePasajero = $('#tbl-Pasajero').DataTable({
        'destroy': true,
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/Pasajeros/ConsultaPasajero?empresa=' + $('#EmpresaPasajero').val(),
        'autoWidth': false,
        'order': [[1, "asc"]],
        'height': '10%',
        'columns': [
           /* {
                'title': 'ACCIÓN',
                'targets': -1,

                'data': 'Estado',
                'className': 'dt-body-center',
                'render': function (data, type, full, meta) {
                    return (data === 'ACTIVO') ?
                        '<a class="editPasajero" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoArea" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a><a class="estadoArea" title="Desactivar" data-toggle="tooltip"><i class="fas fa-check-circle" style="color: #039d06;"></i></a>' :
                        '<a class="editPasajero" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoArea" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a><a class="estadoArea" title="Activar" data-toggle="tooltip"><i class="fas fa-times-circle" style="color: #E34724;"></i></a>';
                },
                'width': '10%'
            },*/
            { 'data': 'Rut_Id', 'title': 'RUT' },
            { 'data': 'Nombre_Com', 'title': 'NOMBRE' },
            { 'data': 'Correo', 'title': 'CORREO' },
            { 'data': 'Celular', 'title': 'CELULAR' },
            { 'data': 'Direccion', 'title': 'DIRECCION' }
        ]
    })


    /*
    if ($('#EmpresaPasajero').val() == null) {
        $('#ValidarEmpresaVacio').modal('show');
    }
    else {
        $('#nuevoPasajero').attr('disabled', false);
        var tablePasajero = $('#tbl-Pasajero').DataTable({
            'destroy': true,
            'language': {
                'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
            },
            'ajax': ambiente + '/Pasajeros/ListaPasajero?Cod_Emp=' + $('#EmpresaPasajero').val(),
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
                            '<a class="editPasajero" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoArea" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a><a class="estadoArea" title="Desactivar" data-toggle="tooltip"><i class="fas fa-check-circle" style="color: #039d06;"></i></a>' :
                            '<a class="editPasajero" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoArea" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a><a class="estadoArea" title="Activar" data-toggle="tooltip"><i class="fas fa-times-circle" style="color: #E34724;"></i></a>';
                    },
                    'width': '10%'
                },
                { 'data': 'Cod_Pasajero', 'title': 'CODIGO' },
                { 'data': 'Nom_Com', 'title': 'NOMBRE' },
                { 'data': 'Correo', 'title': 'CORREO' },
                { 'data': 'Telefono', 'title': 'TELEFONO' },
                { 'data': 'Estado', 'title': 'ESTADO' }
            ]
        })
    }*/
});

$(document).on("click", "#nuevoPasajero", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Area
    nuevoArea = true;
    $('#Cod_Pasajero').attr('disabled', true);
    $('#datosPasajero').modal('show');
});

function CargarListaPasajero() {

    var tablePasajero = $('#tbl-Pasajero').DataTable({
        'destroy': true,
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/Pasajeros/ListaPasajero?Cod_Emp=' + $('#EmpresaPasajero').val(),
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
                        '<a class="editPasajero" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoPasajero" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a><a class="estadoPasajero" title="Desactivar" data-toggle="tooltip"><i class="fas fa-check-circle" style="color: #039d06;"></i></a>' :
                        '<a class="editPasajero" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoPasajero" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a><a class="estadoPasajero" title="Activar" data-toggle="tooltip"><i class="fas fa-times-circle" style="color: #E34724;"></i></a>';
                },
                'width': '10%'
            },
            { 'data': 'Cod_Pasajero', 'title': 'CODIGO' },
            { 'data': 'Nom_Com', 'title': 'NOMBRE' },
            { 'data': 'Correo', 'title': 'CORREO' },
            { 'data': 'Telefono', 'title': 'TELEFONO' },
            { 'data': 'Estado', 'title': 'ESTADO' }
        ]
    })
    $('#datosEmpresa').modal('hide');
    $('#datosEmpresa input').val('');
}

$(document).on("click", "#guardarPasajero", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Area
    var vaciosPasajero = validarVaciosPasajero();
    if (vaciosPasajero == false) {
        if (nuevoPasajero == true) {
            $.ajax(ambiente + "/Pasajeros/GuardarPasajero", {
                type: "POST",
                contentType: "application/json",
                data: datoPasajero()
            }).done(function () {
                CargarListaPasajero();
            })

        } else {
            $.ajax(ambiente + "/Pasajeros/ActualizarPasajero", {
                type: "POST",
                contentType: "application/json",
                data: datoPasajero()
            }).done(function () {
                CargarListaPasajero();
            })
        }
    } else {
        listaCamposVaciosPasajero = listaCamposVaciosPasajero.substring(0, listaCamposVaciosPasajero.length - 2);
        $('#mensajeVacioPasajero').text('Verifique que los siguientes campos no hayan quedado vacíos: ' + listaCamposVaciosPasajero);
        $('#alertaCamposVaciosPasajero').modal('show');
        listaCamposVaciosPasajero = '';
    }
});

$(document).on("click", ".estadoInactivoPasajero", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Area
    Nom_Com = $(this).parents("tr").find("td:nth-child(3)").text();
    Cod_Pasajero = $(this).parents("tr").find("td:nth-child(2)").text();
    var nombreCompleto = document.getElementById('#usuario').innerText;
    var campos = nombreCompleto.split(' ');
    var soloNombre = campos[0];
    $('#msgPasajero').text('Estimado ' + soloNombre + ':');
    $('#msgPasajero1').text('¿Está seguro que desea eliminar el Area ' + Nom_Com + '?');
    $('#mensajeAlerta').modal('show');
});

$(document).on("click", ".estadoPasajero", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Area
    Nom_Com = $(this).parents("tr").find("td:nth-child(3)").text();
    Cod_Pasajero = $(this).parents("tr").find("td:nth-child(2)").text();

    if ($(this).parents("tr").find("td:nth-child(6)").text() == 'ACTIVO') {
        EstadoPasajero = 'INACTIVO';
    } else {
        EstadoPasajero = 'ACTIVO';
    }
    var nombreCompleto = document.getElementById('#usuario').innerText;
    var campos = nombreCompleto.split(' ');
    var soloNombre = campos[0];
    $('#msgPasajero2').text('Estimado ' + soloNombre + ':');
    $('#msgPasajero4').text('¿Está seguro que desea cambiar de estado el Pasajero ' + Nom_Com + '?');
    $('#mensajeAlertaEstadoPasajero').modal('show');
});

function validarVaciosPasajero() {
    camposVaciosPasajero = false;
    if (document.getElementById('Nom_Com').value == '') {
        document.getElementById('Nom_Com').setCustomValidity('No puede ser vacío');
        listaCamposVaciosPasajero = listaCamposVaciosPasajero + 'Nombre, ';
        camposVaciosPasajero = true;
    }
    if (document.getElementById('Area').value == '') {
        document.getElementById('Area').setCustomValidity('No puede ser vacío');
        listaCamposVaciosPasajero = listaCamposVaciosPasajero + 'Pasajero, ';
        camposVaciosPasajero = true;
    }
    console.log(listaCamposVaciosPasajero);
    return camposVaciosPasajero;
}

$('#aceptarMensajePasajero').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Area
    $('#mensajeAlerta').modal('hide');
    var url = ambiente + '/Pasajeros/EliminarPasajero?Cod_Pasajero=' + Cod_Pasajero + '&&Cod_Emp=' + $('#EmpresaPasajero').val() + '&&User_Log=' + document.getElementById('#usuario').innerText;
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            Resultado = entry.Resultado;
            $('#msgPasajero3').text(Resultado);
            $('#mensajeAlertaEliminarPasajero').modal('show');
        })
    })
});

$(document).on("click", ".editPasajero", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Area
    nuevoPasajero = false;
    var valor = document.getElementById('#usuario').innerText;
    if (valor.length != 0) {
        Cod_Pasajero = $(this).parents("tr").find("td:nth-child(2)").text();
        //Carga de datos del Area
        var urlconvenio = ambiente + '/Pasajeros/editPasajero?Cod_Pasajero=' + Cod_Pasajero + '&&Cod_Emp=' + $('#EmpresaPasajero').val();
        $.getJSON(urlconvenio, function (dataconvenio) {
            $("#Cod_Pasajero").val(dataconvenio.Cod_Pasajero);
            $('#Cod_Pasajero').attr('disabled', true);
            $("#Cod_Emp").val(dataconvenio.Cod_Emp);
            $("#Nom_Com").val(dataconvenio.Nom_Com);
            $("#Correo").val(dataconvenio.Correo);
            $("#Telefono").val(dataconvenio.Telefono);
        });
        $('#datosPasajero').modal('show');
    } else {
        var url = ambiente + '/Login/Login';
        document.location.href = url;
    }
});

$('#aceptarMensajeEliminarPasajero').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Area
    CargarListaPasajero();
});

$('#aceptarMensajeEstadoPasajero').on('click', function () {
    $.ajax(ambiente + "/Pasajeros/ActualizarEstadoPasajero", {
        type: "POST",
        contentType: "application/json",
        data: EstadoPasajeroa(Cod_Pasajero, EstadoPasajero)
    }).done(function () {
        $('#tbl-Pasajero').DataTable().ajax.reload();
    });
    $('#mensajeAlertaEstadoPasajero').modal('hide');
});

function EstadoPasajeroa(Cod_Pasajero, EstadoPasajero) {
    var tblArr1 = [];
    var tblParametro = {
        Cod_Pasajero: "",
        Cod_Emp: "",
        Estado: "",
        User_Log: ""
    };
    tblParametro.Cod_Pasajero = Cod_Pasajero;
    tblParametro.Cod_Emp = $('#EmpresaArea').val();
    tblParametro.Estado = EstadoPasajero;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr1.push(tblParametro);
    console.log(tblArr1);
    return JSON.stringify(tblArr1);
}
