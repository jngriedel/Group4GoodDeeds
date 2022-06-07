const addKarma = document.querySelector('.add-karma');
const karmaId = document.getElementById('karmaHolder');
window.addEventListener('DOMContentLoaded', async(e) => {

    addKarma.addEventListener('click', async(e) => {
        e.preventDefault();
        const karmaTitle = document.getElementById('title').value;

        const res = await fetch(`/posts/${karmaId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
            })
        });

        const data = await res.json()
        console.log(data);
        if (data.message === 'Success!') {
            // console.log(data)
            const titleEle = document.getElementById(`${postId}-title`)
            const contentEle = document.getElementById(`${postId}-content`)
            titleEle.innerHTML = data.post.title
            contentEle.innerHTML = data.post.content
            form.classList.add('hidden')
        } else {
            // create elements with error message
        }
    });
});
