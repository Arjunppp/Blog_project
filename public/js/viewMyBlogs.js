let URL = 'http://localhost:3000/blog';
let adminURL = 'http://localhost:3000/admin/blog/individual';


let buttons = document.getElementsByClassName('optionButtons');


Array.from(buttons).forEach((each) => {
    each.addEventListener('click', clickFunction);
});

function clickFunction(event) {
    let operation = event.target.name;

    let blogId = event.target.getAttribute('myblogid');
    console.log(operation, blogId);
    if (window.location.href.toLowerCase().includes('admin')) 
        {
            if (operation == 'VIEW') {
                fetch(`${adminURL}/${blogId}`, { method: 'GET' })
                .then(response => response.text())
                .then(html => {
                   
                    document.body.innerHTML = html;
                })
                .catch(error => console.error('Error:', error));
            }

            else if (operation == 'DELETE') {
                fetch(`${adminURL}/${blogId}`, { method: 'DELETE' })
                    .then(async response => {
                        if (response.redirected) {
                            window.location.href = response.url; 
                        } else {
                            const html = await response.text();
                            document.body.innerHTML = html;
                        }
                    })
                    .catch(error => console.error('Error:', error));
            }

            else if (operation == 'EDIT')
                {
                 document.getElementById('edit-submit-button').setAttribute('bogId', blogId);
                }
        }

else{
    
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
            .then(async response => { // Ensure async here for await inside
                if (response.redirected) {
                    window.location.href = response.url; // Redirect to the new URL
                } else {
                    const html = await response.text();
                    document.body.innerHTML = html;
                }
            })
            .catch(error => console.error('Error:', error));
    }
    
   else if (operation == 'EDIT')
   {
    document.getElementById('edit-submit-button').setAttribute('bogId', blogId);
   }
    

}
   
   

    event.target.removeEventListener('click', clickFunction);
}


document.getElementById('edit-submit-button').addEventListener(('click') , sendPutRequest);


async function sendPutRequest(event)
{
    const blogId = event.target.getAttribute('bogId');
    const title = document.getElementById('edit-title').value;
    const content = document.getElementById('edit-content').value;
    const editedBlog = {blogId , title ,content};
    let sendURL = '';
    if (window.location.href.toLowerCase().includes('admin')) 
    {sendURL=adminURL}
    else{
        sendURL =URL;
    }
    let response = await fetch(`${sendURL}/${blogId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedBlog)
    });
    if (response.redirected) {
        window.location.href = response.url; 
    } else {
        const html = await response.text();
        document.body.innerHTML = html;
    }


    

}