/* STAR BACKGROUND */

const stars=document.getElementById("stars")

for(let i=0;i<200;i++){
let s=document.createElement("div")
s.className="star"
s.style.left=Math.random()*100+"%"
s.style.top=Math.random()*100+"%"
s.style.animationDuration=(Math.random()*3+1)+"s"
stars.appendChild(s)
}

/* WORKING HOSTS */

let working=[]

/* GENERATOR */

function generateHosts(){

let domains=[
"cloudflare.com",
"amazonaws.com",
"google.com",
"microsoft.com",
"akamai.net",
"facebook.com",
"whatsapp.com",
"youtube.com"
]

let prefixes=[
"cdn",
"static",
"media",
"img",
"edge",
"api",
"cache",
"connect",
"server",
"gateway"
]

let generated=[]

for(let i=0;i<15;i++){

let p=prefixes[Math.floor(Math.random()*prefixes.length)]
let d=domains[Math.floor(Math.random()*domains.length)]

generated.push(p+"."+d)

}

document.getElementById("generated").value=generated.join("\n")

}

/* CHECK HOST */

async function checkHost(){

const host=document.getElementById("checkHost").value.trim()
const results=document.getElementById("results")
const bar=document.getElementById("bar")

if(!host){
alert("Enter host")
return
}

results.innerHTML="Checking "+host+"..."

try{

const start=Date.now()

await fetch("https://"+host,{mode:"no-cors"})

const latency=Date.now()-start

let speed="slow🐌"

if(latency<200) speed="fast🐆"
else if(latency<500) speed="medium🦡"

results.innerHTML=host+" <span class='online'>ONLINE🟢</span> ("+latency+"ms) "+speed.toUpperCase()

working.push(host)

bar.style.width="100%"

}catch{

results.innerHTML=host+" <span class='offline'>OFFLINE🔴</span>"

bar.style.width="0%"

}

}

/* COPY */

function copyHosts(){

if(working.length==0){
alert("No working hosts")
return
}

navigator.clipboard.writeText(working.join("\n"))
alert("Copied!")

}

/* DOWNLOAD */

function downloadHosts(){

let blob=new Blob([working.join("\n")],{type:"text/plain"})
let a=document.createElement("a")

a.href=URL.createObjectURL(blob)
a.download="thugkeed_sni_hosts.txt"

a.click()

}