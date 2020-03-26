        //renderBooks
function renderBooksTitle(books){
    return books.map(book => {
        return `${book.title}`
    })
}

function renderBooksImage(books){
    return books.map(book => {
        return `${book.image}`
    })
}

function renderBooksReview(books){
    return books.map(book => {
        return `${book.review}`
    })
}

function renderOneAuthor(author){
    const authorList = document.querySelector('#author-list')
    const authorCart = document.createElement('div')
    authorCart.className = 'author-card'
    authorCart.dataset.id = author.id
    authorCart.innerHTML = `
        <h2 id = "bookTitle">${renderBooksTitle(author.books)}</h3>
        <h3>${author.name}</h2>
        <img src = ${renderBooksImage(author.books)} alt ="" width = "250" height ="250">
        <p>${renderBooksReview(author.books)}</p>
        <button data-action = "deleteBook" class = "delete"> Delete </button>
    `
    authorList.append(authorCart)

    
}

function renderAllAuthors(Authors){
    Authors.forEach(renderOneAuthor)
}

            //fetch renderAllAuthors
fetch("http://localhost:3000/authors")
    .then(res => res.json())
    .then(renderAllAuthors)

            //fetch post

document.querySelector("#create-book").addEventListener("submit", e =>{
    e.preventDefault()
    
    
    const title = e.target.title.value
    const author = e.target.name.value
    const image = e.target.image.value
    const review = e.target.review.value
    
    fetch("http://localhost:3000/authors",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name:author})
    })
        .then(res => res.json())
        .then(author =>{
            fetch("http://localhost:3000/books",{
                method: "POST",
                headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({title:title,image:image,review:review, author_id: author.id})

            })
            
        })
        
})

                    //delete
const authorList = document.querySelector("#author-list")
authorList.addEventListener("click", e => {
    if(e.target.dataset.action === "deleteBook"){
        const authorCard = e.target.closest(".author-card")
        const authorId = authorCard.dataset.id
        // console.log(authorId)
        // console.log(authorCard)
        console.log("u clicked me")

        fetch(`http://localhost:3000/authors/${authorId}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then( () => {
                authorCard.remove()
            })
            
        

        }
})
