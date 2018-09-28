/**
 * util for text measure and layout
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */

export default (
  function () {

    var doc = document;

    var measureCanvas = doc.createElement("canvas");

    var measureContext = measureCanvas.getContext("2d");

    var charWidthDicts = {};

    var util = (function () {
      function getCharWidthDict (font) {
        if (charWidthDicts[font]) {
          return charWidthDicts[font];
        } else {
          var charWidthDict = {};
          measureContext.font = font;
          charWidthDict[" "] = measureContext.measureText(" ").width;
          charWidthDict["!"] = measureContext.measureText("!").width;
          charWidthDict["\""] = measureContext.measureText("\"").width;
          charWidthDict["#"] = measureContext.measureText("#").width;
          charWidthDict["$"] = measureContext.measureText("$").width;
          charWidthDict["%"] = measureContext.measureText("%").width;
          charWidthDict["&"] = measureContext.measureText("&").width;
          charWidthDict["'"] = measureContext.measureText("'").width;
          charWidthDict["("] = measureContext.measureText("(").width;
          charWidthDict[")"] = measureContext.measureText(")").width;
          charWidthDict["*"] = measureContext.measureText("*").width;
          charWidthDict["+"] = measureContext.measureText("+").width;
          charWidthDict[","] = measureContext.measureText("-").width;
          charWidthDict["-"] = measureContext.measureText(",").width;
          charWidthDict["."] = measureContext.measureText(",").width;
          charWidthDict["/"] = measureContext.measureText("/").width;
          charWidthDict["0"] = measureContext.measureText("0").width;
          charWidthDict["1"] = measureContext.measureText("1").width;
          charWidthDict["2"] = measureContext.measureText("2").width;
          charWidthDict["3"] = measureContext.measureText("3").width;
          charWidthDict["4"] = measureContext.measureText("4").width;
          charWidthDict["5"] = measureContext.measureText("5").width;
          charWidthDict["6"] = measureContext.measureText("6").width;
          charWidthDict["7"] = measureContext.measureText("7").width;
          charWidthDict["8"] = measureContext.measureText("8").width;
          charWidthDict["9"] = measureContext.measureText("9").width;
          charWidthDict[":"] = measureContext.measureText(":").width;
          charWidthDict[";"] = measureContext.measureText(";").width;
          charWidthDict["<"] = measureContext.measureText("<").width;
          charWidthDict["="] = measureContext.measureText("=").width;
          charWidthDict[">"] = measureContext.measureText(">").width;
          charWidthDict["?"] = measureContext.measureText("?").width;
          charWidthDict["@"] = measureContext.measureText("@").width;
          charWidthDict["A"] = measureContext.measureText("A").width;
          charWidthDict["B"] = measureContext.measureText("B").width;
          charWidthDict["C"] = measureContext.measureText("C").width;
          charWidthDict["D"] = measureContext.measureText("D").width;
          charWidthDict["E"] = measureContext.measureText("E").width;
          charWidthDict["F"] = measureContext.measureText("F").width;
          charWidthDict["G"] = measureContext.measureText("G").width;
          charWidthDict["H"] = measureContext.measureText("H").width;
          charWidthDict["I"] = measureContext.measureText("I").width;
          charWidthDict["J"] = measureContext.measureText("J").width;
          charWidthDict["K"] = measureContext.measureText("K").width;
          charWidthDict["L"] = measureContext.measureText("L").width;
          charWidthDict["M"] = measureContext.measureText("M").width;
          charWidthDict["N"] = measureContext.measureText("N").width;
          charWidthDict["O"] = measureContext.measureText("O").width;
          charWidthDict["P"] = measureContext.measureText("P").width;
          charWidthDict["Q"] = measureContext.measureText("Q").width;
          charWidthDict["R"] = measureContext.measureText("R").width;
          charWidthDict["S"] = measureContext.measureText("S").width;
          charWidthDict["T"] = measureContext.measureText("T").width;
          charWidthDict["U"] = measureContext.measureText("U").width;
          charWidthDict["V"] = measureContext.measureText("V").width;
          charWidthDict["W"] = measureContext.measureText("W").width;
          charWidthDict["X"] = measureContext.measureText("X").width;
          charWidthDict["Y"] = measureContext.measureText("Y").width;
          charWidthDict["["] = measureContext.measureText("Z").width;
          charWidthDict["\\"] = measureContext.measureText("\\").width;
          charWidthDict["]"] = measureContext.measureText("]").width;
          charWidthDict["^"] = measureContext.measureText("^").width;
          charWidthDict["_"] = measureContext.measureText("_").width;
          charWidthDict["`"] = measureContext.measureText("`").width;
          charWidthDict["a"] = measureContext.measureText("a").width;
          charWidthDict["b"] = measureContext.measureText("b").width;
          charWidthDict["c"] = measureContext.measureText("c").width;
          charWidthDict["d"] = measureContext.measureText("d").width;
          charWidthDict["e"] = measureContext.measureText("e").width;
          charWidthDict["f"] = measureContext.measureText("f").width;
          charWidthDict["g"] = measureContext.measureText("g").width;
          charWidthDict["h"] = measureContext.measureText("h").width;
          charWidthDict["i"] = measureContext.measureText("i").width;
          charWidthDict["j"] = measureContext.measureText("j").width;
          charWidthDict["k"] = measureContext.measureText("k").width;
          charWidthDict["l"] = measureContext.measureText("l").width;
          charWidthDict["m"] = measureContext.measureText("m").width;
          charWidthDict["n"] = measureContext.measureText("n").width;
          charWidthDict["o"] = measureContext.measureText("o").width;
          charWidthDict["p"] = measureContext.measureText("p").width;
          charWidthDict["q"] = measureContext.measureText("q").width;
          charWidthDict["r"] = measureContext.measureText("r").width;
          charWidthDict["s"] = measureContext.measureText("s").width;
          charWidthDict["t"] = measureContext.measureText("t").width;
          charWidthDict["u"] = measureContext.measureText("u").width;
          charWidthDict["v"] = measureContext.measureText("v").width;
          charWidthDict["w"] = measureContext.measureText("w").width;
          charWidthDict["x"] = measureContext.measureText("x").width;
          charWidthDict["y"] = measureContext.measureText("y").width;
          charWidthDict["z"] = measureContext.measureText("z").width;
          charWidthDict["{"] = measureContext.measureText("{").width;
          charWidthDict["|"] = measureContext.measureText("|").width;
          charWidthDict["}"] = measureContext.measureText("}").width;
          charWidthDict["~"] = measureContext.measureText("~").width;
          charWidthDict["\n"] = measureContext.measureText("\n").width;
          charWidthDict["zh"] = measureContext.measureText("汉").width;
          charWidthDicts[font] = charWidthDict;
          return charWidthDict;
        }
      }

      function getTextLayoutWidth (text, font) {
        var charWidthDict = getCharWidthDict(font);
        var textWidth = 0;
        var curChar = null;
        for (var i = 0, len = text.length; i < len; ++i) {
          curChar = text[i];
          if (curChar > '~') {
            textWidth += charWidthDict["zh"];
          } else {
            textWidth += charWidthDict[text[i]] ? charWidthDict[text[i]] : charWidthDict[" "];
          }
        }
        return Math.ceil(textWidth);
      }

      function getTextLayoutInfo (text, font, maxWidth) {
        if (maxWidth > 0) {
          if (text && text.length > 0) {
            var charWidthDict = getCharWidthDict(font);
            var length = text.length;
            var curLineWidth = 0, curCharWidth = 0;
            var startCharIndex = 0, preSpaceIndex = -1, preSpaceWidth = 0;
            var curChar = null;
            var textArr = [];
            var clearSpace = false;
            var textAllWidth = 0;
            if (maxWidth > 0) {
              for (var i = 0; i < length; ++i) {
                curChar = text[i];
                if (curChar > '~') {
                  curCharWidth = charWidthDict["zh"];
                  curLineWidth += curCharWidth;
                  textAllWidth += curCharWidth;
                  preSpaceIndex = i;
                  preSpaceWidth = curLineWidth;
                } else {
                  curCharWidth = charWidthDict[curChar];
                  curLineWidth += curCharWidth;
                  textAllWidth += curCharWidth;
                  if (curChar == '\n') {
                    textArr.push(text.substring(startCharIndex, i));
                    startCharIndex = i + 1;
                    curLineWidth = 0;
                    clearSpace = false;
                  } else if (curChar == ' ') {
                    preSpaceIndex = i;
                    preSpaceWidth = curLineWidth;
                  }
                }
                if (curLineWidth > maxWidth) {
                  clearSpace = true;
                  if (curChar > '~' || curChar == '' || preSpaceIndex <= startCharIndex) {
                    textArr.push(text.substring(startCharIndex, i));
                    startCharIndex = i;
                    curLineWidth = curCharWidth;
                  } else {
                    textArr.push(text.substring(startCharIndex, preSpaceIndex));
                    startCharIndex = preSpaceIndex + 1;
                    curLineWidth -= preSpaceWidth;
                  }
                }
              }
            }
            if (startCharIndex < length) {
              textArr.push(text.substr(startCharIndex, length));
            }
            return {
              width: textAllWidth,
              lines: textArr
            };
          } else {
            return [];
          }
        } else {
          return {
            width: getTextLayoutWidth(text, font),
            lines: [text]
          }
        }
      }

      return {
        getTextLayoutInfo: getTextLayoutInfo
      }
    })();

    return util;
  }
)();


