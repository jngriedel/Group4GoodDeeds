const renameBtns = document.querySelectorAll('.rename');
const karmaId = document.getElementById('karmaId').value;

for (let i = 0; i < renameBtns.length; i++) {
    const rename = renameBtns[i];
    rename.addEventListener('click', (e) => {
        const form = document.getElementById(`edit-form-${karmaId}`);
        console.log(form)
        if (form.classList.contains('hidden')) {
            form.classList.remove('hidden');
        }

        const saveBtn = document.getElementById(`edit-submit-${karmaId}`);
        saveBtn.addEventListener('click', async(e) => {
            e.preventDefault();

            const title = document.getElementById(`${karmaId}-edit-title`);
            // const karmaId = e.target.id.split('-')[2];
            const res = await fetch(`/karmas/${karmaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title
                }),
            });

            const data = await res.json();
            console.log(data)

            if (data.message === 'Success!') {
                console.log(data.message.title)
                const titleEle = document.getElementById("karmaTitle")
                titleEle.innerHTML = data.karma.title;
                form.classList.add('hidden')
            } else {

            }
        })
    })
}
