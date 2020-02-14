/// <reference types="cypress" />

context('Dashboard', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/individual', {
            onBeforeLoad: (win) => {
                win.sessionStorage.setItem('idUser', '5e440c3573b3288e8b80b2d0')
                win.sessionStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU0NDBjMzU3M2IzMjg4ZThiODBiMmQwIiwicm9sZSI6ImluZGl2aWR1YWwiLCJmaXJzdE5hbWUiOiJUZXN0IiwibGFzdE5hbWUiOiJUZXN0IiwiZW1haWwiOiJwb3BAb2Rkcy50ZWFtIiwiYmFua0FjY291bnROYW1lIjoiIiwiYmFua0FjY291bnROdW1iZXIiOiIiLCJ2YXQiOiJOIiwic2xhY2tBY2NvdW50IjoicG9wQG9kZHMudGVhbSIsInNpdGVJZCI6IjVjMGZjYTRmMGZkMmRmNzlkNGFkYzJjYSIsInByb2plY3QiOiJUZXN0IiwiY3JlYXRlIjoiMjAyMC0wMi0xMlQxNDozMToxNy4wNjVaIiwibGFzdFVwZGF0ZSI6IjIwMjAtMDItMTJUMTU6MTE6NDMuODkxWiIsImRhaWx5SW5jb21lIjoiNDUwMCIsImFkZHJlc3MiOiLguJfguJTguKrguK3guJoiLCJzdGF0dXNUYXZpIjpmYWxzZX0sImV4cCI6MTU4MTY3MTE2MX0.KyuiqJD-E6JoVZ00Nx1fiAvPDKug3LiIfWK1Rw0j8mQ')
                win.sessionStorage.setItem('firstName', 'Test')
            }
        })
    })

    it('should have INDIVIDUAL menu', () => {
        cy.get('#menu-content li:first a span')
            .should('have.text', 'INDIVIDUAL')
    })
})
