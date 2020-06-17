const listHelper = require('../utils/list_helper')

test('dummy return one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

//material for tests
const emptyArray = []
const listWithOneBlog = [
    {
    _id: '5e98805b9f01973cc8d72bdc',
    "title": "Viisi pähkinää",
    "author": "Ellun kana",
    "url": "www.www.wwwww",
    "likes": 35000,
    "__v": 0
    }
]
const longList = [
    {
      "_id": "5e9871520a5f6f227c281c18",
      "title": "Testi-blogi",
      "author": "Maija Testaaja",
      "url": "https://fast.com",
      "likes": 3,
      "__v": 0
    },
    {
      "_id": "5e9879b27613ef27b8298af6",
      "title": "Kauneimmat ruokaohjeet",
      "author": "Matti Testaaja",
      "url": "www.www.wwwww",
      "likes": 5,
      "__v": 0
    },
    {
      "_id": "5e987da816017230449040d2",
      "title": "Autonrassaajan unelma",
      "author": "Reiska",
      "url": "www.www.wwwww",
      "likes": 1500,
      "__v": 0
    },
    {
      "_id": "5e98805b9f01973cc8d72bdc",
      "title": "Viisi pähkinää",
      "author": "Ellun kana",
      "url": "www.www.wwwww",
      "likes": 35000,
      "__v": 0
    }
]

const onePopular = [
  {
    "_id": "5e9871520a5f6f227c281c18",
    "title": "Testi-blogi",
    "author": "Maija Testaaja",
    "url": "https://fast.com",
    "likes": 3,
    "__v": 0
  },
  {
    "_id": "5e9879b27613ef27b8298af6",
    "title": "Kauneimmat ruokaohjeet",
    "author": "Matti Testaaja",
    "url": "www.www.wwwww",
    "likes": 5,
    "__v": 0
  },
  {
    "_id": "5e987da816017230449040d2",
    "title": "Autonrassaajan unelma",
    "author": "Ellun kana",
    "url": "www.www.wwwww",
    "likes": 1500,
    "__v": 0
  },
  {
    "_id": "5e98805b9f01973cc8d72bdc",
    "title": "Viisi pähkinää",
    "author": "Ellun kana",
    "url": "www.www.wwwww",
    "likes": 35000,
    "__v": 0
  }
]

//tests
describe('total likes', () => {

    test('When there are only one blog post', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(35000)
    })

    test('When there are no blogs', () => {
        const result = listHelper.totalLikes(emptyArray)
        expect(result).toBe(0)
    })

    test('Sum of longer list is right', () => {
        const result = listHelper.totalLikes(longList)
        expect(result).toBe(36508)
    })
})

describe('The most popular blog', () => {

    const twoOfTheSame = [
        {
          "_id": "5e9871520a5f6f227c281c18",
          "title": "Testi-blogi",
          "author": "Maija Testaaja",
          "url": "https://fast.com",
          "likes": 3,
          "__v": 0
        },
        {
          "_id": "5e9879b27613ef27b8298af6",
          "title": "Kauneimmat ruokaohjeet",
          "author": "Matti Testaaja",
          "url": "www.www.wwwww",
          "likes": 5,
          "__v": 0
        },
        {
          "_id": "5e987da816017230449040d2",
          "title": "Autonrassaajan unelma",
          "author": "Reiska",
          "url": "www.www.wwwww",
          "likes": 1500,
          "__v": 0
        },
        {
          "_id": "5e98805b9f01973cc8d72bdc",
          "title": "Viisi pähkinää",
          "author": "Ellun kana",
          "url": "www.www.wwwww",
          "likes": 1500,
          "__v": 0
        }
    ]

    test('No blogs return "no blogs -text"', () => {
        const result = listHelper.favoriteBlog(emptyArray)
        expect(result).toBe("No blogs")
    })

    test('Set of blogs return the one with highest likes', () => {
        const result = listHelper.favoriteBlog(longList)
        expect(result).toEqual({
            "title": "Viisi pähkinää",
            "author": "Ellun kana",
            "likes": 35000
          })
    })

    test('Of two identical like counts, returns the last', () => {
        const result = listHelper.favoriteBlog(twoOfTheSame)
        expect(result).toEqual({
            "title": "Viisi pähkinää",
            "author": "Ellun kana",
            "likes": 1500
          })
    })

})

describe('Most liked author', () => {

    test('Returns the one with most likes', () => {
      const result = listHelper.mostLikes(longList)
      expect(result).toEqual({
          "author": "Ellun kana",
          "likes": 35000
        })
    })

    test('Author has several posts', () => {
        const result = listHelper.mostLikes(onePopular)
        expect(result).toEqual({
            "author": "Ellun kana",
            "likes": 36500
          })
    })

    test('No blogs return "no blogs -text"', () => {
      const result = listHelper.mostLikes(emptyArray)
      expect(result).toBe("No blogs")
    })
})

describe('Most active author', () => {
  test('Returns the one with most blogs', () => {
    const result = listHelper.mostBlogs(longList)
    expect(result).toEqual({
        "author": "Ellun kana",
        "blogs": 1
      })
  })

  test('Returns the one with most blogs when several blogs from one author', () => {
    const result = listHelper.mostBlogs(onePopular)
    expect(result).toEqual({
        "author": "Ellun kana",
        "blogs": 2
      })
  })

  test('No blogs return "no blogs -text"', () => {
    const result = listHelper.mostBlogs(emptyArray)
    expect(result).toBe("No blogs")
  })
})
