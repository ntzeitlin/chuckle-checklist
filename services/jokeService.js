const postData = async (data, url) => {
    const response = await fetch(url, ({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }))
}

export const addJoke = async (jokeText) => {
    postData(jokeText, "http://localhost:8088/jokes")
}