path = require("path")
// base = path.normalize(process.cwd() + path.sep + "fonts" + path.sep)
base = path.join(__dirname, "../", "fonts");
util = require("util")

var Font = function (size) {
    this.fontsize = size;
    this.file = path.join(base, "NotoSansSC-Medium.otf");
}

function EnFont(size) {
    Font.call(this, size);
    this.file = path.join(base, "OpenSans-VariableFont_wdth,wght.ttf");
}

function CnFont(size) {
    Font.call(this, size);
    this.fontsize = size;
}

util.inherits(EnFont, Font);
util.inherits(CnFont, Font);

var notoSansSC = function (size) {
    CnFont.call(this, size)
}
var bariol = function (size) {
    EnFont.call(this, size)
}
var din = function (size) {
    EnFont.call(this, size)
    this.file = path.join(base, "DIN.otf")
}
var kx = function (size) {
    CnFont.call(this, size)
    this.file = path.join(base, "kx.otf")
}
util.inherits(bariol, EnFont);
util.inherits(din, EnFont);

util.inherits(notoSansSC, CnFont);
util.inherits(kx, CnFont);

const chineseDetector = /[\u4e00-\u9fa5]/g;

var getfromtext = function (text, width) {
    if (text && text.length > 0) {
        if (chineseDetector.test(text)) // Chinese
        {
            return new notoSansSC(width)
        }
    }
    return new din(width);
}

var get = function (f, width) {
    if (f == null)
        return null
    switch (f.toUpperCase()) {
        case "NotoSansSC":
            return new notoSansSC(width)
        case "KX":
            console.log("kx")
            return new kx(width)
        case "BARIOL":
            return new bariol(width)
        case "DIN":
            return new din(width)
        default:
            return null
    }
}

exports.notoSansSC = notoSansSC
exports.din = din
exports.kx = kx
exports.bariol = bariol
exports.get = get
exports.getfromtext = getfromtext
