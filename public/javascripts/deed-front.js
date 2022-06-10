const deedName = document.getElementsByClassName('OneDeedName')

window.addEventListener('load', e => {

    if (deedName[0].innerText === "Plant a Tree") {

        const image = document.createElement('img');
        image.setAttribute('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsQOdfIE308qOghx5R2E-d9RmRJFmtlLW6yA&usqp=CAU');
        image.setAttribute('class', 'plant-tree');
        image.setAttribute('alt', 'tree on planet');

        const deedImageContainer = document.querySelector('div.deedImageContainer');

        deedImageContainer.appendChild(image);
    }

    if (deedName[0].innerText === "Pick up trash") {

        const image = document.createElement('img');
        image.setAttribute('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ITTIvsc5qIdmrCtTDqOaTMjXnbyNRLmJZg&usqp=CAU');
        image.setAttribute('class', 'trash-picking');
        image.setAttribute('alt', 'chilrden picking up trash');

        const deedImageContainer = document.querySelector('div.deedImageContainer');

        deedImageContainer.appendChild(image);
    }

    if (deedName[0].innerText === "Help a random grandma with her groceries") {

        const image = document.createElement('img');
        image.setAttribute('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHNY_CWNCmfXMlNv81CPNPGMrSrf6c46Z59w&usqp=CAU');
        image.setAttribute('class', 'grandma-duty');
        image.setAttribute('alt', 'grandma');

        const deedImageContainer = document.querySelector('div.deedImageContainer');

        deedImageContainer.appendChild(image);
    }

    if (deedName[0].innerText === "Donate Blood") {

        const image = document.createElement('img');
        image.setAttribute('src', 'https://ignatius.nyc/wp-content/uploads/2021/01/Document.jpg');
        image.setAttribute('class', 'donate-blood');
        image.setAttribute('alt', 'blood drive');

        const deedImageContainer = document.querySelector('div.deedImageContainer');

        deedImageContainer.appendChild(image);
    }

    if (deedName[0].innerText === "Donate to Charity") {

        const image = document.createElement('img');
        image.setAttribute('src', 'https://i2.wp.com/movingtips.wpengine.com/wp-content/uploads/2021/01/donation.jpg?fit=1200%2C800&ssl=1');
        image.setAttribute('class', 'charity');
        image.setAttribute('alt', 'donating box');

        const deedImageContainer = document.querySelector('div.deedImageContainer');

        deedImageContainer.appendChild(image);
    }

});
