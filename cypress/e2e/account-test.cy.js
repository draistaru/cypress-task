describe('Banking Project - Customer Flow', () => {
  it('logs in, makes deposits, checks balance and transactions', () => {
    cy.visit('/#/login');

    // Client Login
    cy.contains('Customer Login').click();
    cy.get('#userSelect').select('Harry Potter');
    cy.get('button[type="submit"]').click();

    // Check if the login was successful
    cy.contains('Welcome Harry Potter').should('be.visible');

    const amounts = [100, 10, 5];

    amounts.forEach((amount) => {
      cy.contains('Deposit').click();
      cy.get('input[ng-model="amount"]').clear().type(amount);
      cy.get('button[type="submit"]').contains('Deposit').click();
      cy.get('.error').should('contain', 'Deposit Successful');
    });

    // Check balance after deposits
    cy.contains('Balance :').should('contain', '115');

    // Wait for transactions to load then go to page
    cy.wait(500);
    cy.contains('Transactions').click();
   

    // Get all amounts from transactions and check total
    let total = 0;
    cy.get('table tbody tr td:nth-child(2)').each(($el) => {
      total += Number($el.text());
    }).then(() => {
      expect(total).to.eq(115);
    });
  });
});