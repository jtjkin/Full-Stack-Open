const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    let likes = 0

    blogs.map(blog => {
        likes += blog.likes
    })

    return likes
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return "No blogs"
    }

    let popular = {
        likes: 0
    }

    blogs.map(blog => {
        if(blog.likes >= popular.likes) {
            popular = blog
        }
    })

    return {
        title: popular.title,
        author: popular.author,
        likes: popular.likes
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return "No blogs"
    }

    let listOfAuthors = [{
        author: "testi",
        likes: []
    }]
    let mostPopular = {
        author: "",
        likes: 0
    }

    for(i = 0; i < blogs.length; i++) {
        const foundIndex = listOfAuthors.findIndex(lookingForAuthor =>
            lookingForAuthor.author === blogs[i].author)
        
        if (foundIndex >= 0) {
            listOfAuthors[foundIndex].likes.push(blogs[i].likes)
        } else {
            const newAuthor = {
                author: blogs[i].author,
                likes: [blogs[i].likes,]
            }

            listOfAuthors.push(newAuthor)
        }   
    }

    listOfAuthors.forEach(person => {
        numberOfLikes = 0

        person.likes.forEach(like => {
            numberOfLikes += like
        })

        if (numberOfLikes >= mostPopular.likes) {
            mostPopular.author = person.author
            mostPopular.likes = numberOfLikes
        }
    })

    return mostPopular
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return "No blogs"
    }

    let listOfAuthors = [{
        author: "testi",
        blogs: 0
    }]
    let lista = 0
    let mostPopular = {
        author: "",
        blogs: 0
    }

    for(i = 0; i < blogs.length; i++) {
        const foundIndex = listOfAuthors.findIndex(lookingForAuthor =>
            lookingForAuthor.author === blogs[i].author)
        
        if (foundIndex >= 0) {
            listOfAuthors[foundIndex].blogs += 1
        } else {
            const newAuthor = {
                author: blogs[i].author,
                blogs: 1
            }

            listOfAuthors.push(newAuthor)
        }   
    }

    listOfAuthors.forEach(person => {
        if (person.blogs >= mostPopular.blogs) {
            mostPopular.author = person.author
            mostPopular.blogs = person.blogs
        }
    })

    return mostPopular
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostLikes,
    mostBlogs
}