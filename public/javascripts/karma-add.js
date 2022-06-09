const addKarma = document.querySelector('.add-karma');

window.addEventListener('DOMContentLoaded', async(e) => {

    addKarma.addEventListener('click', async(e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;

        const res = await fetch(`/karmas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title
            })
        })

        const data = await res.json()
        // console.log(karmaId);
            if (data.message === 'Success!') {
                const inputField = document.getElementById("title");
                // const editForm = document.getElementById(`edit-form-${karmaId}`);
                // console.log(editForm)
                const row1 = table.insertRow(1);
                const row2 = table.insertRow(2);
                const cell1 = row1.insertCell(0);
                // const cell2 = row1.insertCell(1);
                // const cell3 = row1.insertCell(2);
                // const cell4 = row2.insertCell(0);
                cell1.innerHTML = data.karma.title;

                // cell2.innerHTML = '<button class="rename" value=karma.id>Rename</button>';
                // cell3.innerHTML = '<button class="delete-btn" value=karma.id>Delete</button>';
                // cell4.innerHTML = '<form class="hidden" action=`/karmas/${karmaId}` method="post" id=`edit-form-${karmaId}`><input type="text" name="title" id=`${karmaId}-edit-title`><button id=`edit-submit-${karmaId}`>Save</button><a class="cancel-btns" href="/" id=`cancel-${karmaId}`>Cancel</a></form>';

                // cell4.innerHTML += '<form class="" action=`/karmas/${karmaId}` method="post" id=`edit-form-${karmaId}`>'
                // cell4.innerHTML += '<input type="text" name="title" id=`${karmaId}-edit-title`></input>'
                // cell4.innerHTML += '<button id=`edit-submit-${karmaId}`>Save</button>';
                // cell4.innerHTML += '<a class="cancel-btns" href="/">Cancel</a></form>';
                // row2.innerHTML = editForm;
                inputField.value = null;


            }
    });
});
