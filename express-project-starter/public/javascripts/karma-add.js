console.log('hello!')

const addKarma = document.querySelector('.add-karma');
console.log(addKarma)
window.addEventListener('DOMContentLoaded', async(e) => {

    addKarma.addEventListener('click', async(e) => {
        e.preventDefault();

        const karmaTitle = document.getElementById('title').value;
        console.log(karmaTitle)
        // const res = await
    })
});
