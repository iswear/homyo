/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */
export default (
  function () {
    var registerEvents = [];

    var util = {
      KEY_CODE: {
        TAB: 9,
        CLEAR: 12,
        ENTER: 13,
        SHIFT_LEFT: 16,
        CTRL_LEFT: 17,
        ALT_LEFT: 18,
        PAUSE: 19,
        CAPS_LOCK: 20,
        ESCAPE: 27,
        SPACE: 32,
        PRIOR: 33,
        NEXT: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SELECT: 41,
        PRINT: 42,
        EXECUTE: 43,
        INSERT: 44,
        DELETE: 45,
        HELP: 47,
        NUMBER0: 48,
        NUMBER1: 49,
        NUMBER2: 50,
        NUMBER3: 51,
        NUMBER4: 52,
        NUMBER5: 53,
        NUMBER6: 54,
        NUMBER7: 55,
        NUMBER8: 56,
        NUMBER9: 57,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        KP_NUMBER0: 96,
        KP_NUMBER1: 97,
        KP_NUMBER2: 98,
        KP_NUMBER3: 99,
        KP_NUMBER4: 100,
        KP_NUMBER5: 101,
        KP_NUMBER6: 102,
        KP_NUMBER7: 103,
        KP_NUMBER8: 104,
        KP_NUMBER9: 105,
        KP_MULTIPLY: 106,
        KP_ADD: 107,
        KP_SEPARATOR: 108,
        KP_SUBSTRACT: 109,
        KP_DECIMAL: 110,
        KP_DEVIDE: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        F13: 124,
        F14: 125,
        F15: 126,
        F16: 127,
        F17: 128,
        F18: 129,
        F19: 130,
        F20: 131,
        F21: 132,
        F22: 133,
        F23: 134,
        F24: 135,
        NUM_LOCK: 136,
        SCROLL_LOCK: 137
      },
      EVENT_NAME: {
        node: {
          'render': '渲染',
        }
      },
      addEventListener: function (node, type, target, listener) {
        var fn = listener.bind(target);
        registerEvents.push({
          node: node,
          type: type,
          target: target,
          listener: listener,
          fn: fn
        });
        node.addEventListener(type, fn, false);
      },
      removeEventListener: function (node, type, target, listener) {
        for (var i = 0, len = registerEvents.length; i < len; ++i) {
          var event = registerEvents[i];
          if (event.node === node &&
            event.type === type &&
            event.target === target &&
            event.listener === listener) {
            node.removeEventListener(type,event.fn,false);
            registerEvents.splice(i, 1);
            i--;
            len--;
          }
        }
      }
    };

    return util;
  }
)();
