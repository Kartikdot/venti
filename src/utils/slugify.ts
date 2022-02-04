
export function slugify(data:string):string{
    data = data.toLowerCase()
    let slugarr = []
    const randomSuffix:Number = Math.floor(Math.random()*90000) + 10000
    let k = 0;
    const lenght = Math.max(20, data.length)
    for(let i=0;i<20;i++){
        if(data.charAt(i)>'a' && data.charAt(i)<'z'){
            slugarr.push(data.charAt(i))
        }
        else{
            slugarr.push('-')
        }
    }
    slugarr.push(randomSuffix)
    return slugarr.join('')
}