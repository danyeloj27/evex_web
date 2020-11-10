$(document).ready(function () {
    var tableArea = $('#tbl-Area').DataTable({
        'destroy': true,
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/Area/ListaArea?Cod_Emp=' + $('#EmpresaArea').val(),
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
                        '<a class="editArea" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoArea" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a><a class="estadoArea" title="Desactivar" data-toggle="tooltip"><i class="fas fa-check-circle" style="color: #039d06;"></i></a>' :
                        '<a class="editArea" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoArea" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a><a class="estadoArea" title="Activar" data-toggle="tooltip"><i class="fas fa-times-circle" style="color: #E34724;"></i></a>';
                },
                'width': '10%'
            },
            { 'data': 'Cod_Area', 'title': 'CODIGO' },
            { 'data': 'Nom_Area', 'title': 'NOMBRE' },
            { 'data': 'Area', 'title': 'ÁREA' },
            { 'data': 'Rut_Encargado', 'title': 'ENCARGADO' },
            { 'data': 'Estado', 'title': 'ESTADO' }
        ]
    });

    let comboArea = $('#EmpresaArea');
    comboArea.empty();
    comboArea.append('<option selected="true" disabled>Seleccione</option>');
    comboArea.prop('selectedIndex', 0);
    var url = ambiente + '/Area/EmpresaArea';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            comboArea.append($('<option></option>').attr('value', entry.Cod_Empresa).text(entry.Nom_Fantasia));
        })
    });
});