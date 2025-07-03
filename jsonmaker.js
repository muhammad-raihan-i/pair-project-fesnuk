let fs=require("fs").promises
function jsonMaker(text){
    let result="["
    let myArray=text.split("\n")
    let myArray2=[]
    myArray.forEach(e=>{
        if(e){
            myArray2.push(e)
        }
    })
    myArray2=myArray2.map(e=>e.split(","))
    let head=myArray2[0]
    let varName=[]
    let type=[]
    head=head.map((e)=>
        e.split(":")
    )
    head.forEach(e=>{varName.push(e[0])})
    head.forEach(e=>{type.push(e[1])})
    for(let i=1;i<myArray2.length;i++){
        let newRow=`
    {\n`
        let row=myArray2[i]
        newRow+=`       "id":${i},\n`
        for(let j=0;j<row.length-1;j++){
            switch(type[j]){
                case "number":
                    newRow+=`       "${varName[j]}":${row[j]},\n`
                    break
                default:
                    newRow+=`       "${varName[j]}":"${row[j]}",\n`
                    break
            }
        }
        switch(type[type.length-1]){
            case "number":
                newRow+=`       "${varName[varName.length-1]}":${row[row.length-1]}\n`
                break
            default:
                newRow+=`       "${varName[varName.length-1]}":"${row[row.length-1]}"\n`
                break
        }
        if(i===myArray2.length-1){
            result+=newRow+`
    }`
        }else{
            result+=newRow+`
    },` 
        }
      
    }
    result+=`
]`
    return result
}
// npx sequelize model:create --name User --attributes username:string,email:string,password:string

let text1=`
username:string,email:string,password:string
Admin,admin@example.com,
UserDummy,dummy@gmail.com,
UserSerSer,aduh@yahoo.com,
ngakngok,xyz@yandex.ru,
`
// npx sequelize model:create --name Profile
// --attributes phoneNumber:string,dateOfBirth:date,name:string,
// profilePicUrl:string,bio:string,UserId:number
let text2=`
phoneNumber:string,dateOfBirth:date,name:string,profilePicUrl:string,bio:string,UserId:number
088812345678,2000-01-01,adm1n,https://hdstockimages.com/blog/steps-to-create-a-100x100-pixel-image/,Krungthepmahanakhon Amonrattanakosin Mahintharayutthaya Mahadilokphop Noppharatratchathaniburirom Udomratchaniwetmahasathan Amonphimanawatansathit Sakkathattiyawitsanukamprasit,1
0123456789,2000-02-02,dummy,https://hdstockimages.com/blog/steps-to-create-a-100x100-pixel-image/,lorem ipsum dolor sit amet adipiscing elit,2
0000000000,2000-03-03,ser,https://hdstockimages.com/blog/steps-to-create-a-100x100-pixel-image/,ini dia si jali jali lagunya enak lagunya enak merdu sekali capek sedikit tidak peduli sayang asalkan tuan senang di hati,3
3141592653589792,2000-04-04,ngakngekngikngoknguk,https://hdstockimages.com/blog/steps-to-create-a-100x100-pixel-image/,Watashi no na wa Kira Yoshikage   Nenre san-juu-san sai   Jitaku wa Morioh-cho hokuto bu no bessou chitai ni ari  kekkon wa shiteinai.,4
`
// npx sequelize model:create --name Post --attributes content:string,image:string,UserId:number
let text3=`content:string,image:string,UserId:number
agerifugheiwufhiuaewhfriuhewautfgeruytfgesruyafghtberuasyftghesukfts,https://www.wallpaperhub.app/_next/image?url=https%3A%2F%2Fcdn.wallpaperhub.app%2Fcloudcache%2Fe%2F6%2F7%2F3%2F1%2F4%2Fe6731493cd50103e3561288c33a6a589c9bf67ab.jpg&w=750&q=75,1
test2,https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2@1.5x.png,1
post3,https://upload.wikimedia.org/wikipedia/commons/7/79/Docker_%28container_engine%29_logo.png,2`
// npx sequelize model:create --name Tag --attributes tagName:string
let text4=`
tagName:string
polosan
oplosan`
// npx sequelize model:create --name PostTag --attributes TagId:number,PostId:number
let text5=`
TagId:number,PostId:number
1,1
2,1
1,2
1,3`

async function create(title,content){
    try{
        await fs.writeFile(title,content)
    }catch(error){
        console.log(error)
    }
}
console.log("json 1")
console.log(jsonMaker(text1))
console.log("json 2")
console.log(jsonMaker(text2))
console.log("json 3")
console.log(jsonMaker(text3))
console.log("json 4")
console.log(jsonMaker(text4))
console.log("json 5")
console.log(jsonMaker(text5))