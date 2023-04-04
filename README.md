#### officeworks fullstack code test

[Requests](https://bitbucket.org/ow-online/test-wayne-zhang/src/master/)

Author: Wayne

Frontend plan:

Backend plan:
  Backend should use Express due to OW majorly use express daily. I prefer to separate the backend into few components and folders. It includes: model, controller, routes and utility combined of all necessary and reuseable helper or functions.
  I would prefer axios to call fakestore APIs. It can create an instance which will make the code more clean and expandable with same base url, also easier to swap to other store APIs and make the app more maintainable.
  
  my APIs list
  1. x Get all products. (ordered by rate from high to low) 
  2. x Get top 5 rated products. (Homepage)
  3. x Get categories. (Category page)
  4. x Get products from single category. (Category page)
  5. x Get search result, it should use a filter to find matched result from No.1 all products api response.
  6. x Get product detail by product id. (Product page)
  7. x Post customer details, trigger mail system to sale person. (Enquiry page / Product page)