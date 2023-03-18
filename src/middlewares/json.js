export async function json(request, response) {
  const buffers = []

  for await (const chunk of request) {
    buffers.push(chunk)
  }

  try {
    request.body = JSON.parse( String( Buffer.from(buffers[0]) ) )
  } catch (err) {
    console.error(err)
    request.body = null
  }

  response.setHeader('Content-type', 'application/json')
}