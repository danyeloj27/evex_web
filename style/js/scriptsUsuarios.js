let codigoUsuarioSel;
let estadoUsuarioSel;
let idUsuario;
let codigoPerfil;
let filaUsuarios;

function crearTablaUsuarios() {
    var tableusuarios = $('#tbl-usuarios').DataTable({
        'destroy': true,
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/Usuarios/ListaUsuarios',
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
                        '<a class="editUsuario" title="Editar""><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoUsuario" title="Desactivar" data-toggle="tooltip"><i class="fas fa-check-circle" style="color: #039d06;"></i></a><a class="infoUsuarioInt" title="Info" data-toggle="tooltipUsuario"><i class="fas fa-info-circle" style="color: #ff6c00;"></i></a>' :
                        '<a class="editUsuario" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoUsuario" title="Activar" data-toggle="tooltip"><i class="fas fa-times-circle" style="color: #E34724;"></i></a><a class="infoUsuarioInt" title="Info" data-toggle="tooltipUsuario"><i class="fas fa-info-circle" style="color: #ff6c00;"></i></a>';
                },
                'width': '10%'
            },
            { 'data': 'Cod_Usuario', 'title': 'CORREO' },
            { 'data': 'Nombre', 'title': 'NOMBRE' },
            { 'data': 'Apellido', 'title': 'APELLIDO' },
            { 'data': 'Rut', 'title': 'RUT' },
            { 'data': 'Estado', 'title': 'ESTADO' },
            { 'data': 'Motivo', 'title': 'MOTIVO', 'visible': false }
        ]
    });
}

function resetUsuarios() {
    $('#listaUsuarios').modal('hide');
    $('#listaUsuarios input').val('');
}

$(document).ready(function () {
    crearTablaUsuarios();

    let comboPerfilUsuario = $('#perfilUsuario');
    comboPerfilUsuario.empty();
    comboPerfilUsuario.append('<option selected="true" disabled>Seleccione</option>');
    comboPerfilUsuario.prop('selectedIndex', 0);
    var url = ambiente + '/Usuarios/PerfilUsuario';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            comboPerfilUsuario.append($('<option></option>').attr('value', entry.COD_PERFIL).text(entry.GLS_PERFIL));
        })
    });
});


$('#modalCambioEstadoUsuarioInt').on('shown.bs.modal', function () {
    $('#motivoCambioEstadoUsuarioInt').focus();
})

$('#tbl-usuarios').on('mouseenter', 'td', function () {
    filaUsuarios = $('#tbl-usuarios').DataTable().cell(this).index().row;
    var datausuario = $('#tbl-usuarios').DataTable().row(filaUsuarios).data();
    titulo = datausuario['Motivo'];
    if (datausuario['Motivo'] != null) {
        $('[data-toggle="tooltipUsuario"]').attr('title', titulo).tooltip('_fixTitle');
    }
});

$('#tbl-usuarios').on('mouseleave', 'td', function () {
    $('[data-toggle="tooltipUsuario"]').tooltip('dispose');
});

$(document).on('click', '#cerrarCambioEstadorUsuarioInt', function () {
    var url = ambiente + '/Usuarios/Usuarios';
    document.location.href = url;
});

function EstadoUsuarioInt(codigoUsuarioSel, estadoUsuarioSel) {
    var tblArr1 = [];
    var tblParametro = {
        Cod_Usuario: "",
        Estado: "",
        User_Log: "",
        Motivo: ""
    };
    tblParametro.Cod_Usuario = codigoUsuarioSel;
    tblParametro.Estado = estadoUsuarioSel;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblParametro.Motivo = $('#motivoCambioEstadoUsuarioInt').val();
    tblArr1.push(tblParametro);
    console.log(tblArr1);
    return JSON.stringify(tblArr1);
}

$('#guardarCambioEstadoUsuarioInt').on('click', function () {
    if ($('#motivoCambioEstadoUsuarioInt').val() != '') {
        $.ajax(ambiente + "/Usuarios/ActualizarEstadoUsuarioInt", {
            type: "POST",
            contentType: "application/json",
            data: EstadoUsuarioInt(codigoUsuarioSel, estadoUsuarioSel)
        }).done(function () {
            $('#tbl-usuarios').DataTable().ajax.reload();
            $('#mensajeAlertaEstadoUsuarios').modal('hide');
            $('#modalCambioEstadoUsuarioInt').modal('hide');
            $('#motivoCambioEstadoUsuarioInt').val('');
        });
    }
});

$('#rutUsuario').on('keyup keypress blur', function (evt) {
    if (evt.keyCode == 13) {
        enabledUsuario();
        $("#nombreUsuario").focus();
        var url = ambiente + '/Usuarios/BuscarUsuarioRut?parametroUsuario=' + document.getElementById('rutUsuario').value;
        $.getJSON(url, function (datausuario) {
            if (datausuario.Rut != "") {
                $('#alertaUsuarioRegistrado').modal('show');
                disabledUsuario();
            }
        });
    }
});

$('#cerrarModalUsuario').on('click', function () {
    $('#listaUsuarios').modal('hide');
    $('#perfilUsuario').prop('selectedIndex', 0);
    $('input').val('');
    $('#nombreUsuario').attr('disabled', true)
    $('#apellidoUsuario').attr('disabled', true)
    $('#correoUsuario').attr('disabled', true)
    $('#perfilUsuario').attr('disabled', true)
})


$('#guardarUsuario').on('click', function () {
    var vacios = validarVaciosUsuarios();
    if (vacios == false) {
        if (correoUsuarioValido == false) {
            document.getElementById('correoUsuario').setCustomValidity('');
            if (agregarNuevoUsuario == true) {
                $.ajax(ambiente + '/Usuarios/GuardarUsuarioLogin', {
                    type: 'POST',
                    contentType: 'application/json',
                    data: GuardarLogin()
                })
                $.ajax(ambiente + '/Acceso/PasswordNuevo?EnviarA=' + document.getElementById("correoUsuario").value, {
                    type: "POST",
                    contentType: "application/json",
                }).done(function () {
                    crearTablaUsuarios();
                    resetUsuarios();
                });

            } else {
                $.ajax(ambiente + '/Usuarios/ActualizaUsuarioLogin', {
                    type: 'POST',
                    contentType: 'application/json',
                    data: ActualizarLogin()
                }).done(function () {
                    crearTablaUsuarios();
                    resetUsuarios();
                });
            }
        }
    } else {
        listaCamposVaciosUsuario = listaCamposVaciosUsuario.substring(0, listaCamposVaciosUsuario.length - 2);
        $('#mensajeVacioUsuario').text('Verifique que los siguientes campos no hayan quedado vacíos: ' + listaCamposVaciosUsuario);
        $('#alertaCamposVaciosUsuario').modal('show');
        listaCamposVaciosUsuario = '';
    }
})

$('#listaUsuarios').on('shown.bs.modal', function () {
    $('#rutUsuario').focus();
})

$('#nuevoUsuario').on('click', function () {
    resetVaciosUsuarios();
    agregarNuevoUsuario = true;
})

function GuardarLogin() {
    var tblArr = [];
    var tblParametro = {
        Cod_Usuario: '',
        Nombre: '',
        Apellido: '',
        Rut: '',
        Cod_Perfil: '',
        Password: '',
        User_Log: ''
    };
    tblParametro.Cod_Usuario = (document.getElementById('correoUsuario').value).toUpperCase();
    tblParametro.Nombre = (document.getElementById('nombreUsuario').value).toUpperCase();
    tblParametro.Apellido = (document.getElementById('apellidoUsuario').value).toUpperCase();
    tblParametro.Rut = document.getElementById('rutUsuario').value;
    tblParametro.Cod_Perfil = codigoPerfil;
    tblParametro.Password = '123';
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr.push(tblParametro);
    console.log(tblArr);
    return JSON.stringify(tblArr);
}

function ActualizarLogin() {
    var tblArr = [];
    var tblParametro = {
        Cod_Usuario: '',
        Nombre: '',
        Apellido: '',
        Rut: '',
        Cod_Perfil: '',
        Estado: '',
        User_Log: '',
        Id: ''
    };
    tblParametro.Cod_Usuario = (document.getElementById('correoUsuario').value).toUpperCase();
    tblParametro.Nombre = (document.getElementById('nombreUsuario').value).toUpperCase();
    tblParametro.Apellido = (document.getElementById('apellidoUsuario').value).toUpperCase();
    tblParametro.Rut = document.getElementById('rutUsuario').value;
    tblParametro.Cod_Perfil = codigoPerfil;
    tblParametro.Estado = 'ACTIVO';
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblParametro.Id = idUsuario;
    tblArr.push(tblParametro);
    console.log(tblArr);
    return JSON.stringify(tblArr);
}

$('#perfilUsuario').on('change', function () {
    codigoPerfil = $(this).find(':selected').val();
    console.log(codigoPerfil);
})

$(document).on("click", ".editUsuario", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    agregarNuevoUsuario = false;
    resetVaciosUsuarios();
    $("#nombreUsuario").prop('disabled', false)
    $("#apellidoUsuario").prop('disabled', false)
    $("#correoUsuario").prop('disabled', false)
    $("#perfilUsuario").prop('disabled', false)
    correoUsuario = $(this).parents("tr").find("td:nth-child(2)").text();
    //Carga de datos del Vehículo
    var urlusuario = ambiente + '/Usuarios/BuscarUsuario?parametroUsuario=' + correoUsuario;
    $.getJSON(urlusuario, function (datausuario) {
        idUsuario = datausuario.Id;
        document.getElementById('correoUsuario').value = datausuario.Cod_Usuario;
        document.getElementById('nombreUsuario').value = datausuario.Nombre;
        document.getElementById('apellidoUsuario').value = datausuario.Apellido;
        document.getElementById('rutUsuario').value = datausuario.Rut;
        document.getElementById('perfilUsuario').value = datausuario.Nom_Perfil;
        $("#perfilUsuario option").each(function () {
            if ($(this).text() == datausuario.Nom_Perfil) {
                document.getElementById('perfilUsuario').selectedIndex = $(this).index();
            }
        });
        //document.getElementById("mySelect").selectedIndex = "2";
        codigoPerfil = datausuario.Cod_Perfil;
    });
    $('#listaUsuarios').modal('show');
});

$(document).on('click', '.estadoInactivoUsuario', function () {
    console.log('estadoInactivoUsario');
    var nombreCompleto = document.getElementById('#usuario').innerText;
    var campos = nombreCompleto.split(' ');
    var soloNombre = campos[0];
    codigoUsuarioSel = $(this).parents('tr').find('td:nth-child(2)').text();
    if ($(this).parents('tr').find('td:nth-child(6)').text() == 'ACTIVO') {
        estadoUsuarioSel = 'INACTIVO';
    } else {
        estadoUsuarioSel = 'ACTIVO';
    }
    nombreUsuario = $(this).parents('tr').find('td:nth-child(3)').text() + ' ' + $(this).parents('tr').find('td:nth-child(4)').text();
    $('#msg1').text('Estimado ' + soloNombre + ':');
    $('#msg2').text('¿Está seguro que desea cambiar de estado al usuario: ');
    $('#msg3').text(nombreUsuario);
    $('#mensajeAlertaEstadoUsuarios').modal('show');
});

function EstadoUsuario(usuario, estado) {
    var tblArr1 = [];
    var tblParametro = {
        Cod_Usuario: "",
        Estado: "",
        User_Log: ""
    };
    tblParametro.Cod_Usuario = usuario;
    tblParametro.Estado = estado;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr1.push(tblParametro);
    console.log(tblArr1);
    return JSON.stringify(tblArr1);
}

$('#aceptarMensajeEstadoUsuarios').on('click', function () {
    console.log(codigoUsuarioSel + ' ' + estadoUsuarioSel);
    $('#mensajeAlertaEstadoUsuarios').modal('hide');
    $('#modalCambioEstadoUsuarioInt').modal('show');
});

$('#cerraralertaUsuarioRegistrado').on('click', function () {
    $('#alertaUsuarioRegistrado').modal('hide');
});