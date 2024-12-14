const linkGenerator:(len:number)=>string = (len:number)=>{
    const hash = "abcdefghijklmnopqrstuvwxyz0123456789";
    let ans:string = "";
    for(let i = 0;i<len;i++){
        ans += hash[Math.floor(Math.random()*hash.length)];
    }
    return ans;
}

export default linkGenerator;