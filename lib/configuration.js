module.exports = function (conf) {

    conf = conf || {};

    if (!conf.width) {
        conf.width = 100;
    }

    if (!conf.font) {
        conf.autoFont = true;
    }

    if (!conf.fontSize) {
        conf.fontSize = 66;
    }

    if (!conf.color) {
        conf.color = "random";
    }

    if (!conf.fontColor) {
        conf.fontColor = "#FFFFFF";
    }

    if (!conf.text) {
        conf.text = "I.E.";
    }

    if (!conf.shape || ["square", "circle"].indexOf(conf.shape) === -1) {
        conf.shape = "circle";
    }


    return conf;
};
