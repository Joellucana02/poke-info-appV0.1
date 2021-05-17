const d = document;
let $displayPoke = d.querySelector('.pokemon-displayed'),
 $template = d.getElementById('poke-template').content,
 $searchDiv = d.querySelector('.search-icon');
 

d.addEventListener('keypress', e=>{
    if(e.target.matches('#search')){
        console.log(e.key);
        //console.log(e);

        $searchDiv.addEventListener('click', (e) =>{
            findThatOut(e);
        })
        if(e.key === 'Enter' ){
            //console.log(e.key);
            findThatOut(e);            
        }
    }
})

let findThatOut = async (el)=>{
    try {
        let query = el.target.value.toLowerCase();
        let raw = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`),
        data = await raw.data;
        console.log(data);
        display(data);
    } catch (error) {
        console.log(error);
        let message = error.statusText || 'Something gone wrong';
        $displayPoke.innerHTML = `<p>Error ${error.status}: ${message}</p>`
    }
}
let display = (data)=>{
    console.log('so')
    $template.querySelector('img').src = data.sprites.front_default;
    $template.querySelector('.pokemon-tag__name').textContent = data.name;
    let $clone = d.importNode($template,true);
    $displayPoke.innerHTML = "";
    $displayPoke.appendChild($clone);
}