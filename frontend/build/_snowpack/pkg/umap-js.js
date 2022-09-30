import { c as createCommonjsModule, a as commonjsGlobal } from './common/_commonjsHelpers-8c19dec8.js';
import { A as AbstractMatrix, M as Matrix } from './common/matrix-85e403be.js';

class WrapperMatrix2D extends AbstractMatrix {
  constructor(data) {
    super();
    this.data = data;
    this.rows = data.length;
    this.columns = data[0].length;
  }

  set(rowIndex, columnIndex, value) {
    this.data[rowIndex][columnIndex] = value;
    return this;
  }

  get(rowIndex, columnIndex) {
    return this.data[rowIndex][columnIndex];
  }
}

class LuDecomposition {
  constructor(matrix) {
    matrix = WrapperMatrix2D.checkMatrix(matrix);

    let lu = matrix.clone();
    let rows = lu.rows;
    let columns = lu.columns;
    let pivotVector = new Float64Array(rows);
    let pivotSign = 1;
    let i, j, k, p, s, t, v;
    let LUcolj, kmax;

    for (i = 0; i < rows; i++) {
      pivotVector[i] = i;
    }

    LUcolj = new Float64Array(rows);

    for (j = 0; j < columns; j++) {
      for (i = 0; i < rows; i++) {
        LUcolj[i] = lu.get(i, j);
      }

      for (i = 0; i < rows; i++) {
        kmax = Math.min(i, j);
        s = 0;
        for (k = 0; k < kmax; k++) {
          s += lu.get(i, k) * LUcolj[k];
        }
        LUcolj[i] -= s;
        lu.set(i, j, LUcolj[i]);
      }

      p = j;
      for (i = j + 1; i < rows; i++) {
        if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
          p = i;
        }
      }

      if (p !== j) {
        for (k = 0; k < columns; k++) {
          t = lu.get(p, k);
          lu.set(p, k, lu.get(j, k));
          lu.set(j, k, t);
        }

        v = pivotVector[p];
        pivotVector[p] = pivotVector[j];
        pivotVector[j] = v;

        pivotSign = -pivotSign;
      }

      if (j < rows && lu.get(j, j) !== 0) {
        for (i = j + 1; i < rows; i++) {
          lu.set(i, j, lu.get(i, j) / lu.get(j, j));
        }
      }
    }

    this.LU = lu;
    this.pivotVector = pivotVector;
    this.pivotSign = pivotSign;
  }

  isSingular() {
    let data = this.LU;
    let col = data.columns;
    for (let j = 0; j < col; j++) {
      if (data.get(j, j) === 0) {
        return true;
      }
    }
    return false;
  }

  solve(value) {
    value = Matrix.checkMatrix(value);

    let lu = this.LU;
    let rows = lu.rows;

    if (rows !== value.rows) {
      throw new Error('Invalid matrix dimensions');
    }
    if (this.isSingular()) {
      throw new Error('LU matrix is singular');
    }

    let count = value.columns;
    let X = value.subMatrixRow(this.pivotVector, 0, count - 1);
    let columns = lu.columns;
    let i, j, k;

    for (k = 0; k < columns; k++) {
      for (i = k + 1; i < columns; i++) {
        for (j = 0; j < count; j++) {
          X.set(i, j, X.get(i, j) - X.get(k, j) * lu.get(i, k));
        }
      }
    }
    for (k = columns - 1; k >= 0; k--) {
      for (j = 0; j < count; j++) {
        X.set(k, j, X.get(k, j) / lu.get(k, k));
      }
      for (i = 0; i < k; i++) {
        for (j = 0; j < count; j++) {
          X.set(i, j, X.get(i, j) - X.get(k, j) * lu.get(i, k));
        }
      }
    }
    return X;
  }

  get determinant() {
    let data = this.LU;
    if (!data.isSquare()) {
      throw new Error('Matrix must be square');
    }
    let determinant = this.pivotSign;
    let col = data.columns;
    for (let j = 0; j < col; j++) {
      determinant *= data.get(j, j);
    }
    return determinant;
  }

  get lowerTriangularMatrix() {
    let data = this.LU;
    let rows = data.rows;
    let columns = data.columns;
    let X = new Matrix(rows, columns);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (i > j) {
          X.set(i, j, data.get(i, j));
        } else if (i === j) {
          X.set(i, j, 1);
        } else {
          X.set(i, j, 0);
        }
      }
    }
    return X;
  }

  get upperTriangularMatrix() {
    let data = this.LU;
    let rows = data.rows;
    let columns = data.columns;
    let X = new Matrix(rows, columns);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (i <= j) {
          X.set(i, j, data.get(i, j));
        } else {
          X.set(i, j, 0);
        }
      }
    }
    return X;
  }

  get pivotPermutationVector() {
    return Array.from(this.pivotVector);
  }
}

function hypotenuse(a, b) {
  let r = 0;
  if (Math.abs(a) > Math.abs(b)) {
    r = b / a;
    return Math.abs(a) * Math.sqrt(1 + r * r);
  }
  if (b !== 0) {
    r = a / b;
    return Math.abs(b) * Math.sqrt(1 + r * r);
  }
  return 0;
}

class QrDecomposition {
  constructor(value) {
    value = WrapperMatrix2D.checkMatrix(value);

    let qr = value.clone();
    let m = value.rows;
    let n = value.columns;
    let rdiag = new Float64Array(n);
    let i, j, k, s;

    for (k = 0; k < n; k++) {
      let nrm = 0;
      for (i = k; i < m; i++) {
        nrm = hypotenuse(nrm, qr.get(i, k));
      }
      if (nrm !== 0) {
        if (qr.get(k, k) < 0) {
          nrm = -nrm;
        }
        for (i = k; i < m; i++) {
          qr.set(i, k, qr.get(i, k) / nrm);
        }
        qr.set(k, k, qr.get(k, k) + 1);
        for (j = k + 1; j < n; j++) {
          s = 0;
          for (i = k; i < m; i++) {
            s += qr.get(i, k) * qr.get(i, j);
          }
          s = -s / qr.get(k, k);
          for (i = k; i < m; i++) {
            qr.set(i, j, qr.get(i, j) + s * qr.get(i, k));
          }
        }
      }
      rdiag[k] = -nrm;
    }

    this.QR = qr;
    this.Rdiag = rdiag;
  }

  solve(value) {
    value = Matrix.checkMatrix(value);

    let qr = this.QR;
    let m = qr.rows;

    if (value.rows !== m) {
      throw new Error('Matrix row dimensions must agree');
    }
    if (!this.isFullRank()) {
      throw new Error('Matrix is rank deficient');
    }

    let count = value.columns;
    let X = value.clone();
    let n = qr.columns;
    let i, j, k, s;

    for (k = 0; k < n; k++) {
      for (j = 0; j < count; j++) {
        s = 0;
        for (i = k; i < m; i++) {
          s += qr.get(i, k) * X.get(i, j);
        }
        s = -s / qr.get(k, k);
        for (i = k; i < m; i++) {
          X.set(i, j, X.get(i, j) + s * qr.get(i, k));
        }
      }
    }
    for (k = n - 1; k >= 0; k--) {
      for (j = 0; j < count; j++) {
        X.set(k, j, X.get(k, j) / this.Rdiag[k]);
      }
      for (i = 0; i < k; i++) {
        for (j = 0; j < count; j++) {
          X.set(i, j, X.get(i, j) - X.get(k, j) * qr.get(i, k));
        }
      }
    }

    return X.subMatrix(0, n - 1, 0, count - 1);
  }

  isFullRank() {
    let columns = this.QR.columns;
    for (let i = 0; i < columns; i++) {
      if (this.Rdiag[i] === 0) {
        return false;
      }
    }
    return true;
  }

  get upperTriangularMatrix() {
    let qr = this.QR;
    let n = qr.columns;
    let X = new Matrix(n, n);
    let i, j;
    for (i = 0; i < n; i++) {
      for (j = 0; j < n; j++) {
        if (i < j) {
          X.set(i, j, qr.get(i, j));
        } else if (i === j) {
          X.set(i, j, this.Rdiag[i]);
        } else {
          X.set(i, j, 0);
        }
      }
    }
    return X;
  }

  get orthogonalMatrix() {
    let qr = this.QR;
    let rows = qr.rows;
    let columns = qr.columns;
    let X = new Matrix(rows, columns);
    let i, j, k, s;

    for (k = columns - 1; k >= 0; k--) {
      for (i = 0; i < rows; i++) {
        X.set(i, k, 0);
      }
      X.set(k, k, 1);
      for (j = k; j < columns; j++) {
        if (qr.get(k, k) !== 0) {
          s = 0;
          for (i = k; i < rows; i++) {
            s += qr.get(i, k) * X.get(i, j);
          }

          s = -s / qr.get(k, k);

          for (i = k; i < rows; i++) {
            X.set(i, j, X.get(i, j) + s * qr.get(i, k));
          }
        }
      }
    }
    return X;
  }
}

class SingularValueDecomposition {
  constructor(value, options = {}) {
    value = WrapperMatrix2D.checkMatrix(value);

    if (value.isEmpty()) {
      throw new Error('Matrix must be non-empty');
    }

    let m = value.rows;
    let n = value.columns;

    const {
      computeLeftSingularVectors = true,
      computeRightSingularVectors = true,
      autoTranspose = false,
    } = options;

    let wantu = Boolean(computeLeftSingularVectors);
    let wantv = Boolean(computeRightSingularVectors);

    let swapped = false;
    let a;
    if (m < n) {
      if (!autoTranspose) {
        a = value.clone();
        // eslint-disable-next-line no-console
        console.warn(
          'Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose',
        );
      } else {
        a = value.transpose();
        m = a.rows;
        n = a.columns;
        swapped = true;
        let aux = wantu;
        wantu = wantv;
        wantv = aux;
      }
    } else {
      a = value.clone();
    }

    let nu = Math.min(m, n);
    let ni = Math.min(m + 1, n);
    let s = new Float64Array(ni);
    let U = new Matrix(m, nu);
    let V = new Matrix(n, n);

    let e = new Float64Array(n);
    let work = new Float64Array(m);

    let si = new Float64Array(ni);
    for (let i = 0; i < ni; i++) si[i] = i;

    let nct = Math.min(m - 1, n);
    let nrt = Math.max(0, Math.min(n - 2, m));
    let mrc = Math.max(nct, nrt);

    for (let k = 0; k < mrc; k++) {
      if (k < nct) {
        s[k] = 0;
        for (let i = k; i < m; i++) {
          s[k] = hypotenuse(s[k], a.get(i, k));
        }
        if (s[k] !== 0) {
          if (a.get(k, k) < 0) {
            s[k] = -s[k];
          }
          for (let i = k; i < m; i++) {
            a.set(i, k, a.get(i, k) / s[k]);
          }
          a.set(k, k, a.get(k, k) + 1);
        }
        s[k] = -s[k];
      }

      for (let j = k + 1; j < n; j++) {
        if (k < nct && s[k] !== 0) {
          let t = 0;
          for (let i = k; i < m; i++) {
            t += a.get(i, k) * a.get(i, j);
          }
          t = -t / a.get(k, k);
          for (let i = k; i < m; i++) {
            a.set(i, j, a.get(i, j) + t * a.get(i, k));
          }
        }
        e[j] = a.get(k, j);
      }

      if (wantu && k < nct) {
        for (let i = k; i < m; i++) {
          U.set(i, k, a.get(i, k));
        }
      }

      if (k < nrt) {
        e[k] = 0;
        for (let i = k + 1; i < n; i++) {
          e[k] = hypotenuse(e[k], e[i]);
        }
        if (e[k] !== 0) {
          if (e[k + 1] < 0) {
            e[k] = 0 - e[k];
          }
          for (let i = k + 1; i < n; i++) {
            e[i] /= e[k];
          }
          e[k + 1] += 1;
        }
        e[k] = -e[k];
        if (k + 1 < m && e[k] !== 0) {
          for (let i = k + 1; i < m; i++) {
            work[i] = 0;
          }
          for (let i = k + 1; i < m; i++) {
            for (let j = k + 1; j < n; j++) {
              work[i] += e[j] * a.get(i, j);
            }
          }
          for (let j = k + 1; j < n; j++) {
            let t = -e[j] / e[k + 1];
            for (let i = k + 1; i < m; i++) {
              a.set(i, j, a.get(i, j) + t * work[i]);
            }
          }
        }
        if (wantv) {
          for (let i = k + 1; i < n; i++) {
            V.set(i, k, e[i]);
          }
        }
      }
    }

    let p = Math.min(n, m + 1);
    if (nct < n) {
      s[nct] = a.get(nct, nct);
    }
    if (m < p) {
      s[p - 1] = 0;
    }
    if (nrt + 1 < p) {
      e[nrt] = a.get(nrt, p - 1);
    }
    e[p - 1] = 0;

    if (wantu) {
      for (let j = nct; j < nu; j++) {
        for (let i = 0; i < m; i++) {
          U.set(i, j, 0);
        }
        U.set(j, j, 1);
      }
      for (let k = nct - 1; k >= 0; k--) {
        if (s[k] !== 0) {
          for (let j = k + 1; j < nu; j++) {
            let t = 0;
            for (let i = k; i < m; i++) {
              t += U.get(i, k) * U.get(i, j);
            }
            t = -t / U.get(k, k);
            for (let i = k; i < m; i++) {
              U.set(i, j, U.get(i, j) + t * U.get(i, k));
            }
          }
          for (let i = k; i < m; i++) {
            U.set(i, k, -U.get(i, k));
          }
          U.set(k, k, 1 + U.get(k, k));
          for (let i = 0; i < k - 1; i++) {
            U.set(i, k, 0);
          }
        } else {
          for (let i = 0; i < m; i++) {
            U.set(i, k, 0);
          }
          U.set(k, k, 1);
        }
      }
    }

    if (wantv) {
      for (let k = n - 1; k >= 0; k--) {
        if (k < nrt && e[k] !== 0) {
          for (let j = k + 1; j < n; j++) {
            let t = 0;
            for (let i = k + 1; i < n; i++) {
              t += V.get(i, k) * V.get(i, j);
            }
            t = -t / V.get(k + 1, k);
            for (let i = k + 1; i < n; i++) {
              V.set(i, j, V.get(i, j) + t * V.get(i, k));
            }
          }
        }
        for (let i = 0; i < n; i++) {
          V.set(i, k, 0);
        }
        V.set(k, k, 1);
      }
    }

    let pp = p - 1;
    let eps = Number.EPSILON;
    while (p > 0) {
      let k, kase;
      for (k = p - 2; k >= -1; k--) {
        if (k === -1) {
          break;
        }
        const alpha =
          Number.MIN_VALUE + eps * Math.abs(s[k] + Math.abs(s[k + 1]));
        if (Math.abs(e[k]) <= alpha || Number.isNaN(e[k])) {
          e[k] = 0;
          break;
        }
      }
      if (k === p - 2) {
        kase = 4;
      } else {
        let ks;
        for (ks = p - 1; ks >= k; ks--) {
          if (ks === k) {
            break;
          }
          let t =
            (ks !== p ? Math.abs(e[ks]) : 0) +
            (ks !== k + 1 ? Math.abs(e[ks - 1]) : 0);
          if (Math.abs(s[ks]) <= eps * t) {
            s[ks] = 0;
            break;
          }
        }
        if (ks === k) {
          kase = 3;
        } else if (ks === p - 1) {
          kase = 1;
        } else {
          kase = 2;
          k = ks;
        }
      }

      k++;

      switch (kase) {
        case 1: {
          let f = e[p - 2];
          e[p - 2] = 0;
          for (let j = p - 2; j >= k; j--) {
            let t = hypotenuse(s[j], f);
            let cs = s[j] / t;
            let sn = f / t;
            s[j] = t;
            if (j !== k) {
              f = -sn * e[j - 1];
              e[j - 1] = cs * e[j - 1];
            }
            if (wantv) {
              for (let i = 0; i < n; i++) {
                t = cs * V.get(i, j) + sn * V.get(i, p - 1);
                V.set(i, p - 1, -sn * V.get(i, j) + cs * V.get(i, p - 1));
                V.set(i, j, t);
              }
            }
          }
          break;
        }
        case 2: {
          let f = e[k - 1];
          e[k - 1] = 0;
          for (let j = k; j < p; j++) {
            let t = hypotenuse(s[j], f);
            let cs = s[j] / t;
            let sn = f / t;
            s[j] = t;
            f = -sn * e[j];
            e[j] = cs * e[j];
            if (wantu) {
              for (let i = 0; i < m; i++) {
                t = cs * U.get(i, j) + sn * U.get(i, k - 1);
                U.set(i, k - 1, -sn * U.get(i, j) + cs * U.get(i, k - 1));
                U.set(i, j, t);
              }
            }
          }
          break;
        }
        case 3: {
          const scale = Math.max(
            Math.abs(s[p - 1]),
            Math.abs(s[p - 2]),
            Math.abs(e[p - 2]),
            Math.abs(s[k]),
            Math.abs(e[k]),
          );
          const sp = s[p - 1] / scale;
          const spm1 = s[p - 2] / scale;
          const epm1 = e[p - 2] / scale;
          const sk = s[k] / scale;
          const ek = e[k] / scale;
          const b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2;
          const c = sp * epm1 * (sp * epm1);
          let shift = 0;
          if (b !== 0 || c !== 0) {
            if (b < 0) {
              shift = 0 - Math.sqrt(b * b + c);
            } else {
              shift = Math.sqrt(b * b + c);
            }
            shift = c / (b + shift);
          }
          let f = (sk + sp) * (sk - sp) + shift;
          let g = sk * ek;
          for (let j = k; j < p - 1; j++) {
            let t = hypotenuse(f, g);
            if (t === 0) t = Number.MIN_VALUE;
            let cs = f / t;
            let sn = g / t;
            if (j !== k) {
              e[j - 1] = t;
            }
            f = cs * s[j] + sn * e[j];
            e[j] = cs * e[j] - sn * s[j];
            g = sn * s[j + 1];
            s[j + 1] = cs * s[j + 1];
            if (wantv) {
              for (let i = 0; i < n; i++) {
                t = cs * V.get(i, j) + sn * V.get(i, j + 1);
                V.set(i, j + 1, -sn * V.get(i, j) + cs * V.get(i, j + 1));
                V.set(i, j, t);
              }
            }
            t = hypotenuse(f, g);
            if (t === 0) t = Number.MIN_VALUE;
            cs = f / t;
            sn = g / t;
            s[j] = t;
            f = cs * e[j] + sn * s[j + 1];
            s[j + 1] = -sn * e[j] + cs * s[j + 1];
            g = sn * e[j + 1];
            e[j + 1] = cs * e[j + 1];
            if (wantu && j < m - 1) {
              for (let i = 0; i < m; i++) {
                t = cs * U.get(i, j) + sn * U.get(i, j + 1);
                U.set(i, j + 1, -sn * U.get(i, j) + cs * U.get(i, j + 1));
                U.set(i, j, t);
              }
            }
          }
          e[p - 2] = f;
          break;
        }
        case 4: {
          if (s[k] <= 0) {
            s[k] = s[k] < 0 ? -s[k] : 0;
            if (wantv) {
              for (let i = 0; i <= pp; i++) {
                V.set(i, k, -V.get(i, k));
              }
            }
          }
          while (k < pp) {
            if (s[k] >= s[k + 1]) {
              break;
            }
            let t = s[k];
            s[k] = s[k + 1];
            s[k + 1] = t;
            if (wantv && k < n - 1) {
              for (let i = 0; i < n; i++) {
                t = V.get(i, k + 1);
                V.set(i, k + 1, V.get(i, k));
                V.set(i, k, t);
              }
            }
            if (wantu && k < m - 1) {
              for (let i = 0; i < m; i++) {
                t = U.get(i, k + 1);
                U.set(i, k + 1, U.get(i, k));
                U.set(i, k, t);
              }
            }
            k++;
          }
          p--;
          break;
        }
        // no default
      }
    }

    if (swapped) {
      let tmp = V;
      V = U;
      U = tmp;
    }

    this.m = m;
    this.n = n;
    this.s = s;
    this.U = U;
    this.V = V;
  }

  solve(value) {
    let Y = value;
    let e = this.threshold;
    let scols = this.s.length;
    let Ls = Matrix.zeros(scols, scols);

    for (let i = 0; i < scols; i++) {
      if (Math.abs(this.s[i]) <= e) {
        Ls.set(i, i, 0);
      } else {
        Ls.set(i, i, 1 / this.s[i]);
      }
    }

    let U = this.U;
    let V = this.rightSingularVectors;

    let VL = V.mmul(Ls);
    let vrows = V.rows;
    let urows = U.rows;
    let VLU = Matrix.zeros(vrows, urows);

    for (let i = 0; i < vrows; i++) {
      for (let j = 0; j < urows; j++) {
        let sum = 0;
        for (let k = 0; k < scols; k++) {
          sum += VL.get(i, k) * U.get(j, k);
        }
        VLU.set(i, j, sum);
      }
    }

    return VLU.mmul(Y);
  }

  solveForDiagonal(value) {
    return this.solve(Matrix.diag(value));
  }

  inverse() {
    let V = this.V;
    let e = this.threshold;
    let vrows = V.rows;
    let vcols = V.columns;
    let X = new Matrix(vrows, this.s.length);

    for (let i = 0; i < vrows; i++) {
      for (let j = 0; j < vcols; j++) {
        if (Math.abs(this.s[j]) > e) {
          X.set(i, j, V.get(i, j) / this.s[j]);
        }
      }
    }

    let U = this.U;

    let urows = U.rows;
    let ucols = U.columns;
    let Y = new Matrix(vrows, urows);

    for (let i = 0; i < vrows; i++) {
      for (let j = 0; j < urows; j++) {
        let sum = 0;
        for (let k = 0; k < ucols; k++) {
          sum += X.get(i, k) * U.get(j, k);
        }
        Y.set(i, j, sum);
      }
    }

    return Y;
  }

  get condition() {
    return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
  }

  get norm2() {
    return this.s[0];
  }

  get rank() {
    let tol = Math.max(this.m, this.n) * this.s[0] * Number.EPSILON;
    let r = 0;
    let s = this.s;
    for (let i = 0, ii = s.length; i < ii; i++) {
      if (s[i] > tol) {
        r++;
      }
    }
    return r;
  }

  get diagonal() {
    return Array.from(this.s);
  }

  get threshold() {
    return (Number.EPSILON / 2) * Math.max(this.m, this.n) * this.s[0];
  }

  get leftSingularVectors() {
    return this.U;
  }

  get rightSingularVectors() {
    return this.V;
  }

  get diagonalMatrix() {
    return Matrix.diag(this.s);
  }
}

function inverse(matrix, useSVD = false) {
  matrix = WrapperMatrix2D.checkMatrix(matrix);
  if (useSVD) {
    return new SingularValueDecomposition(matrix).inverse();
  } else {
    return solve(matrix, Matrix.eye(matrix.rows));
  }
}

function solve(leftHandSide, rightHandSide, useSVD = false) {
  leftHandSide = WrapperMatrix2D.checkMatrix(leftHandSide);
  rightHandSide = WrapperMatrix2D.checkMatrix(rightHandSide);
  if (useSVD) {
    return new SingularValueDecomposition(leftHandSide).solve(rightHandSide);
  } else {
    return leftHandSide.isSquare()
      ? new LuDecomposition(leftHandSide).solve(rightHandSide)
      : new QrDecomposition(leftHandSide).solve(rightHandSide);
  }
}

var utils = createCommonjsModule(function (module, exports) {
var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
function tauRandInt(n, random) {
    return Math.floor(random() * n);
}
exports.tauRandInt = tauRandInt;
function tauRand(random) {
    return random();
}
exports.tauRand = tauRand;
function norm(vec) {
    var e_1, _a;
    var result = 0;
    try {
        for (var vec_1 = __values(vec), vec_1_1 = vec_1.next(); !vec_1_1.done; vec_1_1 = vec_1.next()) {
            var item = vec_1_1.value;
            result += Math.pow(item, 2);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (vec_1_1 && !vec_1_1.done && (_a = vec_1.return)) _a.call(vec_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return Math.sqrt(result);
}
exports.norm = norm;
function empty(n) {
    var output = [];
    for (var i = 0; i < n; i++) {
        output.push(undefined);
    }
    return output;
}
exports.empty = empty;
function range(n) {
    return empty(n).map(function (_, i) { return i; });
}
exports.range = range;
function filled(n, v) {
    return empty(n).map(function () { return v; });
}
exports.filled = filled;
function zeros(n) {
    return filled(n, 0);
}
exports.zeros = zeros;
function ones(n) {
    return filled(n, 1);
}
exports.ones = ones;
function linear(a, b, len) {
    return empty(len).map(function (_, i) {
        return a + i * ((b - a) / (len - 1));
    });
}
exports.linear = linear;
function sum(input) {
    return input.reduce(function (sum, val) { return sum + val; });
}
exports.sum = sum;
function mean(input) {
    return sum(input) / input.length;
}
exports.mean = mean;
function max(input) {
    var max = 0;
    for (var i = 0; i < input.length; i++) {
        max = input[i] > max ? input[i] : max;
    }
    return max;
}
exports.max = max;
function max2d(input) {
    var max = 0;
    for (var i = 0; i < input.length; i++) {
        for (var j = 0; j < input[i].length; j++) {
            max = input[i][j] > max ? input[i][j] : max;
        }
    }
    return max;
}
exports.max2d = max2d;
function rejectionSample(nSamples, poolSize, random) {
    var result = zeros(nSamples);
    for (var i = 0; i < nSamples; i++) {
        var rejectSample = true;
        while (rejectSample) {
            var j = tauRandInt(poolSize, random);
            var broken = false;
            for (var k = 0; k < i; k++) {
                if (j === result[k]) {
                    broken = true;
                    break;
                }
            }
            if (!broken) {
                rejectSample = false;
            }
            result[i] = j;
        }
    }
    return result;
}
exports.rejectionSample = rejectionSample;
function reshape2d(x, a, b) {
    var rows = [];
    var index = 0;
    if (x.length !== a * b) {
        throw new Error('Array dimensions must match input length.');
    }
    for (var i = 0; i < a; i++) {
        var col = [];
        for (var j = 0; j < b; j++) {
            col.push(x[index]);
            index += 1;
        }
        rows.push(col);
    }
    return rows;
}
exports.reshape2d = reshape2d;
});

var heap = createCommonjsModule(function (module, exports) {
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils$1 = __importStar(utils);
function makeHeap(nPoints, size) {
    var makeArrays = function (fillValue) {
        return utils$1.empty(nPoints).map(function () {
            return utils$1.filled(size, fillValue);
        });
    };
    var heap = [];
    heap.push(makeArrays(-1));
    heap.push(makeArrays(Infinity));
    heap.push(makeArrays(0));
    return heap;
}
exports.makeHeap = makeHeap;
function rejectionSample(nSamples, poolSize, random) {
    var result = utils$1.zeros(nSamples);
    for (var i = 0; i < nSamples; i++) {
        var rejectSample = true;
        var j = 0;
        while (rejectSample) {
            j = utils$1.tauRandInt(poolSize, random);
            var broken = false;
            for (var k = 0; k < i; k++) {
                if (j === result[k]) {
                    broken = true;
                    break;
                }
            }
            if (!broken)
                rejectSample = false;
        }
        result[i] = j;
    }
    return result;
}
exports.rejectionSample = rejectionSample;
function heapPush(heap, row, weight, index, flag) {
    row = Math.floor(row);
    var indices = heap[0][row];
    var weights = heap[1][row];
    var isNew = heap[2][row];
    if (weight >= weights[0]) {
        return 0;
    }
    for (var i = 0; i < indices.length; i++) {
        if (index === indices[i]) {
            return 0;
        }
    }
    return uncheckedHeapPush(heap, row, weight, index, flag);
}
exports.heapPush = heapPush;
function uncheckedHeapPush(heap, row, weight, index, flag) {
    var indices = heap[0][row];
    var weights = heap[1][row];
    var isNew = heap[2][row];
    if (weight >= weights[0]) {
        return 0;
    }
    weights[0] = weight;
    indices[0] = index;
    isNew[0] = flag;
    var i = 0;
    var iSwap = 0;
    while (true) {
        var ic1 = 2 * i + 1;
        var ic2 = ic1 + 1;
        var heapShape2 = heap[0][0].length;
        if (ic1 >= heapShape2) {
            break;
        }
        else if (ic2 >= heapShape2) {
            if (weights[ic1] > weight) {
                iSwap = ic1;
            }
            else {
                break;
            }
        }
        else if (weights[ic1] >= weights[ic2]) {
            if (weight < weights[ic1]) {
                iSwap = ic1;
            }
            else {
                break;
            }
        }
        else {
            if (weight < weights[ic2]) {
                iSwap = ic2;
            }
            else {
                break;
            }
        }
        weights[i] = weights[iSwap];
        indices[i] = indices[iSwap];
        isNew[i] = isNew[iSwap];
        i = iSwap;
    }
    weights[i] = weight;
    indices[i] = index;
    isNew[i] = flag;
    return 1;
}
exports.uncheckedHeapPush = uncheckedHeapPush;
function buildCandidates(currentGraph, nVertices, nNeighbors, maxCandidates, random) {
    var candidateNeighbors = makeHeap(nVertices, maxCandidates);
    for (var i = 0; i < nVertices; i++) {
        for (var j = 0; j < nNeighbors; j++) {
            if (currentGraph[0][i][j] < 0) {
                continue;
            }
            var idx = currentGraph[0][i][j];
            var isn = currentGraph[2][i][j];
            var d = utils$1.tauRand(random);
            heapPush(candidateNeighbors, i, d, idx, isn);
            heapPush(candidateNeighbors, idx, d, i, isn);
            currentGraph[2][i][j] = 0;
        }
    }
    return candidateNeighbors;
}
exports.buildCandidates = buildCandidates;
function deheapSort(heap) {
    var indices = heap[0];
    var weights = heap[1];
    for (var i = 0; i < indices.length; i++) {
        var indHeap = indices[i];
        var distHeap = weights[i];
        for (var j = 0; j < indHeap.length - 1; j++) {
            var indHeapIndex = indHeap.length - j - 1;
            var distHeapIndex = distHeap.length - j - 1;
            var temp1 = indHeap[0];
            indHeap[0] = indHeap[indHeapIndex];
            indHeap[indHeapIndex] = temp1;
            var temp2 = distHeap[0];
            distHeap[0] = distHeap[distHeapIndex];
            distHeap[distHeapIndex] = temp2;
            siftDown(distHeap, indHeap, distHeapIndex, 0);
        }
    }
    return { indices: indices, weights: weights };
}
exports.deheapSort = deheapSort;
function siftDown(heap1, heap2, ceiling, elt) {
    while (elt * 2 + 1 < ceiling) {
        var leftChild = elt * 2 + 1;
        var rightChild = leftChild + 1;
        var swap = elt;
        if (heap1[swap] < heap1[leftChild]) {
            swap = leftChild;
        }
        if (rightChild < ceiling && heap1[swap] < heap1[rightChild]) {
            swap = rightChild;
        }
        if (swap === elt) {
            break;
        }
        else {
            var temp1 = heap1[elt];
            heap1[elt] = heap1[swap];
            heap1[swap] = temp1;
            var temp2 = heap2[elt];
            heap2[elt] = heap2[swap];
            heap2[swap] = temp2;
            elt = swap;
        }
    }
}
function smallestFlagged(heap, row) {
    var ind = heap[0][row];
    var dist = heap[1][row];
    var flag = heap[2][row];
    var minDist = Infinity;
    var resultIndex = -1;
    for (var i = 0; i > ind.length; i++) {
        if (flag[i] === 1 && dist[i] < minDist) {
            minDist = dist[i];
            resultIndex = i;
        }
    }
    if (resultIndex >= 0) {
        flag[resultIndex] = 0;
        return Math.floor(ind[resultIndex]);
    }
    else {
        return -1;
    }
}
exports.smallestFlagged = smallestFlagged;
});

var matrix = createCommonjsModule(function (module, exports) {
var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var utils$1 = __importStar(utils);
var SparseMatrix = (function () {
    function SparseMatrix(rows, cols, values, dims) {
        this.entries = new Map();
        this.nRows = 0;
        this.nCols = 0;
        if (rows.length !== cols.length || rows.length !== values.length) {
            throw new Error('rows, cols and values arrays must all have the same length');
        }
        this.nRows = dims[0];
        this.nCols = dims[1];
        for (var i = 0; i < values.length; i++) {
            var row = rows[i];
            var col = cols[i];
            this.checkDims(row, col);
            var key = this.makeKey(row, col);
            this.entries.set(key, { value: values[i], row: row, col: col });
        }
    }
    SparseMatrix.prototype.makeKey = function (row, col) {
        return row + ":" + col;
    };
    SparseMatrix.prototype.checkDims = function (row, col) {
        var withinBounds = row < this.nRows && col < this.nCols;
        if (!withinBounds) {
            throw new Error('row and/or col specified outside of matrix dimensions');
        }
    };
    SparseMatrix.prototype.set = function (row, col, value) {
        this.checkDims(row, col);
        var key = this.makeKey(row, col);
        if (!this.entries.has(key)) {
            this.entries.set(key, { value: value, row: row, col: col });
        }
        else {
            this.entries.get(key).value = value;
        }
    };
    SparseMatrix.prototype.get = function (row, col, defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        this.checkDims(row, col);
        var key = this.makeKey(row, col);
        if (this.entries.has(key)) {
            return this.entries.get(key).value;
        }
        else {
            return defaultValue;
        }
    };
    SparseMatrix.prototype.getAll = function (ordered) {
        if (ordered === void 0) { ordered = true; }
        var rowColValues = [];
        this.entries.forEach(function (value) {
            rowColValues.push(value);
        });
        if (ordered) {
            rowColValues.sort(function (a, b) {
                if (a.row === b.row) {
                    return a.col - b.col;
                }
                else {
                    return a.row - b.row;
                }
            });
        }
        return rowColValues;
    };
    SparseMatrix.prototype.getDims = function () {
        return [this.nRows, this.nCols];
    };
    SparseMatrix.prototype.getRows = function () {
        return Array.from(this.entries, function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            return value.row;
        });
    };
    SparseMatrix.prototype.getCols = function () {
        return Array.from(this.entries, function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            return value.col;
        });
    };
    SparseMatrix.prototype.getValues = function () {
        return Array.from(this.entries, function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            return value.value;
        });
    };
    SparseMatrix.prototype.forEach = function (fn) {
        this.entries.forEach(function (value) { return fn(value.value, value.row, value.col); });
    };
    SparseMatrix.prototype.map = function (fn) {
        var vals = [];
        this.entries.forEach(function (value) {
            vals.push(fn(value.value, value.row, value.col));
        });
        var dims = [this.nRows, this.nCols];
        return new SparseMatrix(this.getRows(), this.getCols(), vals, dims);
    };
    SparseMatrix.prototype.toArray = function () {
        var _this = this;
        var rows = utils$1.empty(this.nRows);
        var output = rows.map(function () {
            return utils$1.zeros(_this.nCols);
        });
        this.entries.forEach(function (value) {
            output[value.row][value.col] = value.value;
        });
        return output;
    };
    return SparseMatrix;
}());
exports.SparseMatrix = SparseMatrix;
function transpose(matrix) {
    var cols = [];
    var rows = [];
    var vals = [];
    matrix.forEach(function (value, row, col) {
        cols.push(row);
        rows.push(col);
        vals.push(value);
    });
    var dims = [matrix.nCols, matrix.nRows];
    return new SparseMatrix(rows, cols, vals, dims);
}
exports.transpose = transpose;
function identity(size) {
    var _a = __read(size, 1), rows = _a[0];
    var matrix = new SparseMatrix([], [], [], size);
    for (var i = 0; i < rows; i++) {
        matrix.set(i, i, 1);
    }
    return matrix;
}
exports.identity = identity;
function pairwiseMultiply(a, b) {
    return elementWise(a, b, function (x, y) { return x * y; });
}
exports.pairwiseMultiply = pairwiseMultiply;
function add(a, b) {
    return elementWise(a, b, function (x, y) { return x + y; });
}
exports.add = add;
function subtract(a, b) {
    return elementWise(a, b, function (x, y) { return x - y; });
}
exports.subtract = subtract;
function maximum(a, b) {
    return elementWise(a, b, function (x, y) { return (x > y ? x : y); });
}
exports.maximum = maximum;
function multiplyScalar(a, scalar) {
    return a.map(function (value) {
        return value * scalar;
    });
}
exports.multiplyScalar = multiplyScalar;
function eliminateZeros(m) {
    var zeroIndices = new Set();
    var values = m.getValues();
    var rows = m.getRows();
    var cols = m.getCols();
    for (var i = 0; i < values.length; i++) {
        if (values[i] === 0) {
            zeroIndices.add(i);
        }
    }
    var removeByZeroIndex = function (_, index) { return !zeroIndices.has(index); };
    var nextValues = values.filter(removeByZeroIndex);
    var nextRows = rows.filter(removeByZeroIndex);
    var nextCols = cols.filter(removeByZeroIndex);
    return new SparseMatrix(nextRows, nextCols, nextValues, m.getDims());
}
exports.eliminateZeros = eliminateZeros;
function normalize(m, normType) {
    if (normType === void 0) { normType = "l2"; }
    var e_1, _a;
    var normFn = normFns[normType];
    var colsByRow = new Map();
    m.forEach(function (_, row, col) {
        var cols = colsByRow.get(row) || [];
        cols.push(col);
        colsByRow.set(row, cols);
    });
    var nextMatrix = new SparseMatrix([], [], [], m.getDims());
    var _loop_1 = function (row) {
        var cols = colsByRow.get(row).sort();
        var vals = cols.map(function (col) { return m.get(row, col); });
        var norm = normFn(vals);
        for (var i = 0; i < norm.length; i++) {
            nextMatrix.set(row, cols[i], norm[i]);
        }
    };
    try {
        for (var _b = __values(colsByRow.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var row = _c.value;
            _loop_1(row);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return nextMatrix;
}
exports.normalize = normalize;
var normFns = (_a = {},
    _a["max"] = function (xs) {
        var max = -Infinity;
        for (var i = 0; i < xs.length; i++) {
            max = xs[i] > max ? xs[i] : max;
        }
        return xs.map(function (x) { return x / max; });
    },
    _a["l1"] = function (xs) {
        var sum = 0;
        for (var i = 0; i < xs.length; i++) {
            sum += xs[i];
        }
        return xs.map(function (x) { return x / sum; });
    },
    _a["l2"] = function (xs) {
        var sum = 0;
        for (var i = 0; i < xs.length; i++) {
            sum += Math.pow(xs[i], 2);
        }
        return xs.map(function (x) { return Math.sqrt(Math.pow(x, 2) / sum); });
    },
    _a);
function elementWise(a, b, op) {
    var visited = new Set();
    var rows = [];
    var cols = [];
    var vals = [];
    var operate = function (row, col) {
        rows.push(row);
        cols.push(col);
        var nextValue = op(a.get(row, col), b.get(row, col));
        vals.push(nextValue);
    };
    var valuesA = a.getValues();
    var rowsA = a.getRows();
    var colsA = a.getCols();
    for (var i = 0; i < valuesA.length; i++) {
        var row = rowsA[i];
        var col = colsA[i];
        var key = row + ":" + col;
        visited.add(key);
        operate(row, col);
    }
    var valuesB = b.getValues();
    var rowsB = b.getRows();
    var colsB = b.getCols();
    for (var i = 0; i < valuesB.length; i++) {
        var row = rowsB[i];
        var col = colsB[i];
        var key = row + ":" + col;
        if (visited.has(key))
            continue;
        operate(row, col);
    }
    var dims = [a.nRows, a.nCols];
    return new SparseMatrix(rows, cols, vals, dims);
}
function getCSR(x) {
    var entries = [];
    x.forEach(function (value, row, col) {
        entries.push({ value: value, row: row, col: col });
    });
    entries.sort(function (a, b) {
        if (a.row === b.row) {
            return a.col - b.col;
        }
        else {
            return a.row - b.row;
        }
    });
    var indices = [];
    var values = [];
    var indptr = [];
    var currentRow = -1;
    for (var i = 0; i < entries.length; i++) {
        var _a = entries[i], row = _a.row, col = _a.col, value = _a.value;
        if (row !== currentRow) {
            currentRow = row;
            indptr.push(i);
        }
        indices.push(col);
        values.push(value);
    }
    return { indices: indices, values: values, indptr: indptr };
}
exports.getCSR = getCSR;
});

var tree = createCommonjsModule(function (module, exports) {
var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (commonjsGlobal && commonjsGlobal.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils$1 = __importStar(utils);
var FlatTree = (function () {
    function FlatTree(hyperplanes, offsets, children, indices) {
        this.hyperplanes = hyperplanes;
        this.offsets = offsets;
        this.children = children;
        this.indices = indices;
    }
    return FlatTree;
}());
exports.FlatTree = FlatTree;
function makeForest(data, nNeighbors, nTrees, random) {
    var leafSize = Math.max(10, nNeighbors);
    var trees = utils$1
        .range(nTrees)
        .map(function (_, i) { return makeTree(data, leafSize, i, random); });
    var forest = trees.map(function (tree) { return flattenTree(tree, leafSize); });
    return forest;
}
exports.makeForest = makeForest;
function makeTree(data, leafSize, n, random) {
    if (leafSize === void 0) { leafSize = 30; }
    var indices = utils$1.range(data.length);
    var tree = makeEuclideanTree(data, indices, leafSize, n, random);
    return tree;
}
function makeEuclideanTree(data, indices, leafSize, q, random) {
    if (leafSize === void 0) { leafSize = 30; }
    if (indices.length > leafSize) {
        var splitResults = euclideanRandomProjectionSplit(data, indices, random);
        var indicesLeft = splitResults.indicesLeft, indicesRight = splitResults.indicesRight, hyperplane = splitResults.hyperplane, offset = splitResults.offset;
        var leftChild = makeEuclideanTree(data, indicesLeft, leafSize, q + 1, random);
        var rightChild = makeEuclideanTree(data, indicesRight, leafSize, q + 1, random);
        var node = { leftChild: leftChild, rightChild: rightChild, isLeaf: false, hyperplane: hyperplane, offset: offset };
        return node;
    }
    else {
        var node = { indices: indices, isLeaf: true };
        return node;
    }
}
function euclideanRandomProjectionSplit(data, indices, random) {
    var dim = data[0].length;
    var leftIndex = utils$1.tauRandInt(indices.length, random);
    var rightIndex = utils$1.tauRandInt(indices.length, random);
    rightIndex += leftIndex === rightIndex ? 1 : 0;
    rightIndex = rightIndex % indices.length;
    var left = indices[leftIndex];
    var right = indices[rightIndex];
    var hyperplaneOffset = 0;
    var hyperplaneVector = utils$1.zeros(dim);
    for (var i = 0; i < hyperplaneVector.length; i++) {
        hyperplaneVector[i] = data[left][i] - data[right][i];
        hyperplaneOffset -=
            (hyperplaneVector[i] * (data[left][i] + data[right][i])) / 2.0;
    }
    var nLeft = 0;
    var nRight = 0;
    var side = utils$1.zeros(indices.length);
    for (var i = 0; i < indices.length; i++) {
        var margin = hyperplaneOffset;
        for (var d = 0; d < dim; d++) {
            margin += hyperplaneVector[d] * data[indices[i]][d];
        }
        if (margin === 0) {
            side[i] = utils$1.tauRandInt(2, random);
            if (side[i] === 0) {
                nLeft += 1;
            }
            else {
                nRight += 1;
            }
        }
        else if (margin > 0) {
            side[i] = 0;
            nLeft += 1;
        }
        else {
            side[i] = 1;
            nRight += 1;
        }
    }
    var indicesLeft = utils$1.zeros(nLeft);
    var indicesRight = utils$1.zeros(nRight);
    nLeft = 0;
    nRight = 0;
    for (var i = 0; i < side.length; i++) {
        if (side[i] === 0) {
            indicesLeft[nLeft] = indices[i];
            nLeft += 1;
        }
        else {
            indicesRight[nRight] = indices[i];
            nRight += 1;
        }
    }
    return {
        indicesLeft: indicesLeft,
        indicesRight: indicesRight,
        hyperplane: hyperplaneVector,
        offset: hyperplaneOffset,
    };
}
function flattenTree(tree, leafSize) {
    var nNodes = numNodes(tree);
    var nLeaves = numLeaves(tree);
    var hyperplanes = utils$1
        .range(nNodes)
        .map(function () { return utils$1.zeros(tree.hyperplane ? tree.hyperplane.length : 0); });
    var offsets = utils$1.zeros(nNodes);
    var children = utils$1.range(nNodes).map(function () { return [-1, -1]; });
    var indices = utils$1
        .range(nLeaves)
        .map(function () { return utils$1.range(leafSize).map(function () { return -1; }); });
    recursiveFlatten(tree, hyperplanes, offsets, children, indices, 0, 0);
    return new FlatTree(hyperplanes, offsets, children, indices);
}
function recursiveFlatten(tree, hyperplanes, offsets, children, indices, nodeNum, leafNum) {
    var _a;
    if (tree.isLeaf) {
        children[nodeNum][0] = -leafNum;
        (_a = indices[leafNum]).splice.apply(_a, __spread([0, tree.indices.length], tree.indices));
        leafNum += 1;
        return { nodeNum: nodeNum, leafNum: leafNum };
    }
    else {
        hyperplanes[nodeNum] = tree.hyperplane;
        offsets[nodeNum] = tree.offset;
        children[nodeNum][0] = nodeNum + 1;
        var oldNodeNum = nodeNum;
        var res = recursiveFlatten(tree.leftChild, hyperplanes, offsets, children, indices, nodeNum + 1, leafNum);
        nodeNum = res.nodeNum;
        leafNum = res.leafNum;
        children[oldNodeNum][1] = nodeNum + 1;
        res = recursiveFlatten(tree.rightChild, hyperplanes, offsets, children, indices, nodeNum + 1, leafNum);
        return { nodeNum: res.nodeNum, leafNum: res.leafNum };
    }
}
function numNodes(tree) {
    if (tree.isLeaf) {
        return 1;
    }
    else {
        return 1 + numNodes(tree.leftChild) + numNodes(tree.rightChild);
    }
}
function numLeaves(tree) {
    if (tree.isLeaf) {
        return 1;
    }
    else {
        return numLeaves(tree.leftChild) + numLeaves(tree.rightChild);
    }
}
function makeLeafArray(rpForest) {
    var e_1, _a;
    if (rpForest.length > 0) {
        var output = [];
        try {
            for (var rpForest_1 = __values(rpForest), rpForest_1_1 = rpForest_1.next(); !rpForest_1_1.done; rpForest_1_1 = rpForest_1.next()) {
                var tree = rpForest_1_1.value;
                output.push.apply(output, __spread(tree.indices));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (rpForest_1_1 && !rpForest_1_1.done && (_a = rpForest_1.return)) _a.call(rpForest_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return output;
    }
    else {
        return [[-1]];
    }
}
exports.makeLeafArray = makeLeafArray;
function selectSide(hyperplane, offset, point, random) {
    var margin = offset;
    for (var d = 0; d < point.length; d++) {
        margin += hyperplane[d] * point[d];
    }
    if (margin === 0) {
        var side = utils$1.tauRandInt(2, random);
        return side;
    }
    else if (margin > 0) {
        return 0;
    }
    else {
        return 1;
    }
}
function searchFlatTree(point, tree, random) {
    var node = 0;
    while (tree.children[node][0] > 0) {
        var side = selectSide(tree.hyperplanes[node], tree.offsets[node], point, random);
        if (side === 0) {
            node = tree.children[node][0];
        }
        else {
            node = tree.children[node][1];
        }
    }
    var index = -1 * tree.children[node][0];
    return tree.indices[index];
}
exports.searchFlatTree = searchFlatTree;
});

var nn_descent = createCommonjsModule(function (module, exports) {
var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var heap$1 = __importStar(heap);
var matrix$1 = __importStar(matrix);
var tree$1 = __importStar(tree);
var utils$1 = __importStar(utils);
function makeNNDescent(distanceFn, random) {
    return function nNDescent(data, leafArray, nNeighbors, nIters, maxCandidates, delta, rho, rpTreeInit) {
        if (nIters === void 0) { nIters = 10; }
        if (maxCandidates === void 0) { maxCandidates = 50; }
        if (delta === void 0) { delta = 0.001; }
        if (rho === void 0) { rho = 0.5; }
        if (rpTreeInit === void 0) { rpTreeInit = true; }
        var nVertices = data.length;
        var currentGraph = heap$1.makeHeap(data.length, nNeighbors);
        for (var i = 0; i < data.length; i++) {
            var indices = heap$1.rejectionSample(nNeighbors, data.length, random);
            for (var j = 0; j < indices.length; j++) {
                var d = distanceFn(data[i], data[indices[j]]);
                heap$1.heapPush(currentGraph, i, d, indices[j], 1);
                heap$1.heapPush(currentGraph, indices[j], d, i, 1);
            }
        }
        if (rpTreeInit) {
            for (var n = 0; n < leafArray.length; n++) {
                for (var i = 0; i < leafArray[n].length; i++) {
                    if (leafArray[n][i] < 0) {
                        break;
                    }
                    for (var j = i + 1; j < leafArray[n].length; j++) {
                        if (leafArray[n][j] < 0) {
                            break;
                        }
                        var d = distanceFn(data[leafArray[n][i]], data[leafArray[n][j]]);
                        heap$1.heapPush(currentGraph, leafArray[n][i], d, leafArray[n][j], 1);
                        heap$1.heapPush(currentGraph, leafArray[n][j], d, leafArray[n][i], 1);
                    }
                }
            }
        }
        for (var n = 0; n < nIters; n++) {
            var candidateNeighbors = heap$1.buildCandidates(currentGraph, nVertices, nNeighbors, maxCandidates, random);
            var c = 0;
            for (var i = 0; i < nVertices; i++) {
                for (var j = 0; j < maxCandidates; j++) {
                    var p = Math.floor(candidateNeighbors[0][i][j]);
                    if (p < 0 || utils$1.tauRand(random) < rho) {
                        continue;
                    }
                    for (var k = 0; k < maxCandidates; k++) {
                        var q = Math.floor(candidateNeighbors[0][i][k]);
                        var cj = candidateNeighbors[2][i][j];
                        var ck = candidateNeighbors[2][i][k];
                        if (q < 0 || (!cj && !ck)) {
                            continue;
                        }
                        var d = distanceFn(data[p], data[q]);
                        c += heap$1.heapPush(currentGraph, p, d, q, 1);
                        c += heap$1.heapPush(currentGraph, q, d, p, 1);
                    }
                }
            }
            if (c <= delta * nNeighbors * data.length) {
                break;
            }
        }
        var sorted = heap$1.deheapSort(currentGraph);
        return sorted;
    };
}
exports.makeNNDescent = makeNNDescent;
function makeInitializations(distanceFn) {
    function initFromRandom(nNeighbors, data, queryPoints, _heap, random) {
        for (var i = 0; i < queryPoints.length; i++) {
            var indices = utils$1.rejectionSample(nNeighbors, data.length, random);
            for (var j = 0; j < indices.length; j++) {
                if (indices[j] < 0) {
                    continue;
                }
                var d = distanceFn(data[indices[j]], queryPoints[i]);
                heap$1.heapPush(_heap, i, d, indices[j], 1);
            }
        }
    }
    function initFromTree(_tree, data, queryPoints, _heap, random) {
        for (var i = 0; i < queryPoints.length; i++) {
            var indices = tree$1.searchFlatTree(queryPoints[i], _tree, random);
            for (var j = 0; j < indices.length; j++) {
                if (indices[j] < 0) {
                    return;
                }
                var d = distanceFn(data[indices[j]], queryPoints[i]);
                heap$1.heapPush(_heap, i, d, indices[j], 1);
            }
        }
        return;
    }
    return { initFromRandom: initFromRandom, initFromTree: initFromTree };
}
exports.makeInitializations = makeInitializations;
function makeInitializedNNSearch(distanceFn) {
    return function nnSearchFn(data, graph, initialization, queryPoints) {
        var e_1, _a;
        var _b = matrix$1.getCSR(graph), indices = _b.indices, indptr = _b.indptr;
        for (var i = 0; i < queryPoints.length; i++) {
            var tried = new Set(initialization[0][i]);
            while (true) {
                var vertex = heap$1.smallestFlagged(initialization, i);
                if (vertex === -1) {
                    break;
                }
                var candidates = indices.slice(indptr[vertex], indptr[vertex + 1]);
                try {
                    for (var candidates_1 = __values(candidates), candidates_1_1 = candidates_1.next(); !candidates_1_1.done; candidates_1_1 = candidates_1.next()) {
                        var candidate = candidates_1_1.value;
                        if (candidate === vertex ||
                            candidate === -1 ||
                            tried.has(candidate)) {
                            continue;
                        }
                        var d = distanceFn(data[candidate], queryPoints[i]);
                        heap$1.uncheckedHeapPush(initialization, i, d, candidate, 1);
                        tried.add(candidate);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (candidates_1_1 && !candidates_1_1.done && (_a = candidates_1.return)) _a.call(candidates_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        }
        return initialization;
    };
}
exports.makeInitializedNNSearch = makeInitializedNNSearch;
function initializeSearch(forest, data, queryPoints, nNeighbors, initFromRandom, initFromTree, random) {
    var e_2, _a;
    var results = heap$1.makeHeap(queryPoints.length, nNeighbors);
    initFromRandom(nNeighbors, data, queryPoints, results, random);
    if (forest) {
        try {
            for (var forest_1 = __values(forest), forest_1_1 = forest_1.next(); !forest_1_1.done; forest_1_1 = forest_1.next()) {
                var tree_1 = forest_1_1.value;
                initFromTree(tree_1, data, queryPoints, results, random);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (forest_1_1 && !forest_1_1.done && (_a = forest_1.return)) _a.call(forest_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    return results;
}
exports.initializeSearch = initializeSearch;
});

const toString = Object.prototype.toString;

function isAnyArray(object) {
  return toString.call(object).endsWith('Array]');
}

/**
 * Calculate current error
 * @ignore
 * @param {{x:Array<number>, y:Array<number>}} data - Array of points to fit in the format [x1, x2, ... ], [y1, y2, ... ]
 * @param {Array<number>} parameters - Array of current parameter values
 * @param {function} parameterizedFunction - The parameters and returns a function with the independent variable as a parameter
 * @return {number}
 */
function errorCalculation(
  data,
  parameters,
  parameterizedFunction,
) {
  let error = 0;
  const func = parameterizedFunction(parameters);

  for (let i = 0; i < data.x.length; i++) {
    error += Math.abs(data.y[i] - func(data.x[i]));
  }

  return error;
}

/**
 * Difference of the matrix function over the parameters
 * @ignore
 * @param {{x:Array<number>, y:Array<number>}} data - Array of points to fit in the format [x1, x2, ... ], [y1, y2, ... ]
 * @param {Array<number>} evaluatedData - Array of previous evaluated function values
 * @param {Array<number>} params - Array of previous parameter values
 * @param {number} gradientDifference - Adjustment for decrease the damping parameter
 * @param {function} paramFunction - The parameters and returns a function with the independent variable as a parameter
 * @return {Matrix}
 */
function gradientFunction(
  data,
  evaluatedData,
  params,
  gradientDifference,
  paramFunction,
) {
  const n = params.length;
  const m = data.x.length;

  let ans = new Array(n);

  for (let param = 0; param < n; param++) {
    ans[param] = new Array(m);
    let auxParams = params.slice();
    auxParams[param] += gradientDifference;
    let funcParam = paramFunction(auxParams);

    for (let point = 0; point < m; point++) {
      ans[param][point] = evaluatedData[point] - funcParam(data.x[point]);
    }
  }
  return new Matrix(ans);
}

/**
 * Matrix function over the samples
 * @ignore
 * @param {{x:Array<number>, y:Array<number>}} data - Array of points to fit in the format [x1, x2, ... ], [y1, y2, ... ]
 * @param {Array<number>} evaluatedData - Array of previous evaluated function values
 * @return {Matrix}
 */
function matrixFunction(data, evaluatedData) {
  const m = data.x.length;

  let ans = new Array(m);

  for (let point = 0; point < m; point++) {
    ans[point] = [data.y[point] - evaluatedData[point]];
  }

  return new Matrix(ans);
}

/**
 * Iteration for Levenberg-Marquardt
 * @ignore
 * @param {{x:Array<number>, y:Array<number>}} data - Array of points to fit in the format [x1, x2, ... ], [y1, y2, ... ]
 * @param {Array<number>} params - Array of previous parameter values
 * @param {number} damping - Levenberg-Marquardt parameter
 * @param {number} gradientDifference - Adjustment for decrease the damping parameter
 * @param {function} parameterizedFunction - The parameters and returns a function with the independent variable as a parameter
 * @return {Array<number>}
 */
function step(
  data,
  params,
  damping,
  gradientDifference,
  parameterizedFunction,
) {
  let value = damping * gradientDifference * gradientDifference;
  let identity = Matrix.eye(params.length, params.length, value);

  const func = parameterizedFunction(params);

  let evaluatedData = new Float64Array(data.x.length);
  for (let i = 0; i < data.x.length; i++) {
    evaluatedData[i] = func(data.x[i]);
  }

  let gradientFunc = gradientFunction(
    data,
    evaluatedData,
    params,
    gradientDifference,
    parameterizedFunction,
  );
  let matrixFunc = matrixFunction(data, evaluatedData);
  let inverseMatrix = inverse(
    identity.add(gradientFunc.mmul(gradientFunc.transpose())),
  );

  params = new Matrix([params]);
  params = params.sub(
    inverseMatrix
      .mmul(gradientFunc)
      .mmul(matrixFunc)
      .mul(gradientDifference)
      .transpose(),
  );

  return params.to1DArray();
}

/**
 * Curve fitting algorithm
 * @param {{x:Array<number>, y:Array<number>}} data - Array of points to fit in the format [x1, x2, ... ], [y1, y2, ... ]
 * @param {function} parameterizedFunction - The parameters and returns a function with the independent variable as a parameter
 * @param {object} [options] - Options object
 * @param {number} [options.damping] - Levenberg-Marquardt parameter
 * @param {number} [options.gradientDifference = 10e-2] - Adjustment for decrease the damping parameter
 * @param {Array<number>} [options.minValues] - Minimum allowed values for parameters
 * @param {Array<number>} [options.maxValues] - Maximum allowed values for parameters
 * @param {Array<number>} [options.initialValues] - Array of initial parameter values
 * @param {number} [options.maxIterations = 100] - Maximum of allowed iterations
 * @param {number} [options.errorTolerance = 10e-3] - Minimum uncertainty allowed for each point
 * @return {{parameterValues: Array<number>, parameterError: number, iterations: number}}
 */
function levenbergMarquardt(
  data,
  parameterizedFunction,
  options = {},
) {
  let {
    maxIterations = 100,
    gradientDifference = 10e-2,
    damping = 0,
    errorTolerance = 10e-3,
    minValues,
    maxValues,
    initialValues,
  } = options;

  if (damping <= 0) {
    throw new Error('The damping option must be a positive number');
  } else if (!data.x || !data.y) {
    throw new Error('The data parameter must have x and y elements');
  } else if (
    !isAnyArray(data.x) ||
    data.x.length < 2 ||
    !isAnyArray(data.y) ||
    data.y.length < 2
  ) {
    throw new Error(
      'The data parameter elements must be an array with more than 2 points',
    );
  } else if (data.x.length !== data.y.length) {
    throw new Error('The data parameter elements must have the same size');
  }

  let parameters =
    initialValues || new Array(parameterizedFunction.length).fill(1);
  let parLen = parameters.length;
  maxValues = maxValues || new Array(parLen).fill(Number.MAX_SAFE_INTEGER);
  minValues = minValues || new Array(parLen).fill(Number.MIN_SAFE_INTEGER);

  if (maxValues.length !== minValues.length) {
    throw new Error('minValues and maxValues must be the same size');
  }

  if (!isAnyArray(parameters)) {
    throw new Error('initialValues must be an array');
  }

  let error = errorCalculation(data, parameters, parameterizedFunction);

  let converged = error <= errorTolerance;

  let iteration;
  for (iteration = 0; iteration < maxIterations && !converged; iteration++) {
    parameters = step(
      data,
      parameters,
      damping,
      gradientDifference,
      parameterizedFunction,
    );

    for (let k = 0; k < parLen; k++) {
      parameters[k] = Math.min(
        Math.max(minValues[k], parameters[k]),
        maxValues[k],
      );
    }

    error = errorCalculation(data, parameters, parameterizedFunction);
    if (isNaN(error)) break;
    converged = error <= errorTolerance;
  }

  return {
    parameterValues: parameters,
    parameterError: error,
    iterations: iteration,
  };
}

var umap = createCommonjsModule(function (module, exports) {
var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (commonjsGlobal && commonjsGlobal.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var heap$1 = __importStar(heap);
var matrix$1 = __importStar(matrix);
var nnDescent = __importStar(nn_descent);
var tree$1 = __importStar(tree);
var utils$1 = __importStar(utils);
var ml_levenberg_marquardt_1 = __importDefault(levenbergMarquardt);
var SMOOTH_K_TOLERANCE = 1e-5;
var MIN_K_DIST_SCALE = 1e-3;
var UMAP = (function () {
    function UMAP(params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        this.learningRate = 1.0;
        this.localConnectivity = 1.0;
        this.minDist = 0.1;
        this.nComponents = 2;
        this.nEpochs = 0;
        this.nNeighbors = 15;
        this.negativeSampleRate = 5;
        this.random = Math.random;
        this.repulsionStrength = 1.0;
        this.setOpMixRatio = 1.0;
        this.spread = 1.0;
        this.transformQueueSize = 4.0;
        this.targetMetric = "categorical";
        this.targetWeight = 0.5;
        this.targetNNeighbors = this.nNeighbors;
        this.distanceFn = euclidean;
        this.isInitialized = false;
        this.rpForest = [];
        this.embedding = [];
        this.optimizationState = new OptimizationState();
        var setParam = function (key) {
            if (params[key] !== undefined)
                _this[key] = params[key];
        };
        setParam('distanceFn');
        setParam('learningRate');
        setParam('localConnectivity');
        setParam('minDist');
        setParam('nComponents');
        setParam('nEpochs');
        setParam('nNeighbors');
        setParam('negativeSampleRate');
        setParam('random');
        setParam('repulsionStrength');
        setParam('setOpMixRatio');
        setParam('spread');
        setParam('transformQueueSize');
    }
    UMAP.prototype.fit = function (X) {
        this.initializeFit(X);
        this.optimizeLayout();
        return this.embedding;
    };
    UMAP.prototype.fitAsync = function (X, callback) {
        if (callback === void 0) { callback = function () { return true; }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.initializeFit(X);
                        return [4, this.optimizeLayoutAsync(callback)];
                    case 1:
                        _a.sent();
                        return [2, this.embedding];
                }
            });
        });
    };
    UMAP.prototype.setSupervisedProjection = function (Y, params) {
        if (params === void 0) { params = {}; }
        this.Y = Y;
        this.targetMetric = params.targetMetric || this.targetMetric;
        this.targetWeight = params.targetWeight || this.targetWeight;
        this.targetNNeighbors = params.targetNNeighbors || this.targetNNeighbors;
    };
    UMAP.prototype.setPrecomputedKNN = function (knnIndices, knnDistances) {
        this.knnIndices = knnIndices;
        this.knnDistances = knnDistances;
    };
    UMAP.prototype.initializeFit = function (X) {
        if (X.length <= this.nNeighbors) {
            throw new Error("Not enough data points (" + X.length + ") to create nNeighbors: " + this.nNeighbors + ".  Add more data points or adjust the configuration.");
        }
        if (this.X === X && this.isInitialized) {
            return this.getNEpochs();
        }
        this.X = X;
        if (!this.knnIndices && !this.knnDistances) {
            var knnResults = this.nearestNeighbors(X);
            this.knnIndices = knnResults.knnIndices;
            this.knnDistances = knnResults.knnDistances;
        }
        this.graph = this.fuzzySimplicialSet(X, this.nNeighbors, this.setOpMixRatio);
        this.makeSearchFns();
        this.searchGraph = this.makeSearchGraph(X);
        this.processGraphForSupervisedProjection();
        var _a = this.initializeSimplicialSetEmbedding(), head = _a.head, tail = _a.tail, epochsPerSample = _a.epochsPerSample;
        this.optimizationState.head = head;
        this.optimizationState.tail = tail;
        this.optimizationState.epochsPerSample = epochsPerSample;
        this.initializeOptimization();
        this.prepareForOptimizationLoop();
        this.isInitialized = true;
        return this.getNEpochs();
    };
    UMAP.prototype.makeSearchFns = function () {
        var _a = nnDescent.makeInitializations(this.distanceFn), initFromTree = _a.initFromTree, initFromRandom = _a.initFromRandom;
        this.initFromTree = initFromTree;
        this.initFromRandom = initFromRandom;
        this.search = nnDescent.makeInitializedNNSearch(this.distanceFn);
    };
    UMAP.prototype.makeSearchGraph = function (X) {
        var knnIndices = this.knnIndices;
        var knnDistances = this.knnDistances;
        var dims = [X.length, X.length];
        var searchGraph = new matrix$1.SparseMatrix([], [], [], dims);
        for (var i = 0; i < knnIndices.length; i++) {
            var knn = knnIndices[i];
            var distances = knnDistances[i];
            for (var j = 0; j < knn.length; j++) {
                var neighbor = knn[j];
                var distance = distances[j];
                if (distance > 0) {
                    searchGraph.set(i, neighbor, distance);
                }
            }
        }
        var transpose = matrix$1.transpose(searchGraph);
        return matrix$1.maximum(searchGraph, transpose);
    };
    UMAP.prototype.transform = function (toTransform) {
        var _this = this;
        var rawData = this.X;
        if (rawData === undefined || rawData.length === 0) {
            throw new Error('No data has been fit.');
        }
        var nNeighbors = Math.floor(this.nNeighbors * this.transformQueueSize);
        nNeighbors = Math.min(rawData.length, nNeighbors);
        var init = nnDescent.initializeSearch(this.rpForest, rawData, toTransform, nNeighbors, this.initFromRandom, this.initFromTree, this.random);
        var result = this.search(rawData, this.searchGraph, init, toTransform);
        var _a = heap$1.deheapSort(result), indices = _a.indices, distances = _a.weights;
        indices = indices.map(function (x) { return x.slice(0, _this.nNeighbors); });
        distances = distances.map(function (x) { return x.slice(0, _this.nNeighbors); });
        var adjustedLocalConnectivity = Math.max(0, this.localConnectivity - 1);
        var _b = this.smoothKNNDistance(distances, this.nNeighbors, adjustedLocalConnectivity), sigmas = _b.sigmas, rhos = _b.rhos;
        var _c = this.computeMembershipStrengths(indices, distances, sigmas, rhos), rows = _c.rows, cols = _c.cols, vals = _c.vals;
        var size = [toTransform.length, rawData.length];
        var graph = new matrix$1.SparseMatrix(rows, cols, vals, size);
        var normed = matrix$1.normalize(graph, "l1");
        var csrMatrix = matrix$1.getCSR(normed);
        var nPoints = toTransform.length;
        var eIndices = utils$1.reshape2d(csrMatrix.indices, nPoints, this.nNeighbors);
        var eWeights = utils$1.reshape2d(csrMatrix.values, nPoints, this.nNeighbors);
        var embedding = initTransform(eIndices, eWeights, this.embedding);
        var nEpochs = this.nEpochs
            ? this.nEpochs / 3
            : graph.nRows <= 10000
                ? 100
                : 30;
        var graphMax = graph
            .getValues()
            .reduce(function (max, val) { return (val > max ? val : max); }, 0);
        graph = graph.map(function (value) { return (value < graphMax / nEpochs ? 0 : value); });
        graph = matrix$1.eliminateZeros(graph);
        var epochsPerSample = this.makeEpochsPerSample(graph.getValues(), nEpochs);
        var head = graph.getRows();
        var tail = graph.getCols();
        this.assignOptimizationStateParameters({
            headEmbedding: embedding,
            tailEmbedding: this.embedding,
            head: head,
            tail: tail,
            currentEpoch: 0,
            nEpochs: nEpochs,
            nVertices: graph.getDims()[1],
            epochsPerSample: epochsPerSample,
        });
        this.prepareForOptimizationLoop();
        return this.optimizeLayout();
    };
    UMAP.prototype.processGraphForSupervisedProjection = function () {
        var _a = this, Y = _a.Y, X = _a.X;
        if (Y) {
            if (Y.length !== X.length) {
                throw new Error('Length of X and y must be equal');
            }
            if (this.targetMetric === "categorical") {
                var lt = this.targetWeight < 1.0;
                var farDist = lt ? 2.5 * (1.0 / (1.0 - this.targetWeight)) : 1.0e12;
                this.graph = this.categoricalSimplicialSetIntersection(this.graph, Y, farDist);
            }
        }
    };
    UMAP.prototype.step = function () {
        var currentEpoch = this.optimizationState.currentEpoch;
        if (currentEpoch < this.getNEpochs()) {
            this.optimizeLayoutStep(currentEpoch);
        }
        return this.optimizationState.currentEpoch;
    };
    UMAP.prototype.getEmbedding = function () {
        return this.embedding;
    };
    UMAP.prototype.nearestNeighbors = function (X) {
        var _a = this, distanceFn = _a.distanceFn, nNeighbors = _a.nNeighbors;
        var log2 = function (n) { return Math.log(n) / Math.log(2); };
        var metricNNDescent = nnDescent.makeNNDescent(distanceFn, this.random);
        var round = function (n) {
            return n === 0.5 ? 0 : Math.round(n);
        };
        var nTrees = 5 + Math.floor(round(Math.pow(X.length, 0.5) / 20.0));
        var nIters = Math.max(5, Math.floor(Math.round(log2(X.length))));
        this.rpForest = tree$1.makeForest(X, nNeighbors, nTrees, this.random);
        var leafArray = tree$1.makeLeafArray(this.rpForest);
        var _b = metricNNDescent(X, leafArray, nNeighbors, nIters), indices = _b.indices, weights = _b.weights;
        return { knnIndices: indices, knnDistances: weights };
    };
    UMAP.prototype.fuzzySimplicialSet = function (X, nNeighbors, setOpMixRatio) {
        if (setOpMixRatio === void 0) { setOpMixRatio = 1.0; }
        var _a = this, _b = _a.knnIndices, knnIndices = _b === void 0 ? [] : _b, _c = _a.knnDistances, knnDistances = _c === void 0 ? [] : _c, localConnectivity = _a.localConnectivity;
        var _d = this.smoothKNNDistance(knnDistances, nNeighbors, localConnectivity), sigmas = _d.sigmas, rhos = _d.rhos;
        var _e = this.computeMembershipStrengths(knnIndices, knnDistances, sigmas, rhos), rows = _e.rows, cols = _e.cols, vals = _e.vals;
        var size = [X.length, X.length];
        var sparseMatrix = new matrix$1.SparseMatrix(rows, cols, vals, size);
        var transpose = matrix$1.transpose(sparseMatrix);
        var prodMatrix = matrix$1.pairwiseMultiply(sparseMatrix, transpose);
        var a = matrix$1.subtract(matrix$1.add(sparseMatrix, transpose), prodMatrix);
        var b = matrix$1.multiplyScalar(a, setOpMixRatio);
        var c = matrix$1.multiplyScalar(prodMatrix, 1.0 - setOpMixRatio);
        var result = matrix$1.add(b, c);
        return result;
    };
    UMAP.prototype.categoricalSimplicialSetIntersection = function (simplicialSet, target, farDist, unknownDist) {
        if (unknownDist === void 0) { unknownDist = 1.0; }
        var intersection = fastIntersection(simplicialSet, target, unknownDist, farDist);
        intersection = matrix$1.eliminateZeros(intersection);
        return resetLocalConnectivity(intersection);
    };
    UMAP.prototype.smoothKNNDistance = function (distances, k, localConnectivity, nIter, bandwidth) {
        if (localConnectivity === void 0) { localConnectivity = 1.0; }
        if (nIter === void 0) { nIter = 64; }
        if (bandwidth === void 0) { bandwidth = 1.0; }
        var target = (Math.log(k) / Math.log(2)) * bandwidth;
        var rho = utils$1.zeros(distances.length);
        var result = utils$1.zeros(distances.length);
        for (var i = 0; i < distances.length; i++) {
            var lo = 0.0;
            var hi = Infinity;
            var mid = 1.0;
            var ithDistances = distances[i];
            var nonZeroDists = ithDistances.filter(function (d) { return d > 0.0; });
            if (nonZeroDists.length >= localConnectivity) {
                var index = Math.floor(localConnectivity);
                var interpolation = localConnectivity - index;
                if (index > 0) {
                    rho[i] = nonZeroDists[index - 1];
                    if (interpolation > SMOOTH_K_TOLERANCE) {
                        rho[i] +=
                            interpolation * (nonZeroDists[index] - nonZeroDists[index - 1]);
                    }
                }
                else {
                    rho[i] = interpolation * nonZeroDists[0];
                }
            }
            else if (nonZeroDists.length > 0) {
                rho[i] = utils$1.max(nonZeroDists);
            }
            for (var n = 0; n < nIter; n++) {
                var psum = 0.0;
                for (var j = 1; j < distances[i].length; j++) {
                    var d = distances[i][j] - rho[i];
                    if (d > 0) {
                        psum += Math.exp(-(d / mid));
                    }
                    else {
                        psum += 1.0;
                    }
                }
                if (Math.abs(psum - target) < SMOOTH_K_TOLERANCE) {
                    break;
                }
                if (psum > target) {
                    hi = mid;
                    mid = (lo + hi) / 2.0;
                }
                else {
                    lo = mid;
                    if (hi === Infinity) {
                        mid *= 2;
                    }
                    else {
                        mid = (lo + hi) / 2.0;
                    }
                }
            }
            result[i] = mid;
            if (rho[i] > 0.0) {
                var meanIthDistances = utils$1.mean(ithDistances);
                if (result[i] < MIN_K_DIST_SCALE * meanIthDistances) {
                    result[i] = MIN_K_DIST_SCALE * meanIthDistances;
                }
            }
            else {
                var meanDistances = utils$1.mean(distances.map(utils$1.mean));
                if (result[i] < MIN_K_DIST_SCALE * meanDistances) {
                    result[i] = MIN_K_DIST_SCALE * meanDistances;
                }
            }
        }
        return { sigmas: result, rhos: rho };
    };
    UMAP.prototype.computeMembershipStrengths = function (knnIndices, knnDistances, sigmas, rhos) {
        var nSamples = knnIndices.length;
        var nNeighbors = knnIndices[0].length;
        var rows = utils$1.zeros(nSamples * nNeighbors);
        var cols = utils$1.zeros(nSamples * nNeighbors);
        var vals = utils$1.zeros(nSamples * nNeighbors);
        for (var i = 0; i < nSamples; i++) {
            for (var j = 0; j < nNeighbors; j++) {
                var val = 0;
                if (knnIndices[i][j] === -1) {
                    continue;
                }
                if (knnIndices[i][j] === i) {
                    val = 0.0;
                }
                else if (knnDistances[i][j] - rhos[i] <= 0.0) {
                    val = 1.0;
                }
                else {
                    val = Math.exp(-((knnDistances[i][j] - rhos[i]) / sigmas[i]));
                }
                rows[i * nNeighbors + j] = i;
                cols[i * nNeighbors + j] = knnIndices[i][j];
                vals[i * nNeighbors + j] = val;
            }
        }
        return { rows: rows, cols: cols, vals: vals };
    };
    UMAP.prototype.initializeSimplicialSetEmbedding = function () {
        var _this = this;
        var nEpochs = this.getNEpochs();
        var nComponents = this.nComponents;
        var graphValues = this.graph.getValues();
        var graphMax = 0;
        for (var i = 0; i < graphValues.length; i++) {
            var value = graphValues[i];
            if (graphMax < graphValues[i]) {
                graphMax = value;
            }
        }
        var graph = this.graph.map(function (value) {
            if (value < graphMax / nEpochs) {
                return 0;
            }
            else {
                return value;
            }
        });
        this.embedding = utils$1.zeros(graph.nRows).map(function () {
            return utils$1.zeros(nComponents).map(function () {
                return utils$1.tauRand(_this.random) * 20 + -10;
            });
        });
        var weights = [];
        var head = [];
        var tail = [];
        var rowColValues = graph.getAll();
        for (var i = 0; i < rowColValues.length; i++) {
            var entry = rowColValues[i];
            if (entry.value) {
                weights.push(entry.value);
                tail.push(entry.row);
                head.push(entry.col);
            }
        }
        var epochsPerSample = this.makeEpochsPerSample(weights, nEpochs);
        return { head: head, tail: tail, epochsPerSample: epochsPerSample };
    };
    UMAP.prototype.makeEpochsPerSample = function (weights, nEpochs) {
        var result = utils$1.filled(weights.length, -1.0);
        var max = utils$1.max(weights);
        var nSamples = weights.map(function (w) { return (w / max) * nEpochs; });
        nSamples.forEach(function (n, i) {
            if (n > 0)
                result[i] = nEpochs / nSamples[i];
        });
        return result;
    };
    UMAP.prototype.assignOptimizationStateParameters = function (state) {
        Object.assign(this.optimizationState, state);
    };
    UMAP.prototype.prepareForOptimizationLoop = function () {
        var _a = this, repulsionStrength = _a.repulsionStrength, learningRate = _a.learningRate, negativeSampleRate = _a.negativeSampleRate;
        var _b = this.optimizationState, epochsPerSample = _b.epochsPerSample, headEmbedding = _b.headEmbedding, tailEmbedding = _b.tailEmbedding;
        var dim = headEmbedding[0].length;
        var moveOther = headEmbedding.length === tailEmbedding.length;
        var epochsPerNegativeSample = epochsPerSample.map(function (e) { return e / negativeSampleRate; });
        var epochOfNextNegativeSample = __spread(epochsPerNegativeSample);
        var epochOfNextSample = __spread(epochsPerSample);
        this.assignOptimizationStateParameters({
            epochOfNextSample: epochOfNextSample,
            epochOfNextNegativeSample: epochOfNextNegativeSample,
            epochsPerNegativeSample: epochsPerNegativeSample,
            moveOther: moveOther,
            initialAlpha: learningRate,
            alpha: learningRate,
            gamma: repulsionStrength,
            dim: dim,
        });
    };
    UMAP.prototype.initializeOptimization = function () {
        var headEmbedding = this.embedding;
        var tailEmbedding = this.embedding;
        var _a = this.optimizationState, head = _a.head, tail = _a.tail, epochsPerSample = _a.epochsPerSample;
        var nEpochs = this.getNEpochs();
        var nVertices = this.graph.nCols;
        var _b = findABParams(this.spread, this.minDist), a = _b.a, b = _b.b;
        this.assignOptimizationStateParameters({
            headEmbedding: headEmbedding,
            tailEmbedding: tailEmbedding,
            head: head,
            tail: tail,
            epochsPerSample: epochsPerSample,
            a: a,
            b: b,
            nEpochs: nEpochs,
            nVertices: nVertices,
        });
    };
    UMAP.prototype.optimizeLayoutStep = function (n) {
        var optimizationState = this.optimizationState;
        var head = optimizationState.head, tail = optimizationState.tail, headEmbedding = optimizationState.headEmbedding, tailEmbedding = optimizationState.tailEmbedding, epochsPerSample = optimizationState.epochsPerSample, epochOfNextSample = optimizationState.epochOfNextSample, epochOfNextNegativeSample = optimizationState.epochOfNextNegativeSample, epochsPerNegativeSample = optimizationState.epochsPerNegativeSample, moveOther = optimizationState.moveOther, initialAlpha = optimizationState.initialAlpha, alpha = optimizationState.alpha, gamma = optimizationState.gamma, a = optimizationState.a, b = optimizationState.b, dim = optimizationState.dim, nEpochs = optimizationState.nEpochs, nVertices = optimizationState.nVertices;
        var clipValue = 4.0;
        for (var i = 0; i < epochsPerSample.length; i++) {
            if (epochOfNextSample[i] > n) {
                continue;
            }
            var j = head[i];
            var k = tail[i];
            var current = headEmbedding[j];
            var other = tailEmbedding[k];
            var distSquared = rDist(current, other);
            var gradCoeff = 0;
            if (distSquared > 0) {
                gradCoeff = -2.0 * a * b * Math.pow(distSquared, b - 1.0);
                gradCoeff /= a * Math.pow(distSquared, b) + 1.0;
            }
            for (var d = 0; d < dim; d++) {
                var gradD = clip(gradCoeff * (current[d] - other[d]), clipValue);
                current[d] += gradD * alpha;
                if (moveOther) {
                    other[d] += -gradD * alpha;
                }
            }
            epochOfNextSample[i] += epochsPerSample[i];
            var nNegSamples = Math.floor((n - epochOfNextNegativeSample[i]) / epochsPerNegativeSample[i]);
            for (var p = 0; p < nNegSamples; p++) {
                var k_1 = utils$1.tauRandInt(nVertices, this.random);
                var other_1 = tailEmbedding[k_1];
                var distSquared_1 = rDist(current, other_1);
                var gradCoeff_1 = 0.0;
                if (distSquared_1 > 0.0) {
                    gradCoeff_1 = 2.0 * gamma * b;
                    gradCoeff_1 /=
                        (0.001 + distSquared_1) * (a * Math.pow(distSquared_1, b) + 1);
                }
                else if (j === k_1) {
                    continue;
                }
                for (var d = 0; d < dim; d++) {
                    var gradD = 4.0;
                    if (gradCoeff_1 > 0.0) {
                        gradD = clip(gradCoeff_1 * (current[d] - other_1[d]), clipValue);
                    }
                    current[d] += gradD * alpha;
                }
            }
            epochOfNextNegativeSample[i] += nNegSamples * epochsPerNegativeSample[i];
        }
        optimizationState.alpha = initialAlpha * (1.0 - n / nEpochs);
        optimizationState.currentEpoch += 1;
        return headEmbedding;
    };
    UMAP.prototype.optimizeLayoutAsync = function (epochCallback) {
        var _this = this;
        if (epochCallback === void 0) { epochCallback = function () { return true; }; }
        return new Promise(function (resolve, reject) {
            var step = function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, nEpochs, currentEpoch, epochCompleted, shouldStop, isFinished;
                return __generator(this, function (_b) {
                    try {
                        _a = this.optimizationState, nEpochs = _a.nEpochs, currentEpoch = _a.currentEpoch;
                        this.embedding = this.optimizeLayoutStep(currentEpoch);
                        epochCompleted = this.optimizationState.currentEpoch;
                        shouldStop = epochCallback(epochCompleted) === false;
                        isFinished = epochCompleted === nEpochs;
                        if (!shouldStop && !isFinished) {
                            setTimeout(function () { return step(); }, 0);
                        }
                        else {
                            return [2, resolve(isFinished)];
                        }
                    }
                    catch (err) {
                        reject(err);
                    }
                    return [2];
                });
            }); };
            setTimeout(function () { return step(); }, 0);
        });
    };
    UMAP.prototype.optimizeLayout = function (epochCallback) {
        if (epochCallback === void 0) { epochCallback = function () { return true; }; }
        var isFinished = false;
        var embedding = [];
        while (!isFinished) {
            var _a = this.optimizationState, nEpochs = _a.nEpochs, currentEpoch = _a.currentEpoch;
            embedding = this.optimizeLayoutStep(currentEpoch);
            var epochCompleted = this.optimizationState.currentEpoch;
            var shouldStop = epochCallback(epochCompleted) === false;
            isFinished = epochCompleted === nEpochs || shouldStop;
        }
        return embedding;
    };
    UMAP.prototype.getNEpochs = function () {
        var graph = this.graph;
        if (this.nEpochs > 0) {
            return this.nEpochs;
        }
        var length = graph.nRows;
        if (length <= 2500) {
            return 500;
        }
        else if (length <= 5000) {
            return 400;
        }
        else if (length <= 7500) {
            return 300;
        }
        else {
            return 200;
        }
    };
    return UMAP;
}());
exports.UMAP = UMAP;
function euclidean(x, y) {
    var result = 0;
    for (var i = 0; i < x.length; i++) {
        result += Math.pow((x[i] - y[i]), 2);
    }
    return Math.sqrt(result);
}
exports.euclidean = euclidean;
function cosine(x, y) {
    var result = 0.0;
    var normX = 0.0;
    var normY = 0.0;
    for (var i = 0; i < x.length; i++) {
        result += x[i] * y[i];
        normX += Math.pow(x[i], 2);
        normY += Math.pow(y[i], 2);
    }
    if (normX === 0 && normY === 0) {
        return 0;
    }
    else if (normX === 0 || normY === 0) {
        return 1.0;
    }
    else {
        return 1.0 - result / Math.sqrt(normX * normY);
    }
}
exports.cosine = cosine;
var OptimizationState = (function () {
    function OptimizationState() {
        this.currentEpoch = 0;
        this.headEmbedding = [];
        this.tailEmbedding = [];
        this.head = [];
        this.tail = [];
        this.epochsPerSample = [];
        this.epochOfNextSample = [];
        this.epochOfNextNegativeSample = [];
        this.epochsPerNegativeSample = [];
        this.moveOther = true;
        this.initialAlpha = 1.0;
        this.alpha = 1.0;
        this.gamma = 1.0;
        this.a = 1.5769434603113077;
        this.b = 0.8950608779109733;
        this.dim = 2;
        this.nEpochs = 500;
        this.nVertices = 0;
    }
    return OptimizationState;
}());
function clip(x, clipValue) {
    if (x > clipValue)
        return clipValue;
    else if (x < -clipValue)
        return -clipValue;
    else
        return x;
}
function rDist(x, y) {
    var result = 0.0;
    for (var i = 0; i < x.length; i++) {
        result += Math.pow(x[i] - y[i], 2);
    }
    return result;
}
function findABParams(spread, minDist) {
    var curve = function (_a) {
        var _b = __read(_a, 2), a = _b[0], b = _b[1];
        return function (x) {
            return 1.0 / (1.0 + a * Math.pow(x, (2 * b)));
        };
    };
    var xv = utils$1
        .linear(0, spread * 3, 300)
        .map(function (val) { return (val < minDist ? 1.0 : val); });
    var yv = utils$1.zeros(xv.length).map(function (val, index) {
        var gte = xv[index] >= minDist;
        return gte ? Math.exp(-(xv[index] - minDist) / spread) : val;
    });
    var initialValues = [0.5, 0.5];
    var data = { x: xv, y: yv };
    var options = {
        damping: 1.5,
        initialValues: initialValues,
        gradientDifference: 10e-2,
        maxIterations: 100,
        errorTolerance: 10e-3,
    };
    var parameterValues = ml_levenberg_marquardt_1.default(data, curve, options).parameterValues;
    var _a = __read(parameterValues, 2), a = _a[0], b = _a[1];
    return { a: a, b: b };
}
exports.findABParams = findABParams;
function fastIntersection(graph, target, unknownDist, farDist) {
    if (unknownDist === void 0) { unknownDist = 1.0; }
    if (farDist === void 0) { farDist = 5.0; }
    return graph.map(function (value, row, col) {
        if (target[row] === -1 || target[col] === -1) {
            return value * Math.exp(-unknownDist);
        }
        else if (target[row] !== target[col]) {
            return value * Math.exp(-farDist);
        }
        else {
            return value;
        }
    });
}
exports.fastIntersection = fastIntersection;
function resetLocalConnectivity(simplicialSet) {
    simplicialSet = matrix$1.normalize(simplicialSet, "max");
    var transpose = matrix$1.transpose(simplicialSet);
    var prodMatrix = matrix$1.pairwiseMultiply(transpose, simplicialSet);
    simplicialSet = matrix$1.add(simplicialSet, matrix$1.subtract(transpose, prodMatrix));
    return matrix$1.eliminateZeros(simplicialSet);
}
exports.resetLocalConnectivity = resetLocalConnectivity;
function initTransform(indices, weights, embedding) {
    var result = utils$1
        .zeros(indices.length)
        .map(function (z) { return utils$1.zeros(embedding[0].length); });
    for (var i = 0; i < indices.length; i++) {
        for (var j = 0; j < indices[0].length; j++) {
            for (var d = 0; d < embedding[0].length; d++) {
                var a = indices[i][j];
                result[i][d] += weights[i][j] * embedding[a][d];
            }
        }
    }
    return result;
}
exports.initTransform = initTransform;
});

var dist = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

exports.UMAP = umap.UMAP;
});

var UMAP = dist.UMAP;
export { UMAP };
