import { Readable, Transform, Writable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 0

  _read() {
    const i = this.index += 1

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buffer = Buffer.from(String(i))
        this.push(buffer)
      }
    }, 1000)
  }
}

class MultplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {

    console.log(Number(String(chunk)) * 10);
    callback()
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(String(chunk)) * -1

    callback(null, Buffer.from(String(transformed)))
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultplyByTenStream())