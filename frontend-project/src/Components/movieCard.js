import './movieCard.css'

export default function MovieCard(props) {



    let { each } = props;
    return (
        <div className='card-container'>
            <div className = "card">
                <h1>{each.Title} ({each.Year})</h1>
                <p>IMDB rating: {each.imdbID}</p>
                <img style = {{marginLeft:'40%'}}src={each.Poster} alt={`${each.Title}`} width="200" />
                <hr />
            </div>

        </div>
    )
}


