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



const myReviews = document.getElementsByClassName('review-hidden')


document.addEventListener("DOMContentLoaded", (event)=>{


    for (let i = 0; i < myReviews.length; i++) {
        const form = myReviews[i];
        const reviewId = document.getElementById(`reviewHolder${i}`).value

        const editButt = document.getElementById(`edit-button-${reviewId}`)


        const star1 = document.getElementById(`star1${reviewId}`)
        const star2 = document.getElementById(`star2${reviewId}`)
        const star3 = document.getElementById(`star3${reviewId}`)
        const star4 = document.getElementById(`star4${reviewId}`)
        const star5 = document.getElementById(`star5${reviewId}`)
        editButt.addEventListener('click', async (event)=> {
            event.preventDefault()
            ///make sure stars are filled
            const starRating = document.getElementById(`ratingHolder${reviewId}`).value
            switch (starRating){
                case "1":
                star1.checked = true
                break;

                case "2":
                star2.checked = true
                break;

                case "3":
                star3.checked = true
                break;

                case "4":
                star4.checked = true
                break;

                case "5":
                star5.checked = true
                break;
            }
            form.className = 'form-box'
            //blur background

        })
        const saveButt = document.getElementById(`save-edit-${reviewId}`)

        saveButt.addEventListener('click', async (event1) =>{
            event1.stopPropagation()
            event1.preventDefault();
            const title = document.getElementById(`title-${reviewId}`).value
            const body = document.getElementById(`body-${reviewId}`).value
            //checkstars
            let rating;
            if (star1.checked) rating = 1;
            if (star2.checked) rating = 2;
            if (star3.checked) rating = 3;
            if (star4.checked) rating = 4;
            if (star5.checked) rating = 5;


            const res = await fetch(`/reviews/${reviewId}/edit`, {
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

                const reviewTitleCell = document.getElementById(`reviewTitleC${reviewId}`)
                let reviewRatingCell = document.getElementById(`reviewRatingC${reviewId}`)
                const reviewBodyCell = document.getElementById(`reviewBodyC${reviewId}`)
                const reviewDateCell = document.getElementById(`reviewDateC${reviewId}`)
                const ratingHolder = document.getElementById(`ratingHolder${reviewId}`)


                ratingHolder.value = data.review.rating
                

                reviewBodyCell.innerText = data.review.body;
                reviewRatingCell.innerHTML = `<span>${data.review.rating}</span>`
                reviewTitleCell.innerText = data.review.title;
                reviewDateCell.innerText = data.review.createdAt







                form.className = 'review-hidden'

                // main.className = ""
            } else {
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
                form.appendChild(errorList)
            }
        })




        const cancelButt = document.getElementById(`cancel-edit-${reviewId}`)
        cancelButt.addEventListener('click', async (event2)=> {
            event2.stopPropagation()
            event2.preventDefault();

            form.className = 'review-hidden'
            // main.className = ""

        })
    }






})
