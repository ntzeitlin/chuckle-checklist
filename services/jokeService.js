const postData = async (data, url) => {
    const response = await fetch(url, ({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }))
}

export const putData = async (data, url) => {
    const response = await fetch(url, ({
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }))
}

export const delData = async (url) => {
    const response = await fetch(`http://localhost:8088/jokes/${url}`, ({
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }))
}

export const addJoke = async (jokeText) => {
    postData(jokeText, "http://localhost:8088/jokes")
}

export const getAllJokes = async () => {
    const response = await fetch("http://localhost:8088/jokes")
    const data = await response.json()
    return data
}