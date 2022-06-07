const addKarma = document.querySelector('.add-karma');

document.addEventListener('DOMContentLoaded', async(e) => {

    addKarma.addEventListener('click', async(e) => {
        e.preventDefault();

        const karmaTitle = document.getElementById('title').value;
        console.log(karmaTitle)
    })
})
