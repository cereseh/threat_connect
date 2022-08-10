import { airBnbPage } from "../PageObjects/AirBnbPage"


describe('airbnb practice test', () => {

  beforeEach(() => {
    airBnbPage.visitAirBnb();
    airBnbPage.waitForHeader();
  })
  it('airbnb site test', () => {
    airBnbPage.clickOnAnywhere();
    airBnbPage.inputWhere();
    airBnbPage.selectSpainFromDropDown();
    airBnbPage.completeCheckInCheckOut();
    airBnbPage.assertIntervalIsSelected();
    airBnbPage.assertDateBeforeIsDisabled();        
    airBnbPage.clickOnImFlexible();
    airBnbPage.selectWeekendOption();
    airBnbPage.assertAnyWeekend();    
    airBnbPage.clickOnChooseDates();  
    airBnbPage.assertIntervalIsPersisted();
    airBnbPage.clickOnSearch();
    airBnbPage.hoverOverFirstCard();
    airBnbPage.assertPriceIsHighlightedAndClick();
    airBnbPage.invokeAndStoreData();    
    airBnbPage.closeTheCard();      
    airBnbPage.clickOnFilters();
    airBnbPage.selectTypeOfPlace();
    airBnbPage.selectHostLanguage();  
    airBnbPage.clickOnNumberOfStays();
    airBnbPage.assertTotalNumberOfStays();
    airBnbPage.assertFiltersChangedStatus();                 
  });
});
