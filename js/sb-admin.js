var selfcheck = true;
const routs = {
    "login": "/login.html"
};

if (localStorage.getItem('ag_user') == null) {
    window.location.href = window.location.origin + "/login.html";
}

$(function() {
    //Loads the correct sidebar on window load,
    //collapses the sidebar on window resize.
    $(function() {
        $(window).bind("load resize", function() {
            width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
            if (width < 768) {
                $('div.sidebar-collapse').addClass('collapse')
            } else {
                $('div.sidebar-collapse').removeClass('collapse')
            }
        })
    })


    function doAjaxGet(url, successCallback, errCallback) {
        $.ajax({
            "type": "GET",
            "url": url,
            //"datatype": "JSON",
            "success": successCallback,
            "error": errCallback
        });
    }

    function showLoader(target) {
        $(target).html(`<div class="text-center" style="padding-top: 50px;">
                <i class="fa fa-refresh fa-3x fa-spin"></i><br>
                <strong>Loging...</strong>
            </div>`);
        return true;
    }

    function updateMenu(data, is_recursive) {
        var menuItem = "";
        $.each(data, function(i, item) {
            if (typeof item.submenu != "undefined") {
                var sub_menuItem = updateMenu(item.submenu, true)
            }

            if (typeof sub_menuItem != "undefined") {
                menuItem += `<li class="">
                        <a href="` + item.url + `" title="` + item.tooltip + `" ><i class="fa ` + item.icon + `"></i> ` + item.label + `<span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level">` + sub_menuItem + `</ul>
                    </li>`;
            } else {
                if (i == 0 && typeof routs["default"] == "undefined") {
                    routs["default"] = item.target;
                }

                if (typeof item.is_default != "undefined") {
                    if (item.is_default !== false) {
                        routs["default"] = item.target;
                    }
                }
                routs[item.url] = item.target;
                menuItem += `<li class="">
                        <a href="/#/` + item.url + `" class="" title="` + item.tooltip + `" ><i class="fa ` + item.icon + ` fa-fw"></i> ` + item.label + `</a>
                    </li>`;
            }
        });
        if (is_recursive == true) {
            return menuItem
        } else {
            $("#side-menu").html(menuItem);
        }

    }

    function updateSearch(menuData) {
        $.each(menuData, function(i, item) {
            if (typeof item.submenu != "undefined") {
                updateSearch(item.submenu);
            }

            if (item.url != "#") {
                $("#search_keys").append('<option value="' + item.label + '" label="/' + item.url + '"> ');
            }
        });
        return true;
    }

    function doSearch(term) {
        var url = "";
        $.each($("#search_keys option"), function(i, option) {
            if (($(option).attr("value")).indexOf(term) > -1) {
                url = ($(option).attr("label")).replace("/", "");

                return false;
            }
        });

        if (url != "") {
            //routHandil(url)
            window.location.hash = "#/" + url;
        } else {
            doAjaxGet(
                "/pages/nosearchfound.html",
                function(res) {
                    $("#page-wrapper").html(res);
                },
                function(err, errType, errObj) {
                    console.log(errType + ": ", errObj);
                }
            );
        }
    }


    function routHandil(rout) {
        var xr = rout;
        var d = new Date();
        //3600000
        if ((d.getTime() - localStorage.getItem('ag_timestamp')) >= 600000 && localStorage.getItem("ag_user_remember") == null) {
            rout = "logout";
        } else {
            localStorage.setItem("ag_timestamp", d.getTime());
        }

        if (rout == "") {
            rout = routs.default;
        } else if (rout == "logout") {
            localStorage.removeItem("ag_user");
            localStorage.removeItem("ag_user_remember");
            localStorage.removeItem("ag_timestamp");
            window.location.href = window.location.origin + "/login.html";
        } else if (typeof routs[rout] == "undefined") {
            rout = "/pages/404.html";
        } else {
            rout = routs[rout];
        }

        $("#side-menu a.active").removeClass("active");
        $("#side-menu li.active").removeClass("active");
        $("#side-menu ul.in").removeClass("in");

        showLoader("#page-wrapper");

        doAjaxGet(
            rout,
            function(res) {
                $("#page-wrapper").html(res);
            },
            function(err, errType, errObj) {
                if (err.status == 404) {
                    doAjaxGet(
                        "/pages/404.html",
                        function(res) {
                            $("#page-wrapper").html(res);
                        },
                        function(err, errType, errObj) {
                            console.log(errType + ": ", errObj);
                        }
                    );
                }
                console.log(errType + ": ", errObj);
            }
        );

        $("#side-menu a[href='/#/" + xr + "']").addClass("active");
        $($($("#side-menu a[href='/#/" + xr + "']").parent("li")).parents()[0]).addClass("in");
        $($($("#side-menu a[href='/#/" + xr + "']").parent("li")).parents()[1]).addClass("active");
    }


    $(document).ready(function() {
        $.getJSON("/js/sidemenu.json", function(result) {
            updateMenu(result);
            updateSearch(result);
        });

        setTimeout(function() {
            $('#side-menu').metisMenu();

            $('#span_auth_user_name').html(localStorage.getItem('ag_user'));

            var subRout = window.location.hash.replace("#/", "");
            routHandil(subRout);
        }, 1000);


        $("#search_text").on("change", function() {
            setTimeout(function() {
                doSearch($("#search_text").val());
            }, 500)
        });

        $("#searchBtn").on("click", function() {
            doSearch($("#search_text").val());
        });
    });

    localStorage.getItem('ag_user')

    window.onhashchange = function() {
        var subRout = window.location.hash.replace("#/", "");
        routHandil(subRout);
    };
});