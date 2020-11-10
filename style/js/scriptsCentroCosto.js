$(document).ready(function () {
    var tableCentroCosto = $('#tbl-CentroCosto').DataTable({
        'destroy': true,
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/CentroCosto/ListaCentroCosto?Cod_Emp=' + $('#EmpresaCC').val(),
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
                        '<a class="editCentroCosto" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoCentroCosto" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a><a class="estadoCentroCosto" title="Desactivar" data-toggle="tooltip"><i class="fas fa-check-circle" style="color: #039d06;"></i></a>' :
                        '<a class="editCentroCosto" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoCentroCosto" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a><a class="estadoCentroCosto" title="Activar" data-toggle="tooltip"><i class="fas fa-times-circle" style="color: #E34724;"></i></a>';
                },
                'width': '10%'
            },
            { 'data': 'Cod_Cc', 'title': 'CODIGO' },
            { 'data': 'Nom_Cc', 'title': 'NOMBRE' },
            { 'data': 'Centro_Costo', 'title': 'CENTRO COSTO' },
            { 'data': 'Rut_Encargado', 'title': 'ENCARGADO' },
            { 'data': 'Estado', 'title': 'ESTADO' }
        ]
    });

    let comboCentroCosto = $('#EmpresaCC');
    comboCentroCosto.empty();
    comboCentroCosto.append('<option selected="true" disabled>Seleccione</option>');
    comboCentroCosto.prop('selectedIndex', 0);
    var url = ambiente + '/CentroCosto/EmpresaCC';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            comboCentroCosto.append($('<option></option>').attr('value', entry.Cod_Empresa).text(entry.Nom_Fantasia));
        })
    });
});