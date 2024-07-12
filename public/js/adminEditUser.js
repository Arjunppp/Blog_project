document.addEventListener('DOMContentLoaded', function () {
    console.log('Hello'); 
    document.querySelectorAll('#edit-button').forEach(button => {
        button.addEventListener('click', function () {
            
            let username = this.closest('form').querySelector('#username').value;
            let email = this.closest('form').querySelector('#email').value;
            let password = this.closest('form').querySelector('#password').value;

           
            console.log('Username:', username);
            console.log('Email:', email);
            console.log('Password:', password);
        });
    });
});


