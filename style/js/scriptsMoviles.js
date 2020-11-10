$(document).ready(function () {
    var table = $('#tbl-moviles').DataTable({
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/Moviles/Lista',
        'autoWidth': false,
        'order': [[1, "asc"]],
        'height': '10%',
        'columns': [
            {
                'title': 'ACCIÓN',
                'targets': -1,
                'data': 'Estado_Movil',
                'className': 'dt-body-center',
                'render': function (data, type, full, meta) {
                    return (data === 'ACTIVO') ?
                        '<a class="editEstado" title="Editar""><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivo" title="Desactivar" data-toggle="tooltip"><i class="fas fa-check-circle" style="color: #039d06;"></i></a><a class="infoMovil" data-html="true" title="Info" data-toggle="tooltipMovil"><i class="fas fa-info-circle" style="color: #ff6c00;"></i></a>' :
                        '<a class="editEstado" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivo" title="Activar" data-toggle="tooltip"><i class="fas fa-times-circle" style="color: #E34724;"></i></a><a class="infoMovil" data-html="true" title="Info" data-toggle="tooltipMovil"><i class="fas fa-info-circle" style="color: #ff6c00;"></i></a>';
                },
                'width': '10%'
            },
            { 'data': 'Cod_Movil', 'title': 'MÓVIL' },
            { 'data': 'Nom_Completo', 'title': 'CONDUCTOR' },
            { 'data': 'Celular', 'title': 'CELULAR' },
            { 'data': 'Patente', 'title': 'PATENTE' },
            { 'data': 'Motivo_vehiculo', 'title': 'MV', 'visible': false },
            { 'data': 'Motivo_Propietario', 'title': 'MP', 'visible': false },
            { 'data': 'Motivo_Conductor', 'title': 'MC', 'visible': false }
        ]
    });

    let dropdown = $('#tipoCorreo');
    dropdown.empty();
    dropdown.append('<option selected="true" disabled>Seleccione</option>');
    dropdown.prop('selectedIndex', 0);
    var url = ambiente + '/EnviarCorreo/TiposCorreo';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            dropdown.append($('<option></option>').attr('value', entry.Cod_Tipo_Correo).text(entry.Nom_Tipo_Correo));
        })
        console.log('tipo correo');
    });

    //COMBO BANCO PROPIETARIO
    let bancoP = $('#bancoPropietario');
    bancoP.empty();
    bancoP.append('<option selected="true" disabled>Seleccione</option>');
    bancoP.prop('selectedIndex', 0);
    var url = ambiente + '/Moviles/BuscarBanco';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            bancoP.append($('<option></option>').attr('value', entry.Cod_Banco).text(entry.Nom_Banco));
        })
    });

    //COMBO TIPO VEHICULO
    let comboTipoVehiculo = $('#tipoVehiculo');
    comboTipoVehiculo.empty();
    comboTipoVehiculo.append('<option selected="true" disabled>Seleccione</option>');
    comboTipoVehiculo.prop('selectedIndex', 0);
    var url = ambiente + '/Moviles/TipoVehiculo';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            comboTipoVehiculo.append($('<option></option>').attr('value', entry.Cod_Vehiculo).text(entry.Nom_Vehiculo));
        })
    });

    //COMBO TECNOLOGIA VEHICULO
    let comboTecnologiaVehiculo = $('#tecnologiaVehiculo');
    comboTecnologiaVehiculo.empty();
    comboTecnologiaVehiculo.append('<option selected="true" disabled>Seleccione</option>');
    comboTecnologiaVehiculo.prop('selectedIndex', 0);
    var url = ambiente + '/Moviles/TecnologiaVehiculo';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            comboTecnologiaVehiculo.append($('<option></option>').attr('value', entry.Cod_Tecnologia).text(entry.Nom_Tecnologia));
        })
    });

    //COMBO CONTRATO VEHICULO
    let comboContratoVehiculo = $('#contratoVehiculo');
    comboContratoVehiculo.empty();
    comboContratoVehiculo.append('<option selected="true" disabled>Seleccione</option>');
    comboContratoVehiculo.prop('selectedIndex', 0);
    var url = ambiente + '/Moviles/TipoContrato';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            comboContratoVehiculo.append($('<option></option>').attr('value', entry.Cod_Contrato).text(entry.Nom_Contrato));
        })
    });

    //COMBO SUCUARSAL
    let comboSucursal = $('#sucursalVehiculo');
    comboSucursal.empty();
    comboSucursal.append('<option selected="true" disabled>Seleccione</option>');
    comboSucursal.prop('selectedIndex', 0);
    var url = ambiente + '/Moviles/Sucursales';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            comboSucursal.append($('<option></option>').attr('value', entry.Cod_Sucursal).text(entry.Nom_Sucursal));
        })
    });

    //COMBO TIPO CUENTA PROPIETARIO
    let comboTipoCuentaP = $('#tipoPropietario');
    comboTipoCuentaP.empty();
    comboTipoCuentaP.append('<option selected="true" disabled>Seleccione</option>');
    comboTipoCuentaP.prop('selectedIndex', 0);
    var url = ambiente + '/Moviles/TipoCuenta';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            comboTipoCuentaP.append($('<option></option>').attr('value', entry.Cod_Cuenta).text(entry.Nom_Cuenta));
        })
    });

    //COMBO TIPO CUENTA TITULAR
    let comboTipoCuentaT = $('#tipoCuentaTitular');
    comboTipoCuentaT.empty();
    comboTipoCuentaT.append('<option selected="true" disabled>Seleccione</option>');
    comboTipoCuentaT.prop('selectedIndex', 0);
    var url = ambiente + '/Moviles/TipoCuenta';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            comboTipoCuentaT.append($('<option></option>').attr('value', entry.Cod_Cuenta).text(entry.Nom_Cuenta));
        })
    });

    //COMBO COMUNA
    let comboComuna1 = $('#comunaConductor');
    comboComuna1.empty();
    comboComuna1.append('<option selected="true" disabled>Seleccione</option>');
    comboComuna1.prop('selectedIndex', 0);
    var url = ambiente + '/Moviles/Comuna';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            comboComuna1.append($('<option></option>').attr('value', entry.Cod_Comuna).text(entry.Nom_Comuna));
        })
    });

    //COMBO COMUNA1
    let comboComuna2 = $('#comunaConductor1');
    comboComuna2.empty();
    comboComuna2.append('<option selected="true" disabled>Seleccione</option>');
    comboComuna2.prop('selectedIndex', 0);
    var url = ambiente + '/Moviles/Comuna';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            comboComuna2.append($('<option></option>').attr('value', entry.Cod_Comuna).text(entry.Nom_Comuna));
        })
    });

    //COMBO CIUDAD
    let comboCiudad1 = $('#ciudadConductor');
    comboCiudad1.empty();
    comboCiudad1.append('<option selected="true" disabled>Seleccione</option>');
    comboCiudad1.prop('selectedIndex', 0);
    var url = ambiente + '/Moviles/Ciudad';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            comboCiudad1.append($('<option></option>').attr('value', entry.Cod_Ciudad).text(entry.Nom_Ciudad));
        })
    });

    //COMBO CIUDAD1
    let comboCiudad2 = $('#ciudadConductor1');
    comboCiudad2.empty();
    comboCiudad2.append('<option selected="true" disabled>Seleccione</option>');
    comboCiudad2.prop('selectedIndex', 0);
    var url = ambiente + '/Moviles/Ciudad';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            comboCiudad2.append($('<option></option>').attr('value', entry.Cod_Ciudad).text(entry.Nom_Ciudad));
        })
    });

    //COMBO GRUPO1
    let comboGrupo1 = $('#grupoConductor');
    comboGrupo1.empty();
    comboGrupo1.append('<option selected="true" disabled>Seleccione</option>');
    comboGrupo1.prop('selectedIndex', 0);
    var url = ambiente + '/Moviles/Grupos';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            comboGrupo1.append($('<option></option>').attr('value', entry.Cod_Grupo).text(entry.Descripcion));
        })
    });

    //COMBO GRUPO2
    let comboGrupo2 = $('#grupoConductor1');
    comboGrupo2.empty();
    comboGrupo2.append('<option selected="true" disabled>Seleccione</option>');
    comboGrupo2.prop('selectedIndex', 0);
    var url = ambiente + '/Moviles/Grupos';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            comboGrupo2.append($('<option></option>').attr('value', entry.Cod_Grupo).text(entry.Descripcion));
        })
    });

    //COMBO TURNO1
    let comboTurno1 = $('#turnoConductor');
    comboTurno1.empty();
    comboTurno1.append('<option selected="true" disabled>Seleccione</option>');
    comboTurno1.prop('selectedIndex', 0);
    var url = ambiente + '/Moviles/Turnos';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            comboTurno1.append($('<option></option>').attr('value', entry.Cod_Turno).text(entry.Nom_Turno));
        })
    });

    //COMBO TURNO2
    let comboTurno2 = $('#turnoConductor1');
    comboTurno2.empty();
    comboTurno2.append('<option selected="true" disabled>Seleccione</option>');
    comboTurno2.prop('selectedIndex', 0);
    var url = ambiente + '/Moviles/Turnos';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            comboTurno2.append($('<option></option>').attr('value', entry.Cod_Turno).text(entry.Nom_Turno));
        })
    });

    //COMBO TURNO1
    let comboLicencia1 = $('#licenciaConductor');
    comboLicencia1.empty();
    comboLicencia1.append('<option selected="true" disabled>Seleccione</option>');
    comboLicencia1.prop('selectedIndex', 0);
    var url = ambiente + '/Moviles/Licencias';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            comboLicencia1.append($('<option></option>').attr('value', entry.Cod_Licencia).text(entry.Nom_Licencia));
        })
    });

    //COMBO TURNO2
    let comboLicencia2 = $('#licenciaConductor1');
    comboLicencia2.empty();
    comboLicencia2.append('<option selected="true" disabled>Seleccione</option>');
    comboLicencia2.prop('selectedIndex', 0);
    var url = ambiente + '/Moviles/Licencias';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            comboLicencia2.append($('<option></option>').attr('value', entry.Cod_Licencia).text(entry.Nom_Licencia));
        })
    });

    //COMBO BANCO TITULAR
    let bancoT = $('#bancoTitular');
    bancoT.empty();
    bancoT.append('<option selected="true" disabled>Seleccione</option>');
    bancoT.prop('selectedIndex', 0);
    var url = ambiente + '/Moviles/BuscarBanco';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            bancoT.append($('<option></option>').attr('value', entry.Cod_Banco).text(entry.Nom_Banco));
        })
    });
});