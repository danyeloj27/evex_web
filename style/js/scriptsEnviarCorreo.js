let tipoD = "Todos";
let tipoC = "";
let destC = 0;
let asuntoC = 0;
let mensajeC = 0;
let correos = "";


function EnviarCorreoPlanilla() {
    if (tipoD == 'seleccioneMovil') {
        destinatario = $('#destinoCorreo').val();
    }
    var tblArr1 = [];
    var tblParametro = {
        Destino: "",
        Tipo: "",
        Asunto: "",
        Mensaje: "",
        Archivo: ""
    };
    tblParametro.Destino = destinatario;
    tblParametro.Tipo = document.getElementById("tipoCorreo").value;
    tblParametro.Asunto = document.getElementById("asuntoCorreo").value;
    tblParametro.Mensaje = document.getElementById("mensajeCorreo").value;
    tblParametro.Archivo = concatArchivos;
    tblArr1.push(tblParametro);
    return JSON.stringify(tblArr1);
}

$('#enviarCorreo').on('click', function () {


    if (document.getElementById('mensajeCorreo').value != '') {
        FileDetails();
        EnviarCorreoPlanilla();
        $.ajax(ambiente + '/EnviarCorreo/EnviarCorreoPlanilla', {
            type: 'POST',
            contentType: 'application/json',
            data: EnviarCorreoPlanilla()
        })
    }
    $('#enviandoCorreo').modal('show');
})

$('#opcionesEnvio input[type=radio]').change(function () {
    tipoD = $(this).attr("id");
    if (tipoD == 'seleccioneMovil') {
        destinatario = $("#correosSeleccionados").val();
        $("#correosSeleccionados").show(200);
        $('#enviarCorreo').attr('disabled', 'disabled');
    }
    if (tipoD == 'todoMovil') {
        destinatario = 'Todos';
        $("#correosSeleccionados").hide(200);
    }
    if (tipoD == 'conductorMovil') {
        destinatario = 'Conductores';
        $("#correosSeleccionados").hide(200);
    }
    if (tipoD == 'propietarioMovil') {
        destinatario = 'Propietarios/Titulares';
        $("#correosSeleccionados").hide(200);
    }
    validarEnvio()
})

$('#agregarBL input[type=radio]').change(function () {
    blacklisted = $(this).val();
    if ($(this).val() == 'SI') {
        $('#motivoDesvincular').removeAttr('disabled');
    } else {
        $('#motivoDesvincular').attr('disabled', 'disabled');
    }
})

$('#mensajeCorreo').on('keyup', function () {
    validarEnvio()
})

$('#mensajeCorreo').on('change', function () {
    validarEnvio()
})

$('#asuntoCorreo').on('keyup', function () {
    validarEnvio()
})

$('#asuntoCorreo').on('change', function () {
    validarEnvio()
})

$('#destinoCorreo').on('keyup', function () {
    validarEnvio()
})

$('#destinoCorreo').on('change', function () {
    validarEnvio()
})

$('#tipoCorreo').on('change', function () {
    tipoC = $(this).find(':selected').text();
    if (tipoD == 'Seleccione' && $('#correosSeleccionados').vacio == '') {
        $('#enviarCorreo').attr('disabled', 'disabled');
    }
    if ($(this).find(':selected').text() == 'Personalizado') {
        $('#enviarCorreo').attr('disabled', 'disabled');
        $('#asuntoCorreo').focus()
    }
    var url = ambiente + '/EnviarCorreo/TiposCorreo';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            if ($('#tipoCorreo').val() == entry.Cod_Tipo_Correo) {
                document.getElementById('asuntoCorreo').value = entry.Asunto_Correo;
                document.getElementById('mensajeCorreo').value = entry.Mensaje_Correo;
                validarEnvio()
            }
        })
    });

})

function validarEnvio() {
    destC = $('#destinoCorreo').val().length;
    asuntoC = $('#asuntoCorreo').val().length;;
    mensajeC = $('#mensajeCorreo').val().length;;
    $('#asuntoCorreo').removeAttr('disabled');
    $('#mensajeCorreo').removeAttr('disabled');
    $('#enviarCorreo').attr('disabled', 'disabled');
    if (tipoD != 'Seleccione') {
        if (tipoC != 'Personalizado' && asuntoC > 0 && mensajeC > 0) {
            console.log('1');
            $('#asuntoCorreo').attr('disabled', 'disabled');
            $('#mensajeCorreo').attr('disabled', 'disabled');
            $('#enviarCorreo').removeAttr('disabled');
        }
        if (tipoC == 'Personalizado') {
            console.log('2');
            $('#asuntoCorreo').removeAttr('disabled');
            $('#mensajeCorreo').removeAttr('disabled');
            $('#enviarCorreo').attr('disabled', 'disabled');
            if (asuntoC > 0 && mensajeC > 0) {
                $('#enviarCorreo').removeAttr('disabled');
            } else {
                $('#enviarCorreo').attr('disabled', 'disabled');
            }
        }
    }
    if (tipoD == 'Seleccione') {
        if (tipoC != 'Personalizado' && asuntoC > 0 && mensajeC > 0 && destC > 0) {
            $('#asuntoCorreo').attr('disabled', 'disabled');
            $('#mensajeCorreo').attr('disabled', 'disabled');
            $('#enviarCorreo').removeAttr('disabled');
        }
        if (tipoC == 'Personalizado' && destC > 0) {
            $('#asuntoCorreo').removeAttr('disabled');
            $('#mensajeCorreo').removeAttr('disabled');
            $('#enviarCorreo').attr('disabled', 'disabled');
            if (asuntoC > 0 && mensajeC > 0) {
                $('#enviarCorreo').removeAttr('disabled');
            } else {
                $('#enviarCorreo').attr('disabled', 'disabled');
            }
        }
    }
}

//TABLE: Al hacer click en un check convertir una celda en un input xxxxxx
function contarChecked() {
    var correosXXX = "";
    if ($('#inlineCheckbox1').prop('checked') == true) {
        $('#tbl-destinatarios').find('input[type="checkbox"]:checked').each(function () {
            var urlconductor = ambiente + '/EnviarCorreo/BuscarConductor?codMovil=' + $(this).parents('tr').find('td:nth-child(2)').text();
            var urlpropietario = ambiente + '/EnviarCorreo/BuscarPropietario?codMovil=' + $(this).parents('tr').find('td:nth-child(2)').text();
            var urltitular = ambiente + '/EnviarCorreo/BuscarTitular?codMovil=' + $(this).parents('tr').find('td:nth-child(2)').text();
            $.getJSON(urltitular, function (datatitular) {
                correoTitular = datatitular.Correo;
                if (correoTitular != "") {
                    correosXXX = correosXXX + correoTitular + ';';
                }
            })
            $.getJSON(urlpropietario, function (datapropietario) {
                correoPropietario = datapropietario.Correo;
            })
            $.getJSON(urlconductor, function (dataconductor) {
                correoConductor = dataconductor.Correo;
                if (correoConductor == correoPropietario) {
                    correosXXX = correosXXX + correoConductor + ';';
                } else {
                    correosXXX = correosXXX + correoConductor + ';' + correoPropietario + ';';
                }
            }).done(function () {
                document.getElementById('destinoCorreo').value = correosXXX;
            });
        });
    } else {
        $('#tbl-destinatarios').find('input[type="checkbox"]:checked').each(function () {
            correos = correos + $(this).parents('tr').find('td:nth-child(4)').text() + ';';
        });
        document.getElementById('destinoCorreo').value = correos;
    }
    $('#destinoCorreo').prop('readonly', true);
}

$('#buscarDestinatario').on('click', function () {
    correoConductor = "";
    correoPropietario = "";
    correoTitular = "";
    correos = "";
    $('#inlineCheckbox1').prop('checked', false);
    document.getElementById('destinoCorreo').value = "";
    var tableDestinatarios = $('#tbl-destinatarios').DataTable({
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/EnviarCorreo/DestinatariosCorreo',
        'destroy': true,
        'order': [[1, 'asc']],
        'info': false,
        'scrollY': '225px',
        'scrollCollapse': true,
        'paging': false,
        'lengthChange': false,
        'paging"': false,
        'ordering': false,

        'columns': [
            { 'data': null, 'defaultContent': '' },
            { 'data': 'Cod_Movil', 'title': 'MÓVIL' },
            { 'data': 'Nom_Completo', 'title': 'NOMBRE Y APELLIDO' },
            { 'data': 'Correo', 'title': 'CORREO' }
        ],
        'columnDefs': [
            {
                'orderable': false,
                'className': 'dt-body-center',
                'render': function (data, type, full, meta) {
                    return '<input type="checkbox" id="destinatarioSel" class="check">';
                },
                'targets': 0
            },
        ]
    });
});

$('#cargarDestinatarios').on('click', function () {
    $('#tbl-destinatarios').DataTable().search('').draw();
    contarChecked();
    validarEnvio()
    $('#listaDestinatarios').modal('hide');
});

$('#cerrarDestinatarios').on('click', function () {
    $('#listaDestinatarios').modal('hide');
});

$('#aceptarEnviarCorreo').on('click', function () {
    var url = ambiente + '/EnviarCorreo/EnviarCorreo';
    document.location.href = url;
});