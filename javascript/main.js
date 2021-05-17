const d = document;
let $main = d.querySelector('.main');
let apiMax = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`,
$links = d.querySelector('.extend');
let requestData = async (apiPoke) =>{
    try {
        let raw = await axios.get(apiPoke),
        data = await raw.data;
        console.log(data);
        let $template = '',
        $prevLink = '',
        $nextLink = '';
        //console.log(raw);
        throughEachElement(data, $template, $prevLink, $nextLink);
    } catch (error) {
        console.log(error);
        let message = error.statusText || 'Something gone wrong';
        $main.innerHTML = `<p>Error ${error.status}: ${message}</p>`
    }
}
d.addEventListener('DOMContentLoaded', requestData(apiMax));

let throughEachElement = async (el , t, pl, nl)=>{
    for(let i = 0;i<el.results.length; i++){
        //console.log(el.results[i]);
        try {
            let raw = await axios.get(el.results[i].url),
            pokeData = await raw.data;
            //console.log(raw)
            //console.log(pokeData)
            t += `
            <figure>
            <img src='${pokeData.sprites.front_default}' alt='${pokeData.name}'>
            <figcaption>${pokeData.name}</figcaption>
            
            </figure>     
            `;
            
            $main.innerHTML = t;
            pl = el.previous? `<a href='${el.previous}'>previous[<--]</a>`:'nothing',
            nl = el.next? `<a href='${el.next}'>next[-->]</a>`:'nothing';
            $links.innerHTML = `${pl}-----------${nl}`;
        } catch (error) {
            console.log(error);
        let message = error.statusText || 'Something gone wrong';
        $main.innerHTML = `<p>Error ${error.status}: ${message}</p>`
        }

    }
}
d.addEventListener('click', e=>{
    if(e.target.matches('.extend a')){
        e.preventDefault();
        requestData(e.target.getAttribute('href'));
    }
})