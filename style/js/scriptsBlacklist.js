function crearTablaBlacklist() {
    var tableblacklist = $('#tbl-blacklist').DataTable({
        'destroy': true,
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/Blacklist/ListaBlackList',
        'autoWidth': false,
        'order': [[1, "asc"]],
        'height': '10%',
        'columns': [
            {
                'title': 'ACCIÓN',
                'targets': -1,
                'data': null,
                'className': 'dt-body-center',
                'defaultContent': '<a class="eliminarBlacklist" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a>',
                'width': '10%'
            },
            { 'data': 'Rut', 'title': 'RUT' },
            { 'data': 'Motivo', 'title': 'MOTIVO' },
            {
                'data': 'Fecha_log', 'title': 'FECHA', 'render': function (data, type) {
                    return type === 'sort' ? data : moment(data).format('DD/MM/YYYY');
                } },
            { 'data': 'Usuario', 'title': 'USUARIO' }
        ],
        'order': [[4, "desc"]]
    });
}

$(document).ready(function () {
    crearTablaBlacklist();
});

$(document).on("click", ".eliminarBlacklist", function () {
    var nombreCompleto = document.getElementById('#usuario').innerText;
    var campos = nombreCompleto.split(' ');
    var soloNombre = campos[0];
    rut = $(this).parents("tr").find("td:nth-child(2)").text();
    $('#msg1').text('Estimado ' + soloNombre + ':');
    $('#msg2').text('¿Está seguro que desea sacar del Blacklist al Rut: ');
    $('#msg3').text(rut);
    $('#mensajeAlerta').modal('show');
});

$('#aceptarMensaje').on("click", function () {
    console.log('entro a black list');
    $.ajax(ambiente + '/Blacklist/EliminarBlackList', {
        type: 'POST',
        contentType: 'application/json',
        data: Blacklit(rut)
    })
    crearTablaBlacklist();
});

function Blacklit(rut) {
    var tblArr = [];
    var tblParametro = {
        Rut: "",
        User_Log: ""
    };
    tblParametro.Rut = rut;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr.push(tblParametro);
    console.log(tblArr);
    return JSON.stringify(tblArr);
}