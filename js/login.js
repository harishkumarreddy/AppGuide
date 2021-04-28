const user = {
    "username": undefined,
    "password": undefined
}

function showError(status) {
    var msg = ""
    if (status == 0) {
        msg = "Invalid credentials.";
    } else if (status >= 500) {
        msg = "Unable to connect to server. If this is happening cintinuasly, please contact support team.";
    } else {
        msg = "No user existed with these details. Please contact Admin.";
    }

    $("#error_box").html(msg).show();
}

$("#btn_login").on("click", function(e) {
    user.username = $("#userid").val();
    user.password = $("#password").val();
    var stop = false;
    if (user.username == "") {
        $("#userid").parent("div").addClass("has-error");
        stop = true;
    } else {
        $("#userid").parent("div").removeClass("has-error");
    }
    if (user.password == "") {
        $("#password").parent("div").addClass("has-error");
        stop = true;
    } else {
        $("#password").parent("div").removeClass("has-error");
    }
    if (stop) {
        return true
    }

    $.ajax({
        "type": "GET",
        "url": "/users/" + user.username + ".user",
        "success": function(res) {
            var data = res.split("|");
            if (data[0] == user.password) {
                $("#error_box").hide();
                localStorage.setItem("ag_user", data[1]);
                var d = new Date();
                localStorage.setItem("ag_timestamp", d.getTime());
                if (document.getElementById("rememberme").checked === true) {
                    localStorage.setItem("ag_user_remember", true);
                }

                window.location.href = window.location.origin;
            } else {
                showError(0);
            }
        },
        "error": function(err, errType, errObj) {
            showError(err.status);
            console.log(errType + ": ", errObj);
        },
    });
});

$("form *").on("keypress", function(e) {
    if (e.keyCode == 13) {
        $("#btn_login").trigger("click");
    }
});