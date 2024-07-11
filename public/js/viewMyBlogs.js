let URL = 'http://localhost:3000/blog';


let buttons = document.getElementsByClassName('optionButtons');


Array.from(buttons).forEach((each) => {
    each.addEventListener('click', clickFunction);
});

function clickFunction(event) {
    let operation = event.target.name;
    let blogId = event.target.getAttribute('myblogid');
    console.log(operation, blogId);
    if (operation == 'VIEW') {
        fetch(`${URL}/${blogId}`, { method: 'GET' })
        .then(response => response.text())
        .then(html => {
           
            document.body.innerHTML = html;
        })
        .catch(error => console.error('Error:', error));
    }
    else if (operation == 'DELETE') {
        fetch(`${URL}/${blogId}`, { method: 'DELETE' })
         .then(response => response.text())
         .then(html => {
           
            document.body.innerHTML = html;
         })
         .catch(error => console.error('Error:', error));
        
    }
    else if (operation == 'EDIT') {

    }

    event.target.removeEventListener('click', clickFunction);
}
