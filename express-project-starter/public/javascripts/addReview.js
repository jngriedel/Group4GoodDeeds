const addReview = document.querySelector('#add-review')
const reviewContainer = document.querySelector('#review-container')
const opinionContainer = document.querySelector('#opinion')


document.addEventListener("DOMContentLoaded", (event)=>{



    addReview.addEventListener('click', async (event)=> {
        event.preventDefault()
        const formBox = document.createElement('div')
        formBox.className = 'form-box'
        opinionContainer.appendChild(formBox)
        console.log(opinionContainer)

    })


})
