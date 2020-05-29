describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user = {
            username: 'testi',
            name: 'Testman',
            password: 'testitesti'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)

        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('Log in to application')
    })

    describe('Login', function() {
        it('succesfull with correct credentials', function() {
            cy.get('#username').type('testi')
            cy.get('#password').type('testitesti')
            cy.get('#login').click()

            cy.contains('Testman is logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('testi')
            cy.get('#password').type('vaara')
            cy.get('#login').click()

            cy.get('.bad').should('contain', 'wrong username or password')
                .and('have.css', 'background-color', 'rgb(240, 128, 128)')
                .and('have.css', 'border-color', 'rgb(255, 0, 0)')

            cy.get('html').should('not.contain', 'Testman is logged in')    
        })
    })

    describe('When logged in ', function() {
        beforeEach(function() {
            cy.login({username: 'testi', password: 'testitesti'})
        })

        it('new blog can be created', function() {
            cy.contains('New blog').click()
            cy.get('#title').type('Tämäkin blogi on tässä')
            cy.get('#author').type('Testaajien testaaja')
            cy.get('#url').type('www.fast.com')
            cy.contains('create new blog').click()

            cy.get('.blogname').contains('Tämäkin blogi on tässä')
            cy.get('.blog').contains('Testaajien testaaja')
        })

        it('blog can be removed by the user', function() {
            cy.add_blogpost({
                title: 'Blogi 1',
                author: 'Author 1',
                url: 'Url 1',
                likes: 0
            })

            cy.contains('view').click()
            cy.contains('Remove').click()

            cy.get('html').should('not.contain', 'Blogi 1')
        })

        it.only('blogs are in descending order', function() {
            cy.add_blogpost({
                title: 'Blogi 1',
                author: 'Author 1',
                url: 'Url 1',
                likes: 1
            })
            cy.add_blogpost({
                title: 'Blogi 2',
                author: 'Author 2',
                url: 'Url 2',
                likes: 2
            })
            cy.add_blogpost({
                title: 'Blogi 3',
                author: 'Author 3',
                url: 'Url 3',
                likes: 3
            })

            cy.get('.blogname:first').contains('Blogi 3')
            cy.get('.blogname:last').contains('Blogi 1')
        })
        
    })
})