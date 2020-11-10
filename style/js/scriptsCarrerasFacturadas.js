let movilSeleccionado;
let mesSeleccionado;
let mesSeleccion;
let tableCarreras;

let totalVales;
let totalCristal;
let totalGeneral;


function crearTablaCarreras() {
    tableCarreras = $('#tbl-carrerasFacturadas1').removeAttr('width').DataTable({
        'autoWidth': false,
        'destroy': true,
        'info': false,
        'scrollY': '262px',
        'sScrollX': '100%',
        'scrollCollapse': true,
        'paging': false,
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/CarrerasFacturadas/ListaCarreras?numeroMovil=' + movilSeleccionado + '&&mesCarreras=' + mesSeleccionado + '&&AnoCarreras=' + $('#AnoCarreras').val(),
        'columns': [
            { 'data': 'Num_Vale', 'title': 'NRO. VALE', 'width': 100 },
            {
                'data': 'Fec_Contacto', 'title': 'FECHA', 'render': function (data, type) {
                    return type === 'sort' ? data : moment(data).format('DD/MM/YYYY');
                }, 'width': 100
            },
            { 'data': 'Cod_TipCan', 'title': 'TIPO', 'width': 100 },
            { 'data': 'Cod_Emp', 'title': 'EMPRESA', 'width': 650 },
            { 'data': 'Val_Tarifa', 'title': 'TARIFA', 'width': 100, 'render': $.fn.dataTable.render.number('.', ',', 0), 'className': 'dt-body-right' }
        ]
    });
};

$(window).resize(function () {
    tableCarreras.columns.adjust();
});

$(document).ready(function () {
    //COMBO NUMERO MOVIL
    let moviles = $('#Cod_Movil');
    moviles.empty();
    moviles.append('<option selected="true" disabled>Seleccione</option>');
    moviles.prop('selectedIndex', 0);
    var url = ambiente + '/CarrerasFacturadas/ComboMovil?Correo=' + document.getElementById('#correoUsuario').innerText + '&&Perfil=' + document.getElementById('#perfil').innerText;
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            moviles.append($('<option></option>').attr('value', entry.Cod_Movil).text(entry.Cod_Movil));
            console.log(entry.Cod_Movil);
        })
    });
});

$('#Cod_Movil').on('change', function () {
    document.getElementById('Num_Movil').innerText = ':';
    document.getElementById('Nom_Completo').innerText = ':';
    document.getElementById('Rut').innerText = ':';
    document.getElementById('Direccion').innerText = ':';
    document.getElementById('Telefono').innerText = ':';
    document.getElementById('Patente').innerText = ':';
    CodMovil = $(this).find(':selected').val();
    var url = ambiente + '/CarrerasFacturadas/MostrarMovil?Cod_Movil=' + CodMovil;
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            document.getElementById('Num_Movil').innerText = ':  ' + entry.Cod_Movil;
            document.getElementById('Nom_Completo').innerText = ':  ' + entry.Nom_Completo;
            document.getElementById('Rut').innerText = ':  ' + entry.rut;
            document.getElementById('Direccion').innerText = ':  ' + entry.Direccion;
            if (entry.Telefono != null) {
                document.getElementById('Telefono').innerText = ':  ' + entry.Telefono;
            } else {
                document.getElementById('Telefono').innerText = ':'
            }
            document.getElementById('Patente').innerText = ':  ' + entry.Patente;
        })
    });
    console.log(CodMovil);
    movilSeleccionado = CodMovil;
})


$('#mesCarreras').on('change', function () {
    mesSeleccionado = $(this).find(':selected').val();
    mesSeleccion = $(this).find(':selected').text();
    console.log(mesSeleccion);
})


$('#buscarCarreras').click(function () {
    $('#nocarreras').css('display', 'block');
    $('#tbl-carrerasFacturadas1').css('display', 'none');
    var urlCarreras = ambiente + '/CarrerasFacturadas/ConsultarCarreras?numeroMovil=' + movilSeleccionado + '&&mesCarreras=' + mesSeleccionado + '&&AnoCarreras=' + $('#AnoCarreras').val();
    $.getJSON(urlCarreras, function (dataCarreras) {
        $('#tbl-carrerasFacturadas1').css('display', 'table');      
        crearTablaCarreras(); 
        document.getElementById('panelFacturadas').style.display = 'none';
        document.getElementById('tbl-carrerasFacturadas').style.display = 'none';
        $('#nocarreras').css('display', 'none');
    });
    
    var urltotales = ambiente + '/CarrerasFacturadas/TotalesCarreras?numeroMovil=' + movilSeleccionado + '&&mesCarreras=' + mesSeleccionado + '&&AnoCarreras=' + $('#AnoCarreras').val();
    $.getJSON(urltotales, function (dataTotales) {
        $.each(dataTotales, function (i, item) {
            totalV = parseInt(item.Total);
            totalV = totalV.toLocaleString('es-ES')
            if (item.Tipo == 'Vale') {
                document.getElementById('cantidadVales').innerText = item.Cantidad;
                document.getElementById('totalVales').innerText = totalV;
                totalVales = 'Total Vales: Servicios: ' + item.Cantidad + ' Sub Total: ' + totalV;
            }
            if (item.Tipo == 'Cristal') {
                document.getElementById('cantidadCristales').innerText = item.Cantidad;
                document.getElementById('totalCristales').innerText = totalV;
                totalCristales = 'Total Cristal: Servicios: ' + item.Cantidad + ' Sub Total: ' + totalV;
            }
            if (item.Tipo == 'General') {
                document.getElementById('cantidadGeneral').innerText = item.Cantidad;
                document.getElementById('totalGeneral').innerHTML = totalV;
                totalGeneral = 'Total General: Servicios: ' + item.Cantidad + ' Monto Total: ' + totalV;
            }
        })
    });

})

$("#exportarCarrerasExcel").on("click", function () {
    var url = ambiente + "/CarrerasFacturadas/CarrerasFacturadasExportExcel?numeroMovil=" + movilSeleccionado + '&&mesCarreras=' + mesSeleccionado + '&&AnoCarreras=' + $('#AnoCarreras').val() + '&&Rut=' + document.getElementById('Rut').innerText + '&&nombreMovil=' + document.getElementById('Nom_Completo').innerText + '&&telefonoMovil=' + document.getElementById('Telefono').innerText + '&&direccionMovil=' + document.getElementById('Direccion').innerText + '&&Patente=' + document.getElementById('Patente').innerText + '&&totalVales=' + totalVales + '&&totalCristal=' + totalCristales + '&&totalGeneral=' + totalGeneral + '&&mesSeleccion=' + mesSeleccion;
    document.location.href = url;
});

$("#exportarCarrerasPdf").on("click", function () {
    var url = ambiente + "/CarrerasFacturadas/ExportPdf?numeroMovil=" + movilSeleccionado + '&&mesCarreras=' + mesSeleccionado + '&&AnoCarreras=' + $('#AnoCarreras').val() + '&&Rut=' + document.getElementById('Rut').innerText + '&&nombreMovil=' + document.getElementById('Nom_Completo').innerText + '&&telefonoMovil=' + document.getElementById('Telefono').innerText + '&&direccionMovil=' + document.getElementById('Direccion').innerText + '&&Patente=' + document.getElementById('Patente').innerText + '&&totalVales=' + totalVales + '&&totalCristal=' + totalCristales + '&&totalGeneral=' + totalGeneral + '&&mesSeleccion=' + mesSeleccion;
    document.location.href = url;
});
