var configuration = require('./configuration');
var fonts = require('./font');
var colors = require('./color');
var gm = require('gm').subClass({imageMagick: true});

module.exports.AvatarGenerator = function () {

    const getHashOfString = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            // tslint:disable-next-line: no-bitwise
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        hash = Math.abs(hash);
        return hash;
    };

    const normalizeHash = (hash, min, max) => {
        return Math.floor((hash % (max - min)) + min);
    };

    const generateHSL = (name, saturationRange, lightnessRange) => {
        const hash = getHashOfString(name);
        const h = normalizeHash(hash, 0, 360);
        const s = normalizeHash(hash, saturationRange[0], saturationRange[1]);
        const l = normalizeHash(hash, lightnessRange[0], lightnessRange[1]);
        return [h, s, l];
    };

    const HSLtoString = (hsl) => {
        return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
    };

    const generateColorHsl = (id, saturationRange, lightnessRange) => {
        return HSLtoString(generateHSL(id, saturationRange, lightnessRange));
    };

    // const bgColor = generateColorHsl("" + uuid.v1(), [40, 60], [40, 60]);

    var generateImage = function generateImage(config, next) {
        var text = config.text;
        var font = config.autoFont ? fonts.getfromtext(text, config.fontSize) : fonts.get(config.font, config.fontSize);
        var words = text.toUpperCase();
        var width = config.width;

        const trueColor = config.color === "random" ? colors.random() : config.color;
        var image = config.shape === 'square'
            ? gm(width + 1, width + 1, trueColor)
            : gm(width + 1, width + 1, '#000')
                .transparent('#000')
                .fill(trueColor)
                .drawCircle(width / 2, width / 2, 0, width / 2)

        image
            .fill(config.fontColor)
            .font(font.file)
            .fontSize(font.fontsize)
            .drawText(0, 0, words, 'Center');
        next(image);
    };


    return {
        generate: function (conf, next) {
            var config = configuration(conf);
            generateImage(config, next);
        }
    };
};
