$('#togglepasswordUsuario').mousedown(function () {
    $('#passwordUsuario').removeAttr('type');
    $('#togglepasswordUsuario').addClass('fa-eye-slash').removeAttr('fa-eye');
});

$('#togglepasswordUsuario').mouseup(function () {
    $('#passwordUsuario').attr('type', 'password');
    $('#togglepasswordUsuario').addClass('fa-eye').removeClass('fa-eye-slash');
});

$('#togglepassword').mousedown(function () {
    $('#password').removeAttr('type');
    $('#togglepassword').addClass('fa-eye-slash').removeAttr('fa-eye');
});

$('#togglepassword').mouseup(function () {
    $('#password').attr('type', 'password');
    $('#togglepassword').addClass('fa-eye').removeClass('fa-eye-slash');
});

$('#togglerpassword').mousedown(function () {
    $('#rpassword').removeAttr('type');
    $('#togglerpassword').addClass('fa-eye-slash').removeAttr('fa-eye');
});

$('#togglerpassword').mouseup(function () {
    $('#rpassword').attr('type', 'password');
    $('#togglerpassword').addClass('fa-eye').removeClass('fa-eye-slash');
});