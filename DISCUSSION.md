# Solace Advocates - Development Discussion

## 🚨 Initial Issues Identified

After setup, these are the issues I noticed right away:

- ❌ Search does not work
- ❌ Reset does not work  
- ⏱️ Noticeable delay in rendering Solace Advocates
- 🎨 Clunky UI that makes it difficult to distinguish which specialities are associated with which advocate
- 🎨 No styling/minimal styling

---

## 🐛 Client Side Errors

### Hydration Error
- **Issue**: Caused by wrapping `th` elements with `thead`
- **Fix**: Added a new `tr` element to wrap around the `thead` elements

### Missing Unique Keys
- **Issue**: No unique key prop added for advocates
- **Fix**: Key added as advocate id

- **Issue**: No unique key for specialities  
- **Fix**: Key added as advocate id + speciality

---

## ⚛️ React Issues

### Type Safety
- **Issue**: `document.getElementById("search-term")` possible null
- **Fix**: Type check to make sure search term is not null

- **Issue**: No type for advocates
- **Fix**: Added a new advocates type that matches the response from the server

### Search Functionality
- **Issue**: Search and Reset not working because `includes` method is being called on `yearsOfExperience` and it is not a string
- **Fix**: String conversion on `yearsOfExperience` added to code

- **Issue**: Phone number missing from search criteria
- **Fix**: Add phone number to search criteria

- **Issue**: Search not accounting for full name
- **Fix**: Edited filter to also check for fullname

### Error Handling & UX
- **Issue**: No error handling for fetch call in useEffect
- **Fix**: 
  - Switched to async/await for better readability
  - Added try/catch for error handling
  - Added a simple error message if fetch call fails
  - Maintain old advocates state if error? (consult with product)

- **Issue**: Noticeable delay in showing advocates
- **Fix**: Added loading state and simple loading message

- **Issue**: Search term and search bar not clearing on hitting reset button
- **Fix**: Added methods to handle clearing search bar and search term

### Code Quality
- **Issue**: Handler methods names too generic
- **Fix**: Renamed methods to be more specific

- **Issue**: No messaging if search results are not found
- **Fix**: Added a no results message to distinguish error vs no results found for the user

### Styling & UI
- **Issue**: No styling
- **Fix**: 
  - Added styling with Tailwind CSS library
  - Used AI to help implement quickly

### Component Architecture
- **Issue**: Too much TSX in one file
- **Fix**: Broke up TSX into separate components and imported them into `page.tsx` for better readability and maintainability

### Performance Optimization
- **Issue**: No `useMemo` or `useCallback` implemented for performance optimization
- **Fix**: 
  - **useMemo** implemented for the following:
    - Filtered advocates: only recalculates when advocates or searchTerm changes
    - Table headers: static content that does not change
    - Advocate rows: only rerenders when advocates data changes
    - Specialty badges: expensive array mapping only runs when advocate data changes
  - **useCallback** implemented for the following:
    - For event handlers to prevent unnecessary rerender of child components

---

## 🗄️ Backend Issues

### Database Setup Typing
- **Issue**: Mock db does not include insert, values, and returning methods
- **Fix**: TypeScript union type created to maintain mock db

### Database Connection Management
- **Issue**: Db connection created on every import with `setup()`
- **Fix**: 
  - Lazy initialization
  - Single instance
  - Reuse existing connection

### Connection Configuration
- **Issue**: Connection config lacking
- **Fix**: 
  - Added connection pooling max of 10
  - Added idle timeout of 20 sec
  - Added connect timeout of 10 sec

---

## 🚀 Future Improvements

### What I would do with more time:
- Further break down the TSX into reusable components
- Account for accessibility wherever it is currently lacking
- Improve search functionality by allowing search by multiple criteria

---

## 📈 Scalability Considerations

For large datasets, the current implementation would not work well.

If we had a large number of advocates we would need to implement **pagination**. This requires:

- Adding `page` and `limit` query params
- Reworking the API response to return a set number of advocates at a time
- We could also implement **virtualization** and only render a subset of advocates if we decided that was a better UX for our needs

Additionally, we would not want to handle filtering on the frontend for large datasets. Instead, implement a new **`/v1/search`** API that would do that on the backend for us. This search query could also use pagination as well.

To improve performance, create an **index** for common search terms like:
- `first_name`
- `city` 
- `last_name`
- etc.



