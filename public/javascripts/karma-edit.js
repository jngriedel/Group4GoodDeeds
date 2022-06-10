const renameBtns = document.querySelectorAll('.rename');

for (let i = 0; i < renameBtns.length; i++) {
    const rename = renameBtns[i];

    rename.addEventListener('click', (e) => {
        const karmaId = e.target.value;
        // console.log(karmaId)
        const form = document.getElementById(`edit-form-${karmaId}`);
        // console.log(form)
        const titleVal = document.getElementById(`karmaTitle-${karmaId}`).innerText
        if (form.classList.contains('hidden')) {
            form.classList.remove('hidden');
            const formInput = document.getElementById(`${karmaId}-edit-title`)
            formInput.value = titleVal

        }

        const saveBtn = document.getElementById(`edit-submit-${karmaId}`);
        saveBtn.addEventListener('click', async(e) => {
            e.preventDefault();
            const oldTitle = titleVal
            const title = document.getElementById(`${karmaId}-edit-title`).value;
            // console.log(title)

            const res = await fetch(`/karmas/${karmaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    oldTitle
                }),
            });

            const data = await res.json();
            // console.log(data)

            if (data.message === 'Success!') {
                const titleEle = document.getElementById(`karmaTitle-${karmaId}`);
                const titleEditField = document.getElementById(`${karmaId}-edit-title`);
                titleEle.innerHTML = data.karma.title;

                titleEditField.value = null;
                form.classList.add('hidden')
            } else if (data.message === 'Dupe') {
                alert("Karma couldn’t be created. Karma is a duplicate.");
            }
            else {
                alert("Karma couldn’t be created. Karma is either empty or more than 20 characters.");
            }
        });
    });

    const cancelBtns = document.querySelectorAll('.cancel-btns');

    for (let i = 0; i < cancelBtns.length; i++) {
        const cancel = cancelBtns[i];

        cancel.addEventListener('click', async(e) => {
            e.preventDefault();

            const karmaId = e.target.id.split('-')[1];
            // console.log(karmaId)
            const form = document.getElementById(`edit-form-${karmaId}`);
            // console.log(form)
            form.classList.add('hidden');
        })
    }
}
