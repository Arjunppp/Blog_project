const URL = 'http://localhost:3000/admin/blog'

document.getElementById('admin-table-class').addEventListener('click', async (event) => {

    if (event.target.classList.contains('View-all-post')) {
        const userId = event.target.getAttribute('user-id');
        console.log(userId);
        let response = await fetch(`${URL}/posts/${userId}`);
        let html = await response.text();
        document.body.innerHTML =html;
        

    } else if (event.target.classList.contains('view-user')) {
        const userId = event.target.getAttribute('user-id');
        let response = await fetch(`${URL}/${userId}`);
        let html = await response.text();
        document.body.innerHTML =html;

    } else if (event.target.classList.contains('edit-user')) {
        const userId = event.target.getAttribute('user-id');
       

    } else if (event.target.classList.contains('delete-user')) {
        const userId = event.target.getAttribute('user-id');
      
    }
});


