//Used to declare Data, to be used in the AirBnb site tests

let selector = {
    "AnywhereBtn": '[data-index="0"]',
    "SearchDestinationInput": '#bigsearch-query-location-input',
    "DropdownChoice": '[data-testid="option-0"]',
    "CheckInDate": '[aria-label*="Today"]',
    "CheckOutDate": '[data-is-day-blocked="false"]',
    "CheckInField": '[data-testid="structured-search-input-field-split-dates-0"]',
    "CheckOutField": '[data-testid="structured-search-input-field-split-dates-1"]',
    "UnavailableDate": '[data-is-day-blocked="true"]',
    "FlexibleTab": '[aria-controls="panel--tabs--1"]',
    "WeekendBtn": '#flexible_trip_lengths-weekend_trip',
    "AnyWeekendStatus": '[data-testid="structured-search-input-field-flex-dates"]',
    "ChooseDatesTab": '[aria-controls="panel--tabs--0"]',
    "SearchBtn": '[data-testid="structured-search-input-search-button"]',
    "MapPriceTag":'[data-veloute="map/markers/BasePillMarker"]',
    "Card": '[aria-labelledby*="title_"]',
    "CardTitle": '[id^="title_"]',
    "CardRating": '[aria-label*="Rating"]',
    "CardNewNoRating": '[aria-label="New place to stay"]',
    "CloseBtn": '[aria-label="Close"]',
    "EntirePlaceOption": 'input[name="Entire place"]',
    "PrivateRoomOption": 'input[name="Private room"]',
    "HostLanguagesSection": '[data-section-id="FILTER_SECTION_CONTAINER:HOST_LANGUAGE:TAB_ALL_HOMES"]',
    "JapaneseLanguageOption": 'input[name="Japanese"]',
    "FooterSection": 'footer',
    "StaysNumber": '[aria-live="polite"]',
    "ElemOnPage": '[itemprop="itemListElement"]',
    "NextPageBtn": '[aria-label="Next"]'
};

module.exports = {
    selector
};