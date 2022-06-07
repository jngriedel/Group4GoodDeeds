

const addReview = document.querySelector('#add-review')
const reviewContainer = document.querySelector('#review-container')
const opinionContainer = document.querySelector('#opinion')
const main = document.querySelector("#main")
const form = document.querySelector("#pop-up-form")
const cancel = document.querySelector('#cancel')

document.addEventListener("DOMContentLoaded", (event)=>{

    cancel.addEventListener('click', async (event)=> {

    })

    addReview.addEventListener('click', async (event)=> {
        event.preventDefault()
        const formBox = document.createElement('div')
        formBox.className = 'form-box'
        formBox.appendChild(form)
        form.id = 'pop-up-form2'
        opinionContainer.appendChild(formBox)
        main.className = 'blur'

        cancel.addEventListener('click', async (event)=> {
            form.id = 'pop-up-form2'
            opinionContainer.removeChild(formBox)
            main.className = ""

        })

    })


})
