import { selector } from "../configs/data/AirBnbData";

export class AirBnbPage
{

//It visits the site
visitAirBnb(){
    cy.visit(('/'), {
        headers: {
        "User-Agent": "axios/0.18.0"
        }
    });
};

//It waits for the header to be loaded
waitForHeader(){
    cy.intercept('/api/v2/autosuggestions?*').as('loadingHeader');
    cy.wait('@loadingHeader');
};

//Click on “Anywhere”(top-center of the page)
clickOnAnywhere(){
    cy.get(selector.AnywhereBtn)
    .should('be.visible')
    .click();
};

//Input “Spain” in “Where” input field
inputWhere(){
    cy.get(selector.SearchDestinationInput)
    .type('Spain');
};

//Select “Spain” from the auto-completed dropdown-list 
//(which appears after you type spain) 
selectSpainFromDropDown(){
    cy.get(selector.DropdownChoice)
    .should('have.text','Spain')
    .click({ force: true });
};

//Complete the “Check in”/“Check out” start/end date from the calendar 
//with an interval-which includes the current date plus 4 more days 
//(for e.g 17 June - 21 June as interval section)
completeCheckInCheckOut(){
    cy.get(selector.CheckInDate)
    .click({ force: true });
    cy.get(selector.CheckOutDate)
    .eq(4)
    .click({ force: true });
};

//B. Check that the interval is selected
assertIntervalIsSelected(){
    cy.get(selector.CheckInField)
    .contains('Check in')
    .siblings()
    .invoke('text')
    .then(checkInDate => {
        cy.wrap(checkInDate)
        .should('not.equal', 'Add dates').as('checkInDate');
    })
    cy.get(selector.CheckOutField)
    .contains('Check out')
    .siblings()
    .invoke('text')
    .then(checkOutDate => {
        cy.wrap(checkOutDate)
        .should('not.equal', 'Add dates').as('checkOutDate');
    })
};

//C. Also check that the date before the interval(in this case 16) is disabled; 
assertDateBeforeIsDisabled(){
    cy.get(selector.UnavailableDate)
    .last()
    .should('have.attr', 'data-is-day-blocked', 'true');
};

//Click on “I’m flexible” option within the calendar
clickOnImFlexible(){
    cy.get(selector.FlexibleTab)
    .click({ force: true });
};

//Select “Weekend” option from “Stay for a week” section
selectWeekendOption(){
    cy.get(selector.WeekendBtn)
    .click({ force: true });
};

//D. Check the “When” section within the search and assert “Any weekend”
assertAnyWeekend(){
    cy.get(selector.AnyWeekendStatus)
    .should('contain','Any weekend');
};

//Click on “Choose dates” within the calendar
clickOnChooseDates(){
    cy.get(selector.ChooseDatesTab)
    .click({ force: true });
};

//E. Check that the interval is persisted and selected; 
assertIntervalIsPersisted(){
    cy.get('@checkInDate').then(checkInDate => {
        cy.get(selector.CheckInField)
        .contains('Check in')
        .siblings()
        .should('have.text', checkInDate);
    });
    cy.get('@checkOutDate').then(checkOutDate => {
        cy.get(selector.CheckOutField)
        .contains('Check out')
        .siblings()
        .should('have.text', checkOutDate);
    });
};

//8. After that click on “Search”
clickOnSearch(){
    cy.get(selector.SearchBtn)
    .click({ force: true });  
    this.assertMapIsLoaded;  
};

//It waits for the map to load
assertMapIsLoaded(){
    cy.get(selector.MapPriceTag)
    .should('be.visible');
};

//9. Hover over the first card
hoverOverFirstCard(){
    cy.get(selector.Card)
    .first()
    .trigger('mouseover', { force: true });
};

//F. Check that on the map, the price is highlighted for the hovered card and click on it; 
assertPriceIsHighlightedAndClick(){
    cy.get(selector.MapPriceTag)
    .first()
    .should('contain', 'selected')
    .click();
};

//Invoke and store the title, price and rating
invokeAndStoreData(){
    cy.get(selector.Card)
    .first()
    .parent()
    .parent()
    .find(selector.CardTitle)
    .invoke('text').as('title'); 
    cy.get(selector.Card)
    .first()
    .parent()
    .parent()
    .contains('lei')
    .invoke('text').as('price');
    cy.get(selector.Card)
    .first()
    .parent()
    .parent().then(rating => {
        if(rating.find(selector.CardRating).length > 0){
            cy.wrap(rating)
            .find(selector.CardRating)
            .invoke('text').as('rating');
        }
        else {
            cy.wrap(rating)
            .find(selector.CardNewNoRating)
            .invoke('text').as('rating');
        }
    });
};

// 11. Close the card
closeTheCard(){
    cy.get(selector.CloseBtn)
    .click({ multiple: true });
};

// 12. Go to “Filters”, click on it
clickOnFilters(){
    cy.contains('Filters').click();
};

// 13. For the “Type of place”, select Entire Place/Private room
selectTypeOfPlace(){
    cy.get(selector.EntirePlaceOption).check();
    cy.get(selector.PrivateRoomOption).check();
};

// 14. For the ‘Host language’, select “Japanese”
selectHostLanguage(){
    cy.get(selector.HostLanguagesSection)
    .then((japaneseCheck) => {
        if(japaneseCheck.find(selector.JapaneseLanguageOption).length > 0){
          cy.get(selector.JapaneseLanguageOption).check();
        }
        else {
          // in case there is no Japanese language available, the test will fail
          cy.log('NO JAPANESE HOST LANGUAGE AVAILABLE, SO THE TEST WILL FAIL ON PURPOSE!');
          cy.get(selector.JapaneseLanguageOption).should('be.visible');

        }
    });
};

// 15. Click on “Show <no.> stays” button (no in this case is 45>> Show 45 stays)
clickOnNumberOfStays(){
    cy.get(selector.FooterSection)
    .find(selector.StaysNumber)
    .click();
    this.waitForCall();
    cy.wait('@loadingStays')
};

waitForCall(){
    cy.intercept('/api/v3/MapsQuery*').as('loadingStays')
    // cy.request('GET', '/api/v3/MapsQuery*').then((resp) => {
    //     expect(resp.status).to.eq(200);
    // });
};
//H. Check that the total number of stays from the left-side of the page(top) matches
// the listed stays from each page(by navigating through each page). 
assertTotalNumberOfStays(){
    cy.get(selector.ElemOnPage)
    .its('length')
    .then(elementsPerPage => {
        cy.get(selector.NextPageBtn)
        .prev()
        .invoke('text').then(numberOfPages => {
                const elementsOnFullPages = (parseInt(numberOfPages) - 1) * (parseInt(elementsPerPage));
                cy.wrap(elementsOnFullPages).as('elementsOnFullPages');
        });
    });
    this.waitForCall();
    cy.get(selector.NextPageBtn)
    .prev().click();
    cy.get(selector.StaysNumber)
    .contains('stays')
    .invoke('text').then(numberOfStays => {
        cy.get('@elementsOnFullPages').then(elementsOnFullPages => {
            cy.get(selector.ElemOnPage)
            .its('length').then(elementsOnLastPage => {
                const elementsTotal = elementsOnFullPages + elementsOnLastPage;
                const numStays = (parseInt (numberOfStays));
                cy.wrap(numStays).should('eq', elementsTotal);
            });
        });         
    });
};       
            
//Also check that “Filters” has changed its status(a 3 is displayed there)
assertFiltersChangedStatus(){
    cy.contains('Filters').should('contain','filters applied');
};

}

export const airBnbPage = new AirBnbPage();
