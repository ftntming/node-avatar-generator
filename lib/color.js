// inner color set
curry = require("./utils").curry
d = require("./utils").double
hex = require("./utils").randomHex
pickone = require("./utils").pickone

// https://www.npmjs.com/package/react-avatar
// https://webaim.org/resources/contrastchecker/

var Traditional_Colors =
    [
        "#F08F90", "#8c4e33", "#D57835", "#CE9F6F",
        "#14771e", "#649f54", "#8d9364", "#0588b9",
        "#1099e7", "#9664ad", "#a83fa8",
        "#D73D32", "#7E3794", "#4285F4", "#4B8A1A",
        "#D61A7F", "#FF4080",
    ]
var color_iter = function (opa, str) {
    return str + opa
}

color = curry(color_iter, "#ff")

var random = function () {
    return pickone(Traditional_Colors)
}

var set = function (rgb) {
    if (rgb.length == 3) {
        rgb = d(rgb)
    }
    if (rgb.length == 7 && rgb[0] == "#") //with #
    {
        return color(rgb)

    } else if (rgb.length == 6) {
        return color("#" + rgb)
    } else {
        return color(random())
    }
}


module.exports = {
    YELLOW: color("#f1fa8c"),
    RED: color("#ff5555"),
    PURPLE: color("#bd93f9"),
    PINK: color("#ff79c6"),
    ORANGE: color("#ffb86c"),
    GREEN: color("#50fa7b"),
    CYAN: color("#8be9fd"),
    WHITE: "#ffffff",
    set: set,
    random: random
}
