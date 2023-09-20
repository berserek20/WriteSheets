const btn = document.getElementById('btn');
btn.addEventListener('click',async()=>{
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const body ={
        name:name,email:email,age:age
    }
    console.log("body",body)
    const response =await fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
          'Accept': 'application.json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      })
      console.log(response)
})