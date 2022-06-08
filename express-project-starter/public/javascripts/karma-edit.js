const renameBtns = document.querySelectorAll('.rename');

for (let i = 0; i < renameBtns.length; i++) {
    const rename = renameBtns[i];

    rename.addEventListener('click', (e) => {
        const karmaId = e.target.value;
        console.log(karmaId)
        const form = document.getElementById(`edit-form-${karmaId}`);
        console.log(form)
        if (form.classList.contains('hidden')) {
            form.classList.remove('hidden');
        }

        const saveBtn = document.getElementById(`edit-submit-${karmaId}`);
        saveBtn.addEventListener('click', async(e) => {
            e.preventDefault();
            const title = document.getElementById(`${karmaId}-edit-title`).value;
            console.log(title)
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

            if (data) {
                const titleEle = document.getElementById("karmaTitle");
                const titleEditField = document.getElementById(`${karmaId}-edit-title`);
                titleEle.innerHTML = data.karma.title;

                titleEditField.value = null;
                form.classList.add('hidden')
            } else {
                alert('Could not edit the title!');
            }
        });
    });

    const cancelBtns = document.querySelectorAll('.cancel-btns');

    for (let i = 0; i < cancelBtns.length; i++) {
        const cancel = cancelBtns[i];

        cancel.addEventListener('click', async(e) => {
            e.preventDefault();

            const karmaId = e.target.id.split('-')[1];
            console.log(karmaId)
            const form = document.getElementById(`edit-form-${karmaId}`);
            console.log(form)
            form.classList.add('hidden');
        })
    }
}
