var basePath = "http://127.0.0.1:5500"; // mandate to keep valied root URL
if (typeof selfcheck == "undefined") {
    localStorage.setItem("ag_callback_url", document.URL.replace(basePath, ""));
    window.location = basePath;
}