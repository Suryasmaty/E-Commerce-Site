describe("template spec", () => {
  it("passes", () => {
    // Visit the product page
    cy.visit("http://localhost:3000/");
    cy.get("header").contains("Sign In").click();

    cy.get("form input#formBasicEmail").type("jane@gmail.com");
    cy.get("form input#formBasicPassword").type("123456");
    cy.get("form button").contains("Sign In").click();

    cy.wait(3000);

    // Wait for the link with the text "Cannon EOS 80D DSLR Camera" to be visible and click it
    cy.visit("http://localhost:3000/product/6649e68008f2ceff86906adb")
      .contains("Add To Cart")
      .click();

    cy.contains("Proceed to Checkout").click();
  });
});
