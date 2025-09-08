I built a React-based careers portal where the user can browse open jobs, filter them by department,location,or level, view detailed job description and apply using a form.
which also has a localstorage to store the data of the application form filled by the user to apply for the job,so that the data remains even after refreshing the page.

Implementation notes :
1.I used State(useState) to manage the search inputs,filters, and form fields so that everything updates dynamically as the user interacts with the app.
2. I used props to pass job details from the different components like job cards and application form, to make components reusable.
3. I added form validation for the required fields in the form to ensure that the user enters the valid details before submitting the form.
     After submitting the form it shows a success message and a button to return to the Careers page.
4.I implemented debounce on the search input so that the filtering will only happen when the user pauses typing,for smooth interface.
5. I used localstorage to save the details of the job application so that the data will remain even after the page is refreshed.
6. Array methods like map, filter, to apply search and filters, and also used some and includes to match tags in the search.
7.Routing is handled with the react router for navigating between the careers page and job details page.
