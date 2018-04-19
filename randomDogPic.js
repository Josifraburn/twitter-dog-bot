const fs = require('fs');
const fetch = require('node-fetch')


const randomDogPic = async () => {
    const dogPic = await fetch('https://dog.ceo/api/breeds/image/random')
    const result = await dogPic.json()
    const dogImage = await fetch(result.message)
    let data = [];

    const buffer = await dogImage.buffer();
    fs.writeFileSync('dogTemp.jpg', buffer.toString('base64'))

    return buffer.toString('base64')

    // dogImage.body
        // .on('data', (chunk) => {
        //     data.push(chunk)
        // })
        // .on('finish', () => {
        //    let base64 = Buffer.from(data)
        //    console.log(base64)
        //    fs.writeFileSync('dogTemp.jpg', base64)
        // })

        
    // dogImage.body
    // .pipe(base64.encode())
    // .pipe(imageStream)
    // return result.message
}

module.exports = randomDogPic;