$(document).ready(function () {
    //COMBO GRUPO TURNO
    let comboGrupoT = $('#grupoConductorTurno');
    comboGrupoT.empty();
    comboGrupoT.append('<option selected="true" disabled>Seleccione</option>');
    comboGrupoT.prop('selectedIndex', 0);
    var url = ambiente + '/Moviles/Grupos';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            comboGrupoT.append($('<option></option>').attr('value', entry.Cod_Grupo).text(entry.Descripcion));
        })
    });
});