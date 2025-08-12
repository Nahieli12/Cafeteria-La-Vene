const tag = document.getElementsByTagName('p')
console.log(tag)
const className = document.getElementsByClassName('cart')
console.log(className)
const boton = document.getElementById('.product-card p')
console.log(boton)

const tagConCss = document.querySelector('.product-card p')
console.log(tagConCss)

const todosLosP = document.querySelectorAll('p')
console.log(todosLosP)

const arrayDeLosP = Array.from(tag)

console.log(arrayDeLosP)

let nombre = 'Nahi'

const arrayRandom = Array.from(nombre)
console.log(arrayRandom)
boton.addEventListener ('click',(evento) => {body.children[0].children[0].innerHTML = '<p>Hola, soy un nuevo texto</p>'
})

// arrayDeLosP.forEach((el) => {
// console.log(el)
// })
const body = document.querySelector ('body')

console.dir(body.children[0].innerText)

elemento.style.color = 'red'