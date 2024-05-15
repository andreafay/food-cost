function EntryPage() {
    return(
        <div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary mr-4">
                    <a href="/calcola-food-cost">Calcola Food Cost</a>
                </button>
                <button className="btn btn-primary">
                    <a href="/vedi-ricette">Vedi Ricette Salvate</a>
                </button>
            </div>
        </div>
    )
}

export default EntryPage;