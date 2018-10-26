/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/13
 */
export default (
  function () {

    var util = {
      m2d: {
        newIdentityMat2D: function () {
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
        resetMat2D: function (mat) {
          mat[0] = 1;
          mat[1] = 0;
          mat[2] = 0;
          mat[3] = 0;
          mat[4] = 1;
          mat[5] = 0;
          return mat;
        },
        copyMat2D: function (srcMat, desMat) {
          for (var i = 0, len = srcMat.length; i < len; ++i) {
            desMat[i] = srcMat[i];
          }
          return desMat;
        },
        mulMat2D: function (mat1, mat2) {
          return [
            mat1[0] * mat2[0] + mat1[1] * mat2[3], 
            mat1[0] * mat2[1] + mat1[1] * mat2[4], 
            mat1[0] * mat2[2] + mat1[1] * mat2[5] + mat1[2],
            mat1[3] * mat2[0] + mat1[4] * mat2[3], 
            mat1[3] * mat2[1] + mat1[4] * mat2[4], 
            mat1[3] * mat2[2] + mat1[4] * mat2[5] + mat1[5]
          ];
        },
        mulMat2DAndVect2D: function (mat, vect) {
          return [
            mat[0] * vect[0] + mat[1] * vect[1] + mat[2],
            mat[3] * vect[0] + mat[4] * vect[1] + mat[5]
          ];
        },
        translate2D: function (mat, x, y) {
          // [
          //   1, 0, x,
          //   0, 1, y,
          //   0, 0, 1
          // ]
          return [
            mat[0], 
            mat[1], 
            mat[0] * x + mat[1] * y + mat[2],
            mat[3], 
            mat[4], 
            mat[3] * x + mat[4] * y + mat[5]
          ];
        },
        rotate2D: function (mat, angle) {
          // [
          //   cos(angle), -sin(angle), 0,
          //   sin(angle),  cos(angle), 0,
          //   0, 0, 1
          // ]
          var s = Math.sin(angle);
          var c = Math.cos(angle);
          return [
            mat[0] * c + mat[1] * s,
            mat[1] * c - mat[0] * s,
            mat[2],
            mat[3] * c + mat[4] * s,
            mat[4] * c - mat[3] * s, 
            mat[5]
          ];
        },
        scale2D: function (mat, x, y) {
          // [
          //   x, 0, 0,
          //   0, y, 0,
          //   0, 0, 1
          // ]
          return [
            mat[0] * x,
            mat[1] * y, 
            mat[2],
            mat[3] * x, 
            mat[4] * y, 
            mat[5]
          ];
        },
        shear2D: function (mat, x, y) {
          // [
          //   1, y, 0,
          //   x, 1, 0,
          //   0, 0, 1
          // ]
          return [
            mat[0] + mat[1] * y, 
            mat[0] * x + mat[1], 
            mat[2],
            mat[3] + mat[4] * y, 
            mat[3] * x + mat[4], 
            mat[5]
          ];
        },
        reverse2D: function (mat) {
          /**
           * 伴随矩阵求解逆矩阵
           */
          var temp = mat[0] * mat[4] - mat[1] * mat[3];
          return [
            mat[4] / temp, 
            -mat[1] / temp, 
            (mat[1] * mat[5] - mat[2] * mat[4]) / temp,
            -mat[3] / temp, 
            mat[0] / temp, 
            (mat[3] * mat[2] - mat[0] * mat[5]) / temp
          ];
        }
      },
      m3d: {
        newIdentityMat3D: function () {
          return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
          ]
        },
        resetMat3D: function (mat) {
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
        },
        copyMat3D: function (srcMat, desMat) {
          for (var i = 0, len = srcMat.length; i < len; ++i) {
            desMat[i] = srcMat[i];
          }
          return desMat;
        },
        mulMat3D: function (mat1, mat2) {
          return [
            mat1[0] * mat2[0] + mat1[1] * mat2[4] + mat1[2] * mat2[8] + mat1[3] * mat2[12],
            mat1[0] * mat2[1] + mat1[1] * mat2[5] + mat1[2] * mat2[9] + mat1[3] * mat2[13],
            mat1[0] * mat2[2] + mat1[1] * mat2[6] + mat1[2] * mat2[10] + mat1[3] * mat2[14],
            mat1[0] * mat2[3] + mat1[1] * mat2[7] + mat1[2] * mat2[11] + mat1[3] * mat2[15],
            mat1[4] * mat2[0] + mat1[5] * mat2[4] + mat1[6] * mat2[8] + mat1[7] * mat2[12],
            mat1[4] * mat2[1] + mat1[5] * mat2[5] + mat1[6] * mat2[9] + mat1[7] * mat2[13],
            mat1[4] * mat2[2] + mat1[5] * mat2[6] + mat1[6] * mat2[10] + mat1[7] * mat2[14],
            mat1[4] * mat2[3] + mat1[5] * mat2[7] + mat1[6] * mat2[11] + mat1[7] * mat2[15],
            mat1[8] * mat2[0] + mat1[9] * mat2[4] + mat1[10] * mat2[8] + mat1[11] * mat2[12],
            mat1[8] * mat2[1] + mat1[9] * mat2[5] + mat1[10] * mat2[9] + mat1[11] * mat2[13],
            mat1[8] * mat2[2] + mat1[9] * mat2[6] + mat1[10] * mat2[10] + mat1[11] * mat2[14],
            mat1[8] * mat2[3] + mat1[9] * mat2[7] + mat1[10] * mat2[11] + mat1[11] * mat2[15],
            mat1[12] * mat2[0] + mat1[13] * mat2[4] + mat1[14] * mat2[8] + mat1[15] * mat2[12],
            mat1[12] * mat2[1] + mat1[13] * mat2[5] + mat1[14] * mat2[9] + mat1[15] * mat2[13],
            mat1[12] * mat2[2] + mat1[13] * mat2[6] + mat1[14] * mat2[10] + mat1[15] * mat2[14],
            mat1[12] * mat2[3] + mat1[13] * mat2[7] + mat1[14] * mat2[11] + mat1[15] * mat2[15]          
          ];
        },
        mulMat3DAndVect3D: function (mat, vect) {
          return [
            mat1[0] * mat2[0] + mat1[1] * mat2[1] + mat1[2] * mat2[2] + mat1[3] * mat2[3],
            mat1[4] * mat2[0] + mat1[5] * mat2[1] + mat1[6] * mat2[2] + mat1[7] * mat2[3],
            mat1[8] * mat2[0] + mat1[9] * mat2[1] + mat1[10] * mat2[2] + mat1[11] * mat2[3],
            mat1[12] * mat2[0] + mat1[13] * mat2[1] + mat1[14] * mat2[2] + mat1[15] * mat2[3],
          ]
        },
        translate3D: function (mat, x, y, z) {
          // [
          //   1, 0, 0, x,
          //   0, 1, 0, y,
          //   0, 0, 1, z,
          //   0, 0, 0, 1
          // ]
          return [
            mat[0],
            mat[1],
            mat[2],
            mat[0] * x + mat[1] * y + mat[2] * z + mat[3],
            mat[4],
            mat[5],
            mat[6],
            mat[4] * x + mat[5] * y + mat[6] * z + mat[7],
            mat[8],
            mat[9],
            mat[10],
            mat[8] * x + mat[9] * y + mat[10] * z + mat[11],
            mat[12],
            mat[13],
            mat[14],
            mat[12] * x + mat[13] * y + mat[14] * z + mat[15],
          ];
        },
        rotate3D: function (mat, x, y, z) {
          // x轴旋转
          // [
          //   1,      0,       0,  0,
          //   0, cos(x), -sin(x),  0,
          //   0, sin(x),  cos(x),  0,
          //   0,      0,       0,  1
          // ]
          // y轴旋转
          // [
          //   cos(y), 0, -sin(y), 0,
          //        0, 1,       0, 0,
          //   sin(y), 0,  cos(y), 0,
          //        0, 0,       0, 1
          // ]
          // z轴旋转
          // [
          //   cos(z), -sin(z), 0, 0, 
          //   sin(z),  cos(z), 0, 0,
          //        0,       0, 1, 0,
          //        0,       0, 0, 1
          // ]
          var mat1 = util.m3d.copyMat3D(mat);
          if (x !== 0) {
            var sinx = Math.sin(x)
            var cosx = Math.cos(x)
            mat1[1] = mat1[1] * cosx + mat1[2] * sinx;
            mat1[2] = mat1[1] * -sinx + mat1[2] * cosx;
            mat1[5] = mat1[5] * cosx + mat1[6] * sinx;
            mat1[6] = mat1[5] * -sinx + mat1[6] * cosx;
            mat1[9] = mat1[9] * cosx + mat1[10] * sinx;
            mat1[10] = mat1[9] * -sinx + mat1[10] * cosx;
            mat1[13] = mat1[13] * cosx + mat1[14] * sinx;
            mat1[14] = mat1[13] * -sinx + mat1[14] * cosx;
          }
          if (y !== 0) {
            var siny = Math.sin(y)
            var cosy = Math.cos(y)
            mat1[0] = mat1[0] * cosy + mat1[2] * siny;
            mat1[2] = mat1[0] * -siny + mat1[2] * cosy;
            mat1[4] = mat1[4] * cosy + mat1[6] * siny;
            mat1[6] = mat1[4] * -siny + mat1[6] * cosy;
            mat1[8] = mat1[8] * cosy + mat1[10] * siny;
            mat1[10] = mat1[8] * -siny + mat1[10] * cosy;
            mat1[12] = mat1[12] * cosy + mat1[14] * siny;
            mat1[14] = mat1[12] * -siny + mat1[14] * cosy;
          }
          if (z !== 0) {
            var sinz = Math.sin(z)
            var cosz = Math.cos(z)
            mat1[0] = mat1[0] * cosz + mat1[1] * sinz;
            mat1[1] = mat1[0] * -sinz + mat1[1] * cosz;
            mat1[4] = mat1[4] * cosz + mat1[5] * sinz;
            mat1[5] = mat1[4] * -sinz + mat1[5] * cosz;
            mat1[8] = mat1[8] * cosz + mat1[9] * sinz;
            mat1[9] = mat1[8] * -sinz + mat1[9] * cosz;
            mat1[12] = mat1[12] * cosz + mat1[13] * sinz;
            mat1[13] = mat1[12] * -sinz + mat1[13] * cosz;
          }
          return null;
        },
        scale3D: function (mat, x, y, z) {
          // [
          //   x, 0, 0, 0,
          //   0, y, 0, 0,
          //   0, 0, z, 0,
          //   0, 0, 0, 1
          // ]
          return [
            mat[0] * x,
            mat[1] * y,
            mat[2] * z,
            mat[3],
            mat[4] * x,
            mat[5] * y,
            mat[6] * z,
            mat[7],
            mat[8] * x,
            mat[9] * y,
            mat[10] * z,
            mat[11],
            mat[12] * x,
            mat[13] * y,
            mat[14] * z,
            mat[15]
          ];
        },
        shear3D: function (mat, x, y, z) {
          return null;
        },
        lookAt: function (mat, x, y, z) {
          return null;
        },
        reverse3D: function (mat) {
          return null;
        }
      }
    };

    return util;
  }
)();
