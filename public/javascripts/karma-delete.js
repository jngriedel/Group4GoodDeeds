const deleteBtns = document.querySelectorAll('.delete-btn');

for (let i = 0; i < deleteBtns.length; i++) {
    const btn = deleteBtns[i];
    btn.addEventListener('click', async(e) => {
        e.preventDefault()
        const karmaId = e.target.value;

        const res = await fetch(`/karmas/${karmaId}`, {
            method: 'DELETE'
        });

        const data = await res.json();

        if (data.karmaId) {
            const karmaDelete = document.querySelectorAll(`.karma-${data.karmaId}`);
            karmaDelete.forEach(karma => {
                karma.remove();
            })
        } else {
            alert('Could not delete!');
        }
    });
};
