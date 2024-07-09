

async function handleRootPage(req , res)
{
    res.render('home');
};

async function handleRegisterRoute(req ,res)
{
    res.render('sign-up');
}



export {handleRootPage ,handleRegisterRoute}