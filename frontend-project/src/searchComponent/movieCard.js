import './movieCard.css'

export default function MovieCard(props) {



    let { each } = props;
    //console.log(each);
    let baseURL =
    window.location.protocol + "//" + window.location.host + "/info/";


    return (
        <div className='card-container'>
            <a href={baseURL + each.imdbID} className = "card">
                <h1>{each.Title} ({each.Year})</h1>
                

                <p>IMDB rating: {each.imdbID}</p>
                <img style = {{marginLeft:'40%'}}src={each.Poster} alt={`${each.Title}`} width="200" />
                <hr />
            </a>

        </div>
    )
}


