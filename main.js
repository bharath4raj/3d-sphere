import * as THREE from 'three'
import "./style.css"
import {OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import gsap from 'gsap';


// console.log(THREE);
console.log(gsap);
//Scene
const scene = new THREE.Scene();

//Create our sphere
const geometry = new THREE.SphereGeometry(3,64,64)
const material = new THREE.MeshStandardMaterial({
  color : "#00ff83",
  roughness:0.5,
})
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)

//Sizes
const sizes = {
  width : window.innerWidth,
  height : window.innerHeight,
}

//Light
const light = new THREE.PointLight(0xFFFFFF,100,100)
light.position.set(0,10,10)
// light.intensity = 200
scene.add(light)

//Camera
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height,0.1,100)
camera.position.z = 20
scene.add(camera)





//Renderer
const canvas  = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene,camera)

//Controls
const control = new OrbitControls(camera,canvas)
control.enableDamping = true
control.enablePan = false
control.enableZoom = false
control.autoRotate = true
control.autoRotateSpeed = 5



//Resize
window.addEventListener("resize",()=>{
  
  //Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //print width and height
  console.log(sizes.width,sizes.height);

  //Updated Camera aspect property
  camera.aspect = sizes.width / sizes.height

  //Updated Camera _Matrix4 property
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width,sizes.height)
})

const loop = () =>{
  control.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop);
}
loop()


// Timeline magicc
const t1 = gsap.timeline({defaults:{duration:1}})
t1.fromTo(mesh.scale,{z:0,x:0,y:0},{z:1,x:1,y:1})
t1.fromTo("nav",{y:"-100%"},{y:"0%"})
t1.fromTo(".title",{opacity:0},{opacity:1})

// Mouse Animation Color
let mouseDown = false
let rgb = [12,23,55];
window.addEventListener('mousedown',()=>(mouseDown = true))
window.addEventListener('mouseup',()=>(mouseDown = false))

window.addEventListener('mousemove',(e)=>{
  if(mouseDown){
    rgb = [Math.round((e.pageX/sizes.width)* 255),
           Math.round((e.pageX/sizes.width)* 255),150,]
    // console.log(rgb);

    //Let's animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color,{
       r:newColor.r,
       g:newColor.g,
       b:newColor.b
      })
  }
})