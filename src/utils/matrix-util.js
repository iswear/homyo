/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/13
 */
export default (
  function () {

    var util = {
      createIdentityMat2d: function () {
        // [
        //   1, 0, 0,
        //   0, 1, 0,
        //   0, 0, 1
        // ];
        return [
          1, 0, 0,
          0, 1, 0
        ];
      },
      copyMat2d: function (srcMat, desMat) {
        for (var i = 0, len = srcMat.length; i < len; ++i) {
          desMat[i] = srcMat[i];
        }
        return desMat;
      },
      restMat2d: function (mat) {
        mat[0] = 1;
        mat[1] = 0;
        mat[2] = 0;
        mat[3] = 0;
        mat[4] = 1;
        mat[5] = 0;
        return mat;
      },
      mulMat2d: function (mat1, mat2) {
        return [
          mat1[0] * mat2[0] + mat1[1] * mat2[3], mat1[0] * mat2[1] + mat1[1] * mat2[4], mat1[0] * mat2[2] + mat1[1] * mat2[5] + mat1[2],
          mat1[3] * mat2[0] + mat1[4] * mat2[3], mat1[3] * mat2[1] + mat1[4] * mat2[4], mat1[3] * mat2[2] + mat1[4] * mat2[5] + mat1[5]
        ];
      },
      mulMat2dAndVect2d: function (mat, vector) {
        return [
          mat[0] * vector[0] + mat[1] * vector[1] + mat[2],
          mat[3] * vector[0] + mat[4] * vector[1] + mat[5]
        ];
      },
      isIdentityMat2d: function (mat) {
        return mat[2] === 0 && mat[5] === 0 &&
          mat[0] === 1 && mat[1] === 0 &&
          mat[3] === 0 && mat[4] === 0;
      },
      translate2d: function (mat, x, y) {
        // [
        //   1, 0, x,
        //   0, 1, y,
        //   0, 0, 1
        // ]
        return [
          mat[0], mat[1], mat[0] * x + mat[1] * y + mat[2],
          mat[3], mat[4], mat[3] * x + mat[4] * y + mat[5]
        ];
      },
      rotate2d: function (mat, angle) {
        // [
        //   cos(angle), -sin(angle), 0,
        //   sin(angle),  cos(angle), 0,
        //   0, 0, 1
        // ]
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        return [
          mat[0] * c + mat[1] * s, mat[1] * c - mat[0] * s, mat[2],
          mat[3] * c + mat[4] * s, mat[4] * c - mat[3] * s, mat[5]
        ];
      },
      scale2d: function (mat, x, y) {
        // [
        //   x, 0, 0,
        //   0, y, 0,
        //   0, 0, 1
        // ]
        return [
          mat[0] * x, mat[1] * y, mat[2],
          mat[3] * x, mat[4] * y, mat[5]
        ];
      },
      incline2d: function (mat, x, y) {
        // [
        //   1, y, 0,
        //   x, 1, 0,
        //   0, 0, 1
        // ]
        return [
          mat[0] + mat[1] * y, mat[0] * x + mat[1], mat[2],
          mat[3] + mat[4] * y, mat[3] * x + mat[4], mat[5]
        ];
      },
      reverse2d: function (mat) {
        /**
         * 伴随矩阵求解逆矩阵
         */
        var temp = mat[0] * mat[4] - mat[1] * mat[3];
        return [
          mat[4] / temp, -mat[1] / temp, (mat[1] * mat[5] - mat[2] * mat[4]) / temp,
          -mat[3] / temp, mat[0] / temp, (mat[3] * mat[2] - mat[0] * mat[5]) / temp
        ];
      },
      createIdentityMat3d: function () {
        return [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1
        ];
      },
      copyMat3d: function (srcMat, desMat) {
        for (var i = 0, len = srcMat.length; i < len; ++i) {
          desMat[i] = srcMat[i];
        }
        return desMat;
      },
      restMat3d: function (mat) {
        mat[0] = 1;
        mat[1] = 0;
        mat[2] = 0;
        mat[3] = 0;
        mat[4] = 0;
        mat[5] = 1;
        mat[6] = 0;
        mat[7] = 0;
        mat[8] = 0;
        mat[9] = 0;
        mat[10] = 1;
        mat[11] = 0;
        mat[12] = 0;
        mat[13] = 0;
        mat[14] = 0;
        mat[15] = 1;
        return mat;
      }
    };

    return util;
  }
)();