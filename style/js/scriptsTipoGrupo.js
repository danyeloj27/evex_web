$(document).ready(function () {
    var tableTipoGrupo = $('#tbl-TipoGrupo').DataTable({
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/TipoGrupo/ListaTipoGrupo',
        'autoWidth': false,
        'order': [[1, "asc"]],
        'height': '10%',
        'columns': [
            {
                'title': 'ACCIÓN',
                'targets': -1,
                'data': null,
                'className': 'dt-body-center',
                'defaultContent': '<a class="editTipoGrupo" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoTipoGrupo" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a>',
                'width': '10%'
            },
            { 'data': 'Cod_Grupo', 'title': 'CODIGO' },
            { 'data': 'Descripcion', 'title': 'TIPO' }
        ]
    });
});