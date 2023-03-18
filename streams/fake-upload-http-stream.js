import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 0

  _read() {
    const i = this.index += 1

    setTimeout(() => {
      if (i > 10) {
        this.push(null)
      } else {
        const buffer = Buffer.from(String(i))
        this.push(buffer)
      }
    }, 500)
  }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half'
}).then(response => {
  return response.text()
}).then(data => { console.log(data); })