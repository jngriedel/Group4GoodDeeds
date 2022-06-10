//Make stars
// const table = document.getElementById("reviewTable");

//     for (let i = 0; i <table.rows.length; i++) {
//         const reviewRating = document.getElementById(`review-rating${i}`)
//         console.log(reviewRating)
//         if (reviewRating.innerHTML == 1) reviewRating.innerHTML = '☆'
//         if (reviewRating.innerHTML == 2) reviewRating.innerHTML = '☆☆'
//         if (reviewRating.innerHTML == 3) reviewRating.innerHTML = '☆☆☆'
//         if (reviewRating.innerHTML == 4) reviewRating.innerHTML = '☆☆☆☆'
//         if (reviewRating.innerHTML == 5) reviewRating.innerHTML = '☆☆☆☆☆'

//     }



const addReview = document.querySelector('#add-review')
const reviewContainer = document.querySelector('#review-container')
const opinionContainer = document.querySelector('#opinion')
const main = document.querySelector("#main")
const cancel = document.querySelector('#cancel')
const postReview = document.querySelector('#post-review')
const deedId = document.querySelector('#deedHolder').value
const formBox = document.querySelector('.form-box-hidden')
document.addEventListener("DOMContentLoaded", (event)=>{


    if(addReview){  ///does not log error if user is not logged in
    addReview.addEventListener('click', async (event)=> {
        event.preventDefault()


        formBox.className = 'form-box'
        main.className = 'blur'
    })
    }
    postReview.addEventListener('click', async (event1) =>{
        event1.stopPropagation()
        event1.preventDefault();
        const title = document.getElementById('title').value
        const body = document.getElementById('body').value
        //checkstars
        const star1 = document.getElementById("star1").checked
        const star2 = document.getElementById("star2").checked
        const star3 = document.getElementById("star3").checked
        const star4 = document.getElementById("star4").checked
        const star5 = document.getElementById("star5").checked
        let rating;
        if (star1) rating = 1;
        if (star2) rating = 2;
        if (star3) rating = 3;
        if (star4) rating = 4;
        if (star5) rating = 5;


        const res = await fetch(`/deeds/${deedId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                body,
                rating
            })
        })

        const data = await res.json()
        if (data.message === 'Success!') {
            const titleIn = document.getElementById('title')
            const bodyIn = document.getElementById('body')

            document.getElementById("star1").checked = false
            document.getElementById("star2").checked = false
            document.getElementById("star3").checked = false
            document.getElementById("star4").checked = false
            document.getElementById("star5").checked = false
            titleIn.value = null
            bodyIn.value = null




            const table = document.getElementById("reviewTable");

            // Create an empty <tr> element and add it to the 1st position of the table:
            const row = table.insertRow(1);

            // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);

            // Add some text to the new cells:
            cell1.innerHTML = data.review.title;
            cell2.innerHTML = data.review.body;
            cell3.innerHTML = data.review.rating;
            cell4.innerHTML = `${data.review.User.firstName} ${data.review.User.lastName}`


            formBox.className = 'form-box-hidden'
            // opinionContainer.removeChild(formBox)
            main.className = ""
        } else if (data.message === "Dupe") {
            alert('You have already posted a Review for this deed!')
        }
        else {
            const oldErrors = document.getElementById('error-list')
            if (oldErrors) {
                oldErrors.remove()
            }
            const errorList = document.createElement('ul')
            errorList.id = 'error-list'
            for (let error in data.errors){
                const li = document.createElement('li')
                li.innerText = data.errors[error];
                errorList.appendChild(li);
            }
            formBox.appendChild(errorList)
        }
    })

    cancel.addEventListener('click', async (event2)=> {
        event2.stopPropagation()
        event2.preventDefault();
        const titleIn = document.getElementById('title')
        const bodyIn = document.getElementById('body')

        document.getElementById("star1").checked = false
        document.getElementById("star2").checked = false
        document.getElementById("star3").checked = false
        document.getElementById("star4").checked = false
        document.getElementById("star5").checked = false
        titleIn.value = null
        bodyIn.value = null
        formBox.className = 'form-box-hidden'
        main.className = ""

    })

})
