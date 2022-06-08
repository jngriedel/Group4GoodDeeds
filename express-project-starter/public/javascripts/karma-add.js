const addKarma = document.querySelector('.add-karma');
const karmaId = document.getElementById('karmaId');

window.addEventListener('DOMContentLoaded', async(e) => {

    addKarma.addEventListener('click', async(e) => {
        e.preventDefault();
        console.log(e.target.id)
        const title = document.getElementById('title').value;
        // const res = await
        const res = await fetch(`/karmas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title
            })
        })
        // console.log(res);

        const data = await res.json()
            if (data.message === 'Success!') {
                console.log(data)
                const titleEle = document.getElementById("table")
                const inputField = document.getElementById("title");
                const row = table.insertRow(1);
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                cell1.innerHTML = data.karma.title;
                cell2.innerHTML = "<button class='rename'>Rename</button>"
                inputField.value = null;

            }
    })
});
