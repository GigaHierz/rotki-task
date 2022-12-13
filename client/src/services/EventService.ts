import { client } from '../../utils/client'

export default {
  async getEvents () {
    let result

    await client('events').then(data => {
      console.log(data)

      result = data.result
    })

    console.log(result)
    return result
  }
}
