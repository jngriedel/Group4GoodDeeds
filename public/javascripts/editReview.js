


const myReviews = document.getElementsByClassName('review-hidden')
const main = document.getElementById('main-mydeeds')
const navBar = document.getElementsByClassName('nav-bar')
const footer = document.getElementsByClassName('footer')

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
            main.className = 'blur'
            navBar[0].classList.add('blur')
            footer[0].classList.add('blur')

        })
        const saveButt = document.getElementById(`save-edit-${reviewId}`)

        saveButt.addEventListener('click', async (event1) =>{
            event1.stopPropagation()
            event1.preventDefault();
            const title = document.getElementById(`title-${reviewId}`).value
            const body = document.getElementById(`body-${reviewId}`).value
            //console.log(body)
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
                // const reviewDateCell = document.getElementById(`reviewDateC${reviewId}`)
                const ratingHolder = document.getElementById(`ratingHolder${reviewId}`)


                ratingHolder.value = data.review.rating


                reviewBodyCell.innerText = data.review.body;
                reviewRatingCell.innerHTML = `<span>${data.review.rating}</span>`
                reviewTitleCell.innerText = data.review.title;
                // reviewDateCell.innerText = data.review.createdAt







                form.className = 'review-hidden'
                navBar[0].classList.remove('blur')
                footer[0].classList.remove('blur')
                main.className=''
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
        //console.log(cancelButt)
        cancelButt.addEventListener('click', async (event2)=> {

            // event2.stopPropagation()
            event2.preventDefault();

            form.className = 'review-hidden'
            main.className = ""
            navBar[0].classList.remove('blur')
            footer[0].classList.remove('blur')
        })


        const karmaRadios = document.getElementById(`karma-radio-bttns-${reviewId}`)
        const karmaEditButton = document.getElementById(`edit-karmas-${reviewId}`)
        karmaEditButton.addEventListener('click', async (event3)=> {
            if(karmaRadios.className === 'karma-buttons'){
                karmaRadios.className='hidden-karma-buttons'
            } else {
            karmaRadios.className= 'karma-buttons'


            }
        })
        const karmaRadioClose = document.getElementById(`close-${reviewId}`)
        karmaRadioClose.addEventListener('click', async (event4)=> {
            karmaRadios.className= 'hidden-karma-buttons'
        })
        //click off the radio box to close them
        window.addEventListener('mouseup', (event)=>{

            if (event.target != karmaRadios && event.target.parentNode != karmaRadios){
                if (event.target != karmaEditButton && event.target.parentNode != karmaEditButton){
                karmaRadios.className='hidden-karma-buttons'

                }
            }
        });

        //grab each checkbox
        const checkboxes = document.getElementsByClassName(`checkbox-${reviewId}`)

        //when you grab a checkbox it should be linked to the review, and know what karma and deed it's for
         for (let i = 0; i < checkboxes.length; i++) {
             const checkbox = checkboxes[i];


            const karmaId = checkbox.id.split('-')[0]
            const deedId = checkbox.id.split('-')[1]
            checkbox.addEventListener('click', async (event5)=> {

                //fetch route
                if (checkbox.checked){
                    const res = await fetch(`/karmastodeeds/${karmaId}/${deedId}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                    })

                    const data = await res.json()
                    if (data.message === 'Success!') {

                        const karmabox = document.getElementById(`reviewKarmas${reviewId}`)
                        const newLI = document.createElement('li')
                        newLI.innerText = `${data.karma.title},`
                        karmabox.insertBefore(newLI, karmaEditButton)
                        
                    }

                }
                if (!checkbox.checked) {
                    const res = await fetch(`/karmastodeeds/${karmaId}/${deedId}/delete`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                    })

                    const data = await res.json()
                    if (data.message === 'Success!') {

                    }
                }
            })


         }

         ///=======PERSIST CHECKBOX STATUS===========
         //grab all of the karmas that made it in the list
         const karmaList = document.getElementsByClassName(`listKarma${reviewId}`)

         //grab all the checkboxes for this review
         const checkboxR = document.getElementsByClassName(`checkbox-${reviewId}`)

         //compare names of checkboxes to karma names. if match, set box check to true
         for (let i = 0; i < checkboxR.length; i++) {
             const box = checkboxR[i];
             for (let j = 0; j < karmaList.length; j++) {
                 const li = karmaList[j];
                 if (box && li){
                     if (`${box.name},` === li.innerText) box.checked = true
                 }
             }

         }
    }



})
