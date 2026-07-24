const button = document.getElementById('generateRecipe');
const outputDiv = document.getElementById('Output');
const input = document.getElementById('recipeInput');

const API_KEY = 'YOUR_API_KEY_HERE';

button.addEventListener('click',async()=>{
    const ingredients = input.value;
    if(!ingredients){
        outputDiv.innerHTML = '<p>Please enter some ingredients.</p>';
        return;
    }
    outputDiv.innerHTML = '<p>Generating recipe...</p>';

    try{
       const apiUrl = `https://api.groq.com/openai/v1/chat/completions`;
        const payLoad = {
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: `Create a recipe using the following ingredients: ${ingredients}. Please provide the recipe in a clear and concise format.`
                }
            ]
        };

        const response = await fetch(apiUrl,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(payLoad)
        });

        const data = await response.json();
        const aiText = data.choices[0].message.content;
        outputDiv.innerHTML = `<p>${aiText}</p>`;
    } catch (error){
        console.error('Error generating recipe:', error);
        outputDiv.innerHTML = '<p>There was an error generating the recipe. Please try again later.</p>';
    }
})