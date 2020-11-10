let planillaCobro;
let condicionPago;
let tipoDocumento;
let tipoEmpresa;
let empresaRegla;
let codigoRegla;
let estadoRegla;

function crearTablaEmpresas() {
    var tableempresa = $('#tbl-empresas').DataTable({
        'destroy': true,
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/Empresa/ListaEmpresas',
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
                        '<a class="editEstadoEmpresa" title="Editar""><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoEmpresa" title="Desactivar" data-toggle="tooltip"><i class="fas fa-check-circle" style="color: #039d06;"></i></a><a class="infoEmpresa" title="Info" data-toggle="tooltipEmpresa"><i class="fas fa-info-circle" style="color: #ff6c00;"></i></a>' :
                        '<a class="editEstadoEmpresa" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoEmpresa" title="Activar" data-toggle="tooltip"><i class="fas fa-times-circle" style="color: #E34724;"></i></a><a class="infoEmpresa" title="Info" data-toggle="tooltipEmpresa"><i class="fas fa-info-circle" style="color: #ff6c00;"></i></a>';
                },

                //'defaultContent': '<a class="editEstadoEmpresa" title="Editar" data-toggle="tooltip"><i class="material-icons" style="color: #007bff;">&#xE254;</i></a><a class="estadoInactivoEmpresa" title="Activar/Desactivar" data-toggle="tooltip"><i class="material-icons" style="color: #E34724;">&#xe15c;</i></a>',
                'width': '10%'
            },
            {
                'data': 'Cod_Empresa',
                'title': 'CÓDIGO'
            },
            { 'data': 'Rut', 'title': 'RUT' },
            { 'data': 'Nom_Fantasia', 'title': 'EMPRESA' },
            { 'data': 'Email', 'title': 'CORREO' },
            { 'data': 'Telefono', 'title': 'TELÉFONO' },
            { 'data': 'Estado', 'title': 'ESTADO' },
            { 'data': 'Motivo', 'title': 'MOTIVO', 'visible': false }
        ]
    });
}

$(document).ready(function () {
    crearTablaEmpresas();
    //COMBO COMUNA CONVENIO
    let comuna = $('#comunaConvenio');
    comuna.empty();
    comuna.append('<option selected="true" disabled>Seleccione</option>');
    comuna.prop('selectedIndex', 0);
    var url = ambiente + '/Empresa/Comuna';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            if (entry.Nom_Comuna != ' No Selecionada') {
                comuna.append($('<option></option>').attr('value', entry.Cod_Comuna).text(entry.Nom_Comuna));
            }
        })
    });
    //COMBO HOLDING
    let comboHolding = $('#holdingConvenio');
    comboHolding.empty();
    comboHolding.append('<option selected="true" disabled>Seleccione</option>');
    comboHolding.prop('selectedIndex', 0);
    var url = ambiente + '/Empresa/ListaHolding';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            comboHolding.append($('<option></option>').attr('value', entry.Rut).text(entry.Nom_Fantasia));
        })
    });
    //COMBO CONDICION DE PAGO
    let condicionPago = $('#condicionPagoConvenio');
    condicionPago.empty();
    condicionPago.append('<option selected="true" disabled>Seleccione</option>');
    condicionPago.prop('selectedIndex', 0);
    var url = ambiente + '/Empresa/ListaCondicionesPago';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            condicionPago.append($('<option></option>').attr('value', entry.Cod_Con_Pago).text(entry.Nom_Con_Pago));
        })
    });

    //COMBO PLANTILLA COBRO
    let plantillaCobro = $('#plantillaCobroConvenio');
    plantillaCobro.empty();
    plantillaCobro.append('<option selected="true" disabled>Seleccione</option>');
    plantillaCobro.attr('selectedIndex', 0);
    var url = ambiente + '/Empresa/ListaPlantillaCobro';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            plantillaCobro.append($('<option></option>').attr('value', entry.Cod_Plantilla).text(entry.Nom_Plnatilla_Cobro));
        })
    });

    //COMBO DOCUMENTOS COBRO
    let documentoPago = $('#documentoPagoConvenio');
    documentoPago.empty();
    documentoPago.append('<option selected="true" disabled>Seleccione</option>');
    documentoPago.prop('selectedIndex', 0);
    var url = ambiente + '/Empresa/ListaDocumentoPago';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            documentoPago.append($('<option></option>').attr('value', entry.Cod_Doc).text(entry.Nom_Doc));
        })
    });
});



$(document).on("click", ".editRegla", function () {
    $('#codigoCampo').attr('disabled', true);
    campos = document.getElementById('tbl-camposPerzonalizados');
    codigoCampoSel = campos.rows[$(this).closest("tr").index() + 1].cells[1].innerHTML;
    descipcionCampoSel = campos.rows[$(this).closest("tr").index() + 1].cells[2].innerHTML;
    tipoCampoSel = campos.rows[$(this).closest("tr").index() + 1].cells[3].innerHTML;
    valoresCampoSel = campos.rows[$(this).closest("tr").index() + 1].cells[4].innerHTML;
    validarCampoSel = campos.rows[$(this).closest("tr").index() + 1].cells[5].innerHTML;
    console.log(validarCampoSel);
    $('#codigoCampo').val(codigoCampoSel);
    $('#descripcionCampo').val(descipcionCampoSel);
    $('#tipoCampo').val(tipoCampoSel);
    $('#valoresCampo').val(valoresCampoSel);
    $('#validarCampo').val(validarCampoSel);
    $('#listaEmpresa').modal('hide');
    $('#datosCamposPersolaizables').modal('show');
});


$(document).on("click", ".estadoRegla", function () {
    campos = document.getElementById('tbl-camposPerzonalizados');
    codigoRegla = campos.rows[$(this).closest("tr").index() + 1].cells[1].innerHTML;
    if (campos.rows[$(this).closest("tr").index() + 1].cells[6].innerHTML == 'ACTIVO') {
        estadoRegla = 'INACTIVO';
    } else {
        estadoRegla = 'ACTIVO';
    }

    empresaRegla = $('#codConvenio').val();
    var nombreCompleto = document.getElementById('#usuario').innerText;
    var camposn = nombreCompleto.split(' ');
    var soloNombre = camposn[0];
    empresa = $(this).parents('tr').find('td:nth-child(3)').text();
    $('#msgregla1').text('Estimado ' + soloNombre + ':');
    $('#msgregla2').text('¿Está seguro que desea cambiar de estado de la regla: ');
    $('#msgregla3').text(empresa);
    $('#mensajeAlertaEstadoRegla').modal('show');
});

$('#aceptarmensajeAlertaEstadoRegla').on('click', function () {
    $.ajax(ambiente + "/Empresa/ActualizarEstadoRegla", {
        type: "POST",
        contentType: "application/json",
        data: EstadoRegla(empresaRegla, codigoRegla, estadoRegla)
    }).done(function () {
        $('#tbl-camposPerzonalizados tbody').empty();
        var urlreglas = ambiente + '/Empresa/ListaReglas?codEmpresa=' + codigoConvenio;
        console.log('reglas');
        $.getJSON(urlreglas, function (dataReglas) {
            $.each(dataReglas, function (i, item) {
                if (item.Estado == 'ACTIVO') {
                    valorActivo = '<a class="estadoRegla" title="Activar" data-toggle="tooltip"><i class="fas fa-check-circle" style="color: #039d06;"></i></a>';
                } else {
                    valorActivo = '<a class="estadoRegla" title="Desactivar" data-toggle="tooltip"><i class="fas fa-times-circle" style="color: #E34724;"></i></a>';
                }
                $('#tbl-camposPerzonalizados tbody').append(
                    '<tr>'
                    + '<td>' + '<a class="editRegla" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a>' + valorActivo + '</td>'
                    + '<td>' + item.Cod_Ref + '</td>'
                    + '<td>' + item.Nom_Ref + '</td>'
                    + '<td>' + item.Tipo_Ref + '</td>'
                    + '<td>' + item.Valor + '</td>'
                    + '<td>' + item.Valida + '</td>'
                    + '<td>' + item.Estado + '</td>'
                    + '</tr>');
            })
        });
        $('#mensajeAlertaEstadoRegla').modal('hide');
    });

})

$('#plantillaCobroConvenio').on('change', function () {
    planillaCobro = $(this).find(':selected').val();
});

$('#condicionPagoConvenio').on('change', function () {
    condicionPago = $(this).find(':selected').val();
});

$('#documentoPagoConvenio').on('change', function () {
    tipoDocumento = $(this).find(':selected').val();
});

$('#naturalezaConvenio').on('change', function () {
    tipoEmpresa = $(this).find(':selected').val();
});

$("#tbl-camposPerzonalizados").on("click", "td", function () {

});

$('#nuevoCampo').on('click', function () {
    $('#listaEmpresa').modal('hide');
    $('#datosCamposPersolaizables').modal('show');
});

function limpiarCampos() {
    $('#tipoCampo').prop('selectedIndex', 0);
    $('#validarCampo').prop('selectedIndex', 0);
    $('#registroCampos input').val('');
}

$('#cerrarCamposPersolaizables').on('click', function () {
    $('#datosCamposPersolaizables').modal('hide');
    $('#listaEmpresa').modal('show');
    $('#datosCamposPersolaizables').modal('hide');
    $('#listaEmpresa').modal('show');
    limpiarCampos();
});

$('#guardarCamposPersolaizables').on('click', function () {
    $.ajax(ambiente + "/Empresa/ActualizarRegla", {
        type: "POST",
        contentType: "application/json",
        data: DatosRegla()
    }).done(function () {
        $('#tbl-camposPerzonalizados tbody').empty();
        var urlreglas = ambiente + '/Empresa/ListaReglas?codEmpresa=' + codigoConvenio;
        console.log('reglas');
        $.getJSON(urlreglas, function (dataReglas) {
            $.each(dataReglas, function (i, item) {
                if (item.Estado == 'ACTIVO') {
                    valorActivo = '<a class="estadoRegla" title="Activar" data-toggle="tooltip"><i class="fas fa-check-circle" style="color: #039d06;"></i></a>';
                } else {
                    valorActivo = '<a class="estadoRegla" title="Desactivar" data-toggle="tooltip"><i class="fas fa-times-circle" style="color: #E34724;"></i></a>';
                }
                $('#tbl-camposPerzonalizados tbody').append(
                    '<tr>'
                    + '<td>' + '<a class="editRegla" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a>' + valorActivo + '</td>'
                    + '<td>' + item.Cod_Ref + '</td>'
                    + '<td>' + item.Nom_Ref + '</td>'
                    + '<td>' + item.Tipo_Ref + '</td>'
                    + '<td>' + item.Valor + '</td>'
                    + '<td>' + item.Valida + '</td>'
                    + '<td>' + item.Estado + '</td>'
                    + '</tr>');
            })
        });
        $('#datosCamposPersolaizables').modal('hide');
        limpiarCampos();
    })

});

$("#tbl-empresas").on("mouseenter", "td", function () {
    filaEmpresa = $('#tbl-empresas').DataTable().cell(this).index().row;
    var dataempresa = $('#tbl-empresas').DataTable().row(filaEmpresa).data();
    titulo = dataempresa['Motivo'];
    if (dataempresa['Motivo'] != null) {
        $('[data-toggle="tooltipEmpresa"]').attr("title", titulo).tooltip("_fixTitle");
    }
});

$("#tbl-empresas").on("mouseleave", "td", function () {
    $('[data-toggle="tooltipEmpresa"]').tooltip('dispose');
});

function disabledEmpresaCodigo() {
    $('#listaEmpresa input').prop('disabled', true);
    $('#listaEmpresa select').prop('disabled', true);
    $('#codConvenio').prop('disabled', false);
};

function disabledEmpresaRut() {
    $('#listaEmpresa input').prop('disabled', true);
    $('#listaEmpresa select').prop('disabled', true);
    $('#codConvenio').prop('disabled', false);
    $('#rutConvenio').prop('disabled', false);
};

function enabledEmpresaRut() {
    $('#listaEmpresa input').prop('disabled', false);
    $('#listaEmpresa select').prop('disabled', false);
};

$('#cerrarAlertaConvenioRegistrado').on('click', function () {
    $('#alertaConvenioRegistrado').modal('hide');
    $('#codConvenio').val('');
    $('#codConvenio').focus();
});

$('#cerrarAlertaConvenioRegistrado1').on('click', function () {
    $('#alertaConvenioRegistrado1').modal('hide');
    $('#rutConvenio').val('');
    $('#rutConvenio').focus();
});


$('#codConvenio').on('keypress', function (evtcodconvenio) {
    var codigoVacio;
    console.log('cod convenio');
    if (evtcodconvenio.keyCode === 13) {
        var url = ambiente + '/Empresa/Convenio?codConvenio=' + document.getElementById('codConvenio').value;
        $.getJSON(url, function (dataconvenio) {
            codigoVacio = dataconvenio.Cod_Empresa;
            if (dataconvenio.Cod_Empresa != "") {
                $('#alertaConvenioRegistrado').modal('show');
                disabledEmpresaCodigo();
                $('#codConvenio').val('');
            }
        });
        if ($('#codConvenio').val() != '') {
            $('#rutConvenio').prop('disabled', false);
            $('#rutConvenio').focus();
        }
    }
});

$('#rutConvenio').on('keypress', function (evtrutconvenio) {
    if (evtrutconvenio.keyCode === 13) {
        var url = ambiente + '/Empresa/ConvenioRut?Rut=' + document.getElementById('rutConvenio').value;
        $.getJSON(url, function (dataempresa) {
            console.log('dataempresa.Cod_Empresa ', dataempresa.Cod_Empresa);
            if (dataempresa.Cod_Empresa != "") {
                $('#mensajeCodigoEmpresa').text(dataempresa.Cod_Empresa + '-' + dataempresa.Nom_Fantasia);
                $('#alertaConvenioRegistrado1').modal('show');
                disabledEmpresaRut();
            }
        });

        if ($('#rutConvenio').val() != '') {
            enabledEmpresaRut();
            $('#razonConvenio').focus();
        }
    }
});

function limpiarModalEmpresa() {
    $('#comunaConvenio').prop('selectedIndex', 0);
    $('#holdingConvenio').prop('selectedIndex', 0);
    $('#plantillaCobroConvenio').prop('selectedIndex', 0);
    $('#condicionPagoConvenio').prop('selectedIndex', 0);
    $('#documentoPagoConvenio').prop('selectedIndex', 0);
    $('#collapseTwoEmpresa').collapse('hide');
    $('#collapseThreeEmpresa').collapse('hide');
    $('#collapseOneEmpresa').addClass('collapse show');
};

$('#cerrarModalEmpresa').on('click', function () {
    crearTablaEmpresas();
    $('input').val('');
    QuitarSwitch();
    $('#listaEmpresa').modal('hide');
    limpiarModalEmpresa();
});

$('#cerraralertaRutEmpresa').on('click', function () {
    $('#alertaRutEmpresa').modal('hide');
    disabledEmpresaRut();
    $('#rutConvenio').val('');
    $('#rutConvenio').focus();
});

$('#nuevaEmpresa').click(function () {
    limpiarModalEmpresa();
    disabledEmpresaCodigo();
    $('input[type="checkbox"]').attr('checked', false);
    nuevaEmpresa = true;
    $('.switchdemo').simpleSwitch();
    $('#listaEmpresa').modal('show');
});

$(document).on("click", ".estadoInactivoEmpresa", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    QuitarSwitch();
});

$(document).on("click", ".editEstadoEmpresa", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    enabledEmpresaRut();
    var valor = document.getElementById('#usuario').innerText;
    if (valor.length != 0) {
        codigoConvenio = $(this).parents("tr").find("td:nth-child(2)").text();
        var urlreglas = ambiente + '/Empresa/ReglasNegocio?codConvenio=' + codigoConvenio;
        $.getJSON(urlreglas, function (datareglas) {
            valor1 = datareglas.Procesa_Automatico;
            valor2 = datareglas.Centro_Costo;
            valor3 = datareglas.Area;
            valor4 = datareglas.Rut_Pasajeros;
            valor5 = datareglas.Cliente_Prefactura;
            valor6 = datareglas.Objetar_Servicio;
            valor7 = datareglas.Vale_Digital;
            valor8 = datareglas.Vale_Original;
            valor9 = datareglas.Firma_Vale;
            valor10 = datareglas.Mostrar_Fono_Conductor;
        }).done(function () {
            setInterval(3000);
            $('#procesoAutomatico').attr('checked', ValorCheckedReglas(valor1));
            $('#requiereCentroCosto').attr('checked', ValorCheckedReglas(valor2));
            $('#requiereArea').attr('checked', ValorCheckedReglas(valor3));
            $('#rutPasajero').attr('checked', ValorCheckedReglas(valor4));
            $('#apruebaPrefactura').attr('checked', ValorCheckedReglas(valor5));
            $('#objetaServicios').attr('checked', ValorCheckedReglas(valor6));
            $('#valeDigital').attr('checked', ValorCheckedReglas(valor7));
            $('#valeOriginal').attr('checked', ValorCheckedReglas(valor8));
            $('#firmaVale').attr('checked', ValorCheckedReglas(valor9));
            $('#fonoConductor').attr('checked', ValorCheckedReglas(valor10));
            Procesa_Automatico = valor1;
            Centro_Costo = valor2;
            Area = valor3;
            Rut_Pasajeros = valor4;
            Cliente_Prefactura = valor5;
            Objetar_Servicio = valor6;
            Vale_Digital = valor7;
            Mostrar_Fono_Conductor = valor10;
            Firma_Vale = valor9;
            Vale_Original = valor8;
            console.log('Procesa_Automatico', Procesa_Automatico, 'Centro_Costo', Centro_Costo, 'Area', Area, 'Rut_Pasajeros', Rut_Pasajeros, 'Cliente_Prefactura', Cliente_Prefactura, 'Objetar_Servicio', Objetar_Servicio, 'Vale_Digital', Vale_Digital, 'Mostrar_Fono_Conductor', Mostrar_Fono_Conductor, 'Firma_Vale', Firma_Vale, 'Vale_Original', Vale_Original)
            $('.switchdemo').simpleSwitch();
            //
        });
        var urlconvenio = ambiente + '/Empresa/Convenio?codConvenio=' + codigoConvenio;
        $.getJSON(urlconvenio, function (dataconvenio) {
            document.getElementById('codConvenio').value = dataconvenio.Cod_Empresa;
            document.getElementById('rutConvenio').value = dataconvenio.Rut;
            document.getElementById('razonConvenio').value = dataconvenio.Razon_Social;
            document.getElementById('fantasiaConvenio').value = dataconvenio.Nom_Fantasia;
            document.getElementById('direccionConvenio').value = dataconvenio.Direccion;
            $("#comunaConvenio option").each(function () {
                if ($(this).val() == dataconvenio.Comuna) {
                    document.getElementById('comunaConvenio').selectedIndex = $(this).index();
                }
            });
            document.getElementById('representanteConvenio').value = dataconvenio.Rep_Legal;
            document.getElementById('cargoConvenio').value = dataconvenio.Rep_Cargo;
            document.getElementById('inicioConvenio').value = dataconvenio.Fecha_Inicio;
            document.getElementById('terminoConvenio').value = dataconvenio.Fecha_Termino;
            document.getElementById('minSolicitudConvenio').value = dataconvenio.Min_Solicitud;
            document.getElementById('minAlertaSolicitudConvenio').value = dataconvenio.Min_Alerta_Solicitud;
            document.getElementById('minAlertaPlanificacionConvenio').value = dataconvenio.Min_Alerta_Planificacion;
            document.getElementById('ejecutivoConvenio').value = dataconvenio.Ejecutivo_Convenio;
            document.getElementById('direccionDocumentoConvenio').value = dataconvenio.Direcion_Doc;
            document.getElementById('periodoFacturacionConvenio').value = dataconvenio.Periodo_Facturacion;
            $("#plantillaCobroConvenio option").each(function () {
                if ($(this).val() == dataconvenio.Plantilla_Cobro) {
                    document.getElementById('plantillaCobroConvenio').selectedIndex = $(this).index();
                }
                planillaCobro = dataconvenio.Plantilla_Cobro;
            });
            document.getElementById('plantillaCobroConvenio').value = dataconvenio.Plantilla_Cobro;
            document.getElementById('telefonoConvenio').value = dataconvenio.Telefono;
            document.getElementById('observacionOperacionesConvenio').value = dataconvenio.Obs_Operaciones;
            document.getElementById('observacionAdministracionConvenio').value = dataconvenio.Obs_Administracion;
            document.getElementById('observacionConductoresConvenio').value = dataconvenio.Obs_Conductores;
            document.getElementById('webConvenio').value = dataconvenio.Pagina_Web;
            document.getElementById('correoConvenio').value = dataconvenio.Email;
            $("#holdingConvenio option").each(function () {
                if ($(this).val() == dataconvenio.Empresa_Padre) {
                    document.getElementById('holdingConvenio').selectedIndex = $(this).index();
                }
            });
            $("#naturalezaConvenio option").each(function () {
                if ($(this).val() == dataconvenio.Tipo_Empresa) {
                    document.getElementById('naturalezaConvenio').selectedIndex = $(this).index();
                }
                tipoEmpresa = dataconvenio.Tipo_Empresa;
            });
            document.getElementById('contactoFacturacionConvenio').value = dataconvenio.Contacto_Fac;
            document.getElementById('correoContactoFacturacionConvenio').value = dataconvenio.Correo_Fac;
            document.getElementById('telefonoContactoFacturacionConvenio').value = dataconvenio.Telefono_Fac;
            document.getElementById('contactoAdministracionConvenio').value = dataconvenio.Contacto_Adm;
            document.getElementById('correoContactoAdministracionConvenio').value = dataconvenio.Correo_Adm;
            document.getElementById('telefonoContactoAdministracionConvenio').value = dataconvenio.Telefono_Adm;
            $("#condicionPagoConvenio option").each(function () {
                if ($(this).val() == dataconvenio.Cond_Pago) {
                    document.getElementById('condicionPagoConvenio').selectedIndex = $(this).index();
                }
                condicionPago = dataconvenio.Cond_Pago;
            });
            $("#documentoPagoConvenio option").each(function () {
                if ($(this).val() == dataconvenio.Tipo_Doc) {
                    document.getElementById('documentoPagoConvenio').selectedIndex = $(this).index();
                }
                tipoDocumento = dataconvenio.Tipo_Doc;
            });

            //Carga Lista de Reglas
            $('#tbl-camposPerzonalizados tbody').empty();
            var urlreglas = ambiente + '/Empresa/ListaReglas?codEmpresa=' + codigoConvenio;
            console.log('reglas');
            $.getJSON(urlreglas, function (dataReglas) {
                $.each(dataReglas, function (i, item) {
                    if (item.Estado == 'ACTIVO') {
                        valorActivo = '<a class="estadoRegla" title="Activar" data-toggle="tooltip"><i class="fas fa-check-circle" style="color: #039d06;"></i></a>';
                    } else {
                        valorActivo = '<a class="estadoRegla" title="Desactivar" data-toggle="tooltip"><i class="fas fa-times-circle" style="color: #E34724;"></i></a>';
                    }
                    $('#tbl-camposPerzonalizados tbody').append(
                        '<tr>'
                        + '<td>' + '<a class="editRegla" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a>' + valorActivo + '</td>'
                        + '<td>' + item.Cod_Ref + '</td>'
                        + '<td>' + item.Nom_Ref + '</td>'
                        + '<td>' + item.Tipo_Ref + '</td>'
                        + '<td>' + item.Valor + '</td>'
                        + '<td>' + item.Valida + '</td>'
                        + '<td>' + item.Estado + '</td>'
                        + '</tr>');
                })
            });
            //


        }).done(function () {
            $('#listaEmpresa').modal('show');
        });


    } else {
        var url = ambiente + '/Login/Login';
        document.location.href = url;
    }
});

function ValorCheckedReglas(valor) {
    nvalor = false;
    if (valor == 'SI') {
        nvalor = true;
    } else {
        nvalor = false;
    }
    return nvalor;
}

function QuitarSwitch() {
    $('input[type="checkbox"]').removeClass('switchdemo');
    $('input[type="checkbox"]').attr('checked', false);
}

function reglas() {
    console.log('Procesa_Automatico', Procesa_Automatico);
    console.log('Centro_Costo', Centro_Costo);
    console.log('Area', Area);
    console.log('Rut_Pasajeros', Rut_Pasajeros);
    console.log('Cliente_Prefactura', Cliente_Prefactura);
    console.log('Objetar_Servicio', Objetar_Servicio);
    console.log('Vale_Digital', Vale_Digital);
    console.log('Mostrar_Fono_Conductor', Mostrar_Fono_Conductor);
    console.log('Firma_Vale', Firma_Vale);
    console.log('Vale_Original', Vale_Original);
}

function GuardarEmpresa() {
    var tblArr1 = [];
    var tblParametro = {
        Cod_Empresa: "",
        Rut: "",
        Razon_Social: "",
        Nom_Fantasia: "",
        Direccion: "",
        Comuna: "",
        Rep_Legal: "",
        Rep_Cargo: "",
        Fecha_Inicio: "",
        Fecha_Termino: "",
        Min_Solicitud: "",
        Min_Alerta_Solicitud: "",
        Min_Alerta_Planificacion: "",
        Ejecutivo_Convenio: "",
        Direcion_Doc: "",
        Periodo_Facturacion: "",
        Obs_Operaciones: "",
        Obs_Administracion: "",
        Obs_Conductores: "",
        Plantilla_Cobro: "",
        Telefono: "",
        Pagina_Web: "",
        Email: "",
        Estado: "",
        Empresa_Padre: "",
        Procesa_Automatico: "",
        Centro_Costo: "",
        Area: "",
        Rut_Pasajeros: "",
        Cliente_Prefactura: "",
        Objetar_Servicio: "",
        Vale_Digital: "",
        Mostrar_Fono_Conductor: "",
        Firma_Vale: "",
        Vale_Original: "",
        User_Log: "",
        Contacto_Fac: "",
        Correo_Fac: "",
        Telefono_Fac: "",
        Contacto_Adm: "",
        Correo_Adm: "",
        Telefono_Adm: "",
        Cond_Pago: "",
        Tipo_Doc: "",
        Tipo_Empresa: ""

    };
    tblParametro.Cod_Empresa = document.getElementById("codConvenio").value;
    tblParametro.Rut = document.getElementById("rutConvenio").value;
    tblParametro.Razon_Social = (document.getElementById("razonConvenio").value).toUpperCase();
    tblParametro.Nom_Fantasia = (document.getElementById("fantasiaConvenio").value).toUpperCase();
    tblParametro.Direccion = (document.getElementById("direccionConvenio").value).toUpperCase();
    tblParametro.Comuna = document.getElementById("comunaConvenio").value;
    tblParametro.Rep_Legal = (document.getElementById("representanteConvenio").value).toUpperCase();
    tblParametro.Rep_Cargo = (document.getElementById("cargoConvenio").value).toUpperCase();
    tblParametro.Fecha_Inicio = document.getElementById("inicioConvenio").value;
    tblParametro.Fecha_Termino = document.getElementById("terminoConvenio").value;
    tblParametro.Min_Solicitud = document.getElementById("minSolicitudConvenio").value;
    tblParametro.Min_Alerta_Solicitud = document.getElementById("minAlertaSolicitudConvenio").value;
    tblParametro.Min_Alerta_Planificacion = document.getElementById("minAlertaPlanificacionConvenio").value;
    tblParametro.Ejecutivo_Convenio = (document.getElementById("ejecutivoConvenio").value).toUpperCase();
    tblParametro.Direcion_Doc = (document.getElementById("direccionDocumentoConvenio").value).toUpperCase();
    tblParametro.Periodo_Facturacion = document.getElementById("periodoFacturacionConvenio").value;
    tblParametro.Obs_Operaciones = (document.getElementById("observacionOperacionesConvenio").value).toUpperCase();
    tblParametro.Obs_Administracion = (document.getElementById("observacionAdministracionConvenio").value).toUpperCase();
    tblParametro.Obs_Conductores = (document.getElementById("observacionConductoresConvenio").value).toUpperCase();
    tblParametro.Plantilla_Cobro = planillaCobro;
    tblParametro.Telefono = document.getElementById("telefonoConvenio").value;
    tblParametro.Pagina_Web = (document.getElementById("webConvenio").value).toUpperCase();
    tblParametro.Email = (document.getElementById("correoConvenio").value).toUpperCase();
    tblParametro.Estado = 'ACTIVO';
    tblParametro.Empresa_Padre = document.getElementById("holdingConvenio").value;
    tblParametro.Procesa_Automatico = Procesa_Automatico;
    tblParametro.Centro_Costo = Centro_Costo;
    tblParametro.Area = Area;
    tblParametro.Rut_Pasajeros = Rut_Pasajeros;
    tblParametro.Cliente_Prefactura = Cliente_Prefactura;
    tblParametro.Objetar_Servicio = Objetar_Servicio;
    tblParametro.Vale_Digital = Vale_Digital;
    tblParametro.Mostrar_Fono_Conductor = Mostrar_Fono_Conductor;
    tblParametro.Firma_Vale = Firma_Vale;
    tblParametro.Vale_Original = Vale_Original;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblParametro.Contacto_Fac = (document.getElementById('contactoFacturacionConvenio').value).toUpperCase();
    tblParametro.Correo_Fac = (document.getElementById('correoContactoFacturacionConvenio').value).toUpperCase();
    tblParametro.Telefono_Fac = (document.getElementById('telefonoContactoFacturacionConvenio').value).toUpperCase();
    tblParametro.Contacto_Adm = (document.getElementById('contactoAdministracionConvenio').value).toUpperCase();
    tblParametro.Correo_Adm = (document.getElementById('correoContactoAdministracionConvenio').value).toUpperCase();
    tblParametro.Telefono_Adm = (document.getElementById('telefonoContactoAdministracionConvenio').value).toUpperCase();
    tblParametro.Cond_Pago = condicionPago;
    tblParametro.Tipo_Doc = tipoDocumento;
    tblParametro.Tipo_Empresa = tipoEmpresa;

    tblArr1.push(tblParametro);
    console.log(tblArr1);
    return JSON.stringify(tblArr1);
}

function EstadoEmpresa(convenio, estado) {
    var tblArr1 = [];
    var tblParametro = {
        Cod_Empresa: "",
        Estado: "",
        User_Log: "",
        Motivo: ""
    };
    tblParametro.Cod_Empresa = convenio;
    tblParametro.Estado = estado;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblParametro.Motivo = $('#motivoCambioEstadoEmpresa').val();
    tblArr1.push(tblParametro);
    console.log(tblArr1);
    return JSON.stringify(tblArr1);
}

function EstadoRegla(empresaRegla, codigoRegla, estadoRegla) {
    var tblArr1 = [];
    var tblParametro = {
        Cod_Emp: "",
        Cod_Ref: "",
        Estado: "",
        UserLog: ""
    };
    tblParametro.Cod_Emp = empresaRegla;
    tblParametro.Cod_Ref = codigoRegla;
    tblParametro.Estado = estadoRegla;
    tblParametro.UserLog = document.getElementById('#usuario').innerText;
    tblArr1.push(tblParametro);
    console.log(tblArr1);
    return JSON.stringify(tblArr1);
}

function DatosRegla() {
    var tblArr1 = [];
    var tblParametro = {
        Cod_Emp: "",
        Cod_Ref: "",
        Nom_Ref: "",
        Tipo_Ref: "",
        Valida: "",
        Valor: "",
        UserLog: ""
    };
    tblParametro.Cod_Emp = $('#codConvenio').val();
    tblParametro.Cod_Ref = $('#codigoCampo').val();
    tblParametro.Nom_Ref = ($('#descripcionCampo').val()).toUpperCase();;
    tblParametro.Tipo_Ref = $('#tipoCampo').val();
    tblParametro.Valida = $('#validarCampo').val();
    tblParametro.Valor = ($('#valoresCampo').val()).toUpperCase();;
    tblParametro.UserLog = document.getElementById('#usuario').innerText;
    tblArr1.push(tblParametro);
    console.log(tblArr1);
    return JSON.stringify(tblArr1);
}

function EstadoHolding(codigoHoldingSel, estadoHoldingSel) {
    var tblArr1 = [];
    var tblParametro = {
        Rut: "",
        Estado: "",
        User_Log: "",
        Motivo: ""
    };
    tblParametro.Rut = codigoHoldingSel;
    tblParametro.Estado = estadoHoldingSel;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblParametro.Motivo = $('#motivoCambioEstadoHolding').val();
    tblArr1.push(tblParametro);
    console.log(tblArr1);
    return JSON.stringify(tblArr1);
}


$("#guardarEmpresa1").on("click", function () {
    GuardarEmpresa();
})

$("#guardarEmpresa").on("click", function () {
    var vaciosEmpresa = validarVaciosEmpresa();
    if (vaciosEmpresa == false) {
        if (nuevaEmpresa == true) {
            console.log('guardar');
            $.ajax(ambiente + "/Empresa/GuardarEmpresa", {
                type: "POST",
                contentType: "application/json",
                data: GuardarEmpresa()
            }).done(function () {
                //tablaEmpresa();
                //reglas();
                QuitarSwitch();
                limpiarCampos();
                limpiarModalEmpresa();
                crearTablaEmpresas();
            });
        } else {
            console.log('actualizar');
            $.ajax(ambiente + "/Empresa/ActualizarEmpresa", {
                type: "POST",
                contentType: "application/json",
                data: GuardarEmpresa()
            }).done(function () {
                //tablaEmpresa();
                //reglas();
                QuitarSwitch();
                limpiarCampos();
                limpiarModalEmpresa();
                crearTablaEmpresas();
            });
        }
        $('input').val('');
        nuevaEmpresa = false;
        $('#listaEmpresa').modal('hide');
    } else {
        listaCamposVaciosEmpresa = listaCamposVaciosEmpresa.substring(0, listaCamposVaciosEmpresa.length - 2);
        $('#mensajeVacioEmpresa').text('Verifique que los siguientes campos no hayan quedado vacíos: ' + listaCamposVaciosEmpresa);
        $('#alertaCamposVaciosEmpresa').modal('show');
    }
})

$('#listaEmpresa').on('shown.bs.modal', function () {
    $('#codConvenio').focus();
})

$(document).on('click', '.estadoInactivoEmpresa', function () {
    var nombreCompleto = document.getElementById('#usuario').innerText;
    var campos = nombreCompleto.split(' ');
    var soloNombre = campos[0];
    codigoConvenioSel = $(this).parents('tr').find('td:nth-child(2)').text();
    if ($(this).parents('tr').find('td:nth-child(7)').text() == 'ACTIVO') {
        estadoConvenioSel = 'INACTIVO';
    } else {
        estadoConvenioSel = 'ACTIVO';
    }

    convenio = $(this).parents('tr').find('td:nth-child(4)').text();
    $('#msg1').text('Estimado ' + soloNombre + ':');
    $('#msg2').text('¿Está seguro que desea cambiar de estado al convenio: ');
    $('#msg3').text(convenio);
    $('#mensajeAlertaEstadoEmpresa').modal('show');
});

$('#aceptarMensajeEstadoEmpresa').on('click', function () {
    $('#mensajeAlertaEstadoEmpresa').modal('hide');
    $('#modalCambioEstadoEmpresa').modal('show');
});

$('#guardarCambioEstadoEmpresa').on('click', function () {
    $.ajax(ambiente + "/Empresa/ActualizarEstadoEmpresa", {
        type: "POST",
        contentType: "application/json",
        data: EstadoEmpresa(codigoConvenioSel, estadoConvenioSel)
    }).done(function () {
        $('#tbl-empresas').DataTable().ajax.reload();
        $('#mensajeAlertaEstadoEmpresa').modal('hide');
        $('#modalCambioEstadoEmpresa').modal('hide');
        $('#motivoCambioEstadoEmpresa').val('');
    });
});

$('#cerrarCambioEstadorEmpresa').on('click', function () {
    $('#alertaCamposVaciosEmpresa').modal('hide');
});

$('#modalCambioEstadoEmpresa').on('shown.bs.modal', function () {
    $('#motivoCambioEstadoEmpresa').focus();
})

$('#direccionConvenio').on('keyup keypress blur', function () {
    $('#direccionDocumentoConvenio').val($(this).val());
});

$('#comunaConvenio').on('change', function () {
    direccionEnvio = $('#direccionConvenio').val() + ', ' + $(this).find(':selected').text();
    $('#direccionDocumentoConvenio').val('');
    $('#direccionDocumentoConvenio').val(direccionEnvio);
});


function checkVacioRutEmpresa(rut) {
    var valor = rut.value;
    cuerpo = valor;
    if (cuerpo.length == 0) { rut.setCustomValidity("No puede ser vacío"); return false; }
    if (checkRut(rut) == false) {
        disabledUsuario();
        $('#alertaRutEmpresa').modal('show');
        rut.setCustomValidity("RUT Inválido");
        return false;
    }
    rut.setCustomValidity('');
};

function validarVaciosEmpresa() {
    camposVaciosEmpresa = false;
    if (document.getElementById('codConvenio').value == '') {
        document.getElementById('codConvenio').setCustomValidity('No puede ser vacío');
        listaCamposVaciosEmpresa = listaCamposVaciosEmpresa + 'Código, ';
        camposVaciosEmpresa = true;
    }
    if (document.getElementById('rutConvenio').value == '') {
        document.getElementById('rutConvenio').setCustomValidity('No puede ser vacío');
        listaCamposVaciosEmpresa = listaCamposVaciosEmpresa + 'Rut, ';
        camposVaciosEmpresa = true;
    }
    if (document.getElementById('razonConvenio').value == '') {
        document.getElementById('razonConvenio').setCustomValidity('No puede ser vacío');
        listaCamposVaciosEmpresa = listaCamposVaciosEmpresa + 'Razón Social, ';
        camposVaciosEmpresa = true;
    }
    if (document.getElementById('fantasiaConvenio').value == '') {
        document.getElementById('fantasiaConvenio').setCustomValidity('No puede ser vacío');
        listaCamposVaciosEmpresa = listaCamposVaciosEmpresa + 'Nombre de Fantasía, ';
        camposVaciosEmpresa = true;
    }
    if (document.getElementById('direccionConvenio').value == '') {
        document.getElementById('direccionConvenio').setCustomValidity('No puede ser vacío');
        listaCamposVaciosEmpresa = listaCamposVaciosEmpresa + 'Dirección, ';
        camposVaciosEmpresa = true;
    }
    if (document.getElementById('comunaConvenio').value == 'Seleccione') {
        document.getElementById('comunaConvenio').setCustomValidity('No puede ser vacío');
        listaCamposVaciosEmpresa = listaCamposVaciosEmpresa + 'Comuna, ';
        console.log('entro comuna');
        camposVaciosEmpresa = true;
    }
    if (document.getElementById('telefonoConvenio').value == '') {
        document.getElementById('telefonoConvenio').setCustomValidity('No puede ser vacío');
        listaCamposVaciosEmpresa = listaCamposVaciosEmpresa + 'Teléfono, ';
        camposVaciosEmpresa = true;
    }
    if (document.getElementById('inicioConvenio').value == '') {
        document.getElementById('inicioConvenio').setCustomValidity('No puede ser vacío');
        listaCamposVaciosEmpresa = listaCamposVaciosEmpresa + 'Inicio, ';
        camposVaciosEmpresa = true;
    }
    if (document.getElementById('terminoConvenio').value == '') {
        document.getElementById('terminoConvenio').setCustomValidity('No puede ser vacío');
        listaCamposVaciosEmpresa = listaCamposVaciosEmpresa + 'Fin, ';
        camposVaciosEmpresa = true;
    }
    if (document.getElementById('minSolicitudConvenio').value == '') {
        document.getElementById('minSolicitudConvenio').setCustomValidity('No puede ser vacío');
        listaCamposVaciosEmpresa = listaCamposVaciosEmpresa + 'Min. Solicitud, ';
        camposVaciosEmpresa = true;
    }
    if (document.getElementById('minAlertaSolicitudConvenio').value == '') {
        document.getElementById('minAlertaSolicitudConvenio').setCustomValidity('No puede ser vacío');
        listaCamposVaciosEmpresa = listaCamposVaciosEmpresa + 'Min. Alerta Solicitud, ';
        camposVaciosEmpresa = true;
    }
    if (document.getElementById('minAlertaPlanificacionConvenio').value == '') {
        document.getElementById('minAlertaPlanificacionConvenio').setCustomValidity('No puede ser vacío');
        listaCamposVaciosEmpresa = listaCamposVaciosEmpresa + 'Min. Alerta Planificacion, ';
        camposVaciosEmpresa = true;
    }
    if (document.getElementById('periodoFacturacionConvenio').value == '') {
        document.getElementById('periodoFacturacionConvenio').setCustomValidity('No puede ser vacío');
        listaCamposVaciosEmpresa = listaCamposVaciosEmpresa + 'Periodo de Facturacion, ';
        camposVaciosEmpresa = true;
    }
    console.log(listaCamposVaciosEmpresa);
    return camposVaciosEmpresa;
}