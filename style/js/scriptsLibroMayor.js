
function crearTablaLibro() {
    var tableLibro = $('#tbl-libro1').removeAttr('width').DataTable({
        'fixedHeader': false,
        'destroy': true,
        'info': false,
        'scrollY': '262px',
        'sScrollX': '100%',
        'scrollCollapse': true,
        'paging': false,
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/LibroMayor/DetalleLibro?numeroMovil=' + selectedMovilLibro + '&&buscarDesde=' + convertInicio + '&&buscarHasta=' + convertFin,
        'height': '10%',
        'columns': [
            {
                'data': 'Emision', 'title': 'EMISIÓN', 'render': function (data, type) {
                    return type === 'sort' ? data : moment(data).format('DD/MM/YYYY');
                }
            },
            { 'data': 'Tipo_Doc', 'title': 'TIPO DOC. ' },
            { 'data': 'Num_Doc', 'title': 'NUM DOC. ' },
            {
                'data': 'Venc', 'title': 'VENCIM.', 'render': function (data, type) {
                    return type === 'sort' ? data : moment(data).format('DD/MM/YYYY');
                }
            },
            { 'data': 'Doc_Tipo', 'title': 'DOC. TIPO' },
            { 'data': 'N_Refer', 'title': 'NRO. REF.' },
            { 'data': 'Cpbte_N', 'title': 'CPBTE N' },
            { 'data': 'Fecha_Cpbte', 'title': 'FEC. CPBTE' },
            { 'data': 'Descripcion', 'title': 'DESCRIPCIÓN' },
            { 'data': 'Debe', 'title': 'DEBE', 'render': $.fn.dataTable.render.number('.', ',', 0), 'className': 'dt-body-right'  },
            { 'data': 'Haber', 'title': 'HABER', 'render': $.fn.dataTable.render.number('.', ',', 0), 'className': 'dt-body-right'  }
        ]
    });
};

$(document).ready(function () {
    let movilesLibro = $('#codigoMovilLibro');
    movilesLibro.empty();
    movilesLibro.append('<option selected="true" disabled>Seleccione</option>');
    movilesLibro.prop('selectedIndex', 0);
    var urllibro = ambiente + '/LibroMayor/ComboMovil?Correo=' + document.getElementById('#correoUsuario').innerText + '&&Perfil=' + document.getElementById('#perfil').innerText;
    $.getJSON(urllibro, function (datalibro) {
        $.each(datalibro, function (key, entrylibro) {
            movilesLibro.append($('<option></option>').attr('value', entrylibro.Cod_Movil).text(entrylibro.Cod_Movil));
        })
    });
});

$('#codigoMovilLibro').on('change', function () {
    document.getElementById('codigoContable').innerText = ':';
    document.getElementById('nombreMovil').innerText = ':';
    document.getElementById('nombreMovil').innerText = ':';
    document.getElementById('direccionMovil').innerText = ':';
    CodMovil = $(this).find(':selected').val();
    console.log(CodMovil);
    var url = ambiente + '/LibroMayor/MostrarMovil?Cod_Movil=' + CodMovil;
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            if (entry.Cod_Contable != null) {
                document.getElementById('codigoContable').innerText = ':  ' + entry.Cod_Contable;
            } else {
                document.getElementById('codigoContable').innerText = ':'
            }
            document.getElementById('nombreMovil').innerText = ':  ' + entry.Nom_Completo;
            document.getElementById('direccionMovil').innerText = ':  ' + entry.Direccion;
            if (entry.Telefono != null) {
                document.getElementById('telefonoMovil').innerText = ':  ' + entry.Telefono;
            } else {
                document.getElementById('telefonoMovil').innerText = ':'
            }
        })
    });
    selectedMovilLibro = CodMovil;
})


$('#buscarLibro').click(function () {
    $('#nolibro').css('display', 'block');
    $('#tbl-libro1').css('display', 'none');
    fechaInicio = $('#dateInicioLibro').val();
    fechaFin = $('#dateFinLibro').val();
    fechaI = $('#dateInicioLibro').datepicker('getDate');
    fechaF = $('#dateFinLibro').datepicker('getDate');
    date1 = new Date(fechaInicio);
    date2 = new Date(fechaFin);
    movil = $('#codigoMovilLibro').val();
    if (fechaInicio != '' && fechaFin != '' && movil != null) {
        if (date1 > date2) {
            $('#alertaFechaVacios').modal('show');
        } else {
            convertInicio = fechaInicio.substring(6, 10) + '-' + fechaInicio.substring(3, 5) + '-' + fechaInicio.substring(0, 2);
            convertFin = fechaFin.substring(6, 10) + '-' + fechaFin.substring(3, 5) + '-' + fechaFin.substring(0, 2);
            
            //$('#tbl-libro tbody').empty();
            var urlLibro = ambiente + '/LibroMayor/ConsultarLibro?numeroMovil=' + selectedMovilLibro + '&&buscarDesde=' + convertInicio + '&&buscarHasta=' + convertFin;
            $.getJSON(urlLibro, function (dataLibro) {
                $('#tbl-libro1').css('display', 'table');
                crearTablaLibro();
                document.getElementById('tbl-libro').style.display = 'none';
                $('#nolibro').css('display', 'none');
            });
        }
    } else {
        $('#alertaLibroVacios').modal('show');
    }
})

$("#exportarLibroExcel").on("click", function () {
    console.log('prueba');
    var url = ambiente + "/LibroMayor/ExportExcel?numeroMovil=" + selectedMovilLibro + '&&buscarDesde=' + convertInicio + '&&buscarHasta=' + convertFin;
    document.location.href = url;
});

$("#exportarLibroPdf").on("click", function () {
    console.log('prueba');
    var url = ambiente + "/LibroMayor/ExportPdf?numeroMovil=" + selectedMovilLibro + '&&buscarDesde=' + convertInicio + '&&buscarHasta=' + convertFin + '&&codigoContable=' + document.getElementById('codigoContable').innerText + '&&nombreMovil=' + document.getElementById('nombreMovil').innerText + '&&telefonoMovil=' + document.getElementById('telefonoMovil').innerText + '&&direccionMovil=' + document.getElementById('direccionMovil').innerText + '&&DesdeFecha=' + $('#dateInicioLibro').val() + '&&HastaFecha=' + $('#dateFinLibro').val();
    document.location.href = url;
});
