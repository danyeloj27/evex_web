function crearTablaVerCorreos() {
    var tableVerCorreos = $('#tbl-CorreosEnviados').DataTable({
        'destroy': true,
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/VerCorreos/ListaCorreos',
        'autoWidth': false,
        'height': '10%',
        'columns': [
            { 'data': 'Id_Correo', 'title': 'ID', 'visible': false },
            {
                'title': 'ACCIÓN',
                'targets': -1,
                'data': null,
                'className': 'dt-body-center',
                'defaultContent': '<a class="copiarMensaje" title="Copiar Mensaje" data-toggle="tooltip"><i class="fas fa-copy" style="color: #007bff;"></i></a><a class="reenviarCorreo" title="Reenviar" data-toggle="tooltip"><i class="fas fa-redo" style="color: #039d06;"></i></a>',
                'width': '10%'
            },
            {
                'data': 'Fecha_Solicitud_Envio', 'title': 'FECHA ENVÍO', 'render': function (data, type) {
                    return type === 'sort' ? data : moment(data).format('DD/MM/YYYY');
                } },
            { 'data': 'Asunto', 'title': 'ASUNTO' },
            { 'data': 'Estado_Envio', 'title': 'ESTADO' },
            { 'data': 'Mensaje', 'title': 'MENSAJE', 'visible': false }
        ],
        'order': [[2, "desc"]]
    });
};

$(document).ready(function () {
    crearTablaVerCorreos();
});

$(document).on("click", ".copiarMensaje", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Turno
    let currentRow = $(this).closest("tr");
    let data = $('#tbl-CorreosEnviados').DataTable().row(currentRow).data();
    document.getElementById('mensajeCorreo').innerHTML = data['Mensaje'];
    $('#mensajeAlerta').modal('show');
});

$('#copiarTexto').on('click', function () {
    let copiedText = document.getElementById('mensajeCorreo');
    copiedText.select();
    copiedText.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand('copy');
});

$(document).on("click", ".reenviarCorreo", function () {
    let currentRow = $(this).closest("tr");
    let data = $('#tbl-CorreosEnviados').DataTable().row(currentRow).data();
    let idCorreo = data['Id_Correo'];
    var url = ambiente + '/VerCorreos/ReenviarCorreo?idCorreo=' + idCorreo + '&&User=' + document.getElementById('#usuario').innerText;
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            Resultado = entry.Resultado;
            $('#msgCorreoEnviado').text(Resultado);
            $('#correoEnviado').modal('show');
        })
    });
});

$('#enviarCorreoNuevo').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Turno
    console.log('correo enviado');
    crearTablaVerCorreos();
});