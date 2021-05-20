import './movieCard.css'

export default function MovieCard(props) {



    let { each } = props;
    return (
        <div className='cardList'>
            <div className = "card">
                <h1>{each.Title} ({each.Year})</h1>
                <p>Weapon of choice: {each.imdbID}</p>
                <img src={each.Poster} alt={`${each.Title}`} width="200" />
                <hr />
            </div>

        </div>
    )
}


