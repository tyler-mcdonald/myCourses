## Fix issues
[DONE] Submit button needs to be dynamic for all pages
[DONE] update course button should go back to course view
[DONE] change auth in all components to be dynamic
[DONE] make sure put requests are dynamic
[DONE] '/courses/:id/update' direct url access issue
[DONE] updateCourseData needs dynamic userId

## Refactor
[DONE] refactor createCourse component to useState user (like UpdateCourse) instead of individual states
[DONE] function components with many different states - convert to class (CourseDetail, UpdateCourse, etc)?
[DONE] refactor createCourse inputs without refs
[] refactor post requests
[] Why do we need a separate state for courseUser? Seems like another async operation on top of retreiving the course?
[] convert functions to async await
[] axios requests instead of fetch
[] make urls variables instead of strings (pass url into function)
[] store all api urls in separate file
[] modularize all api routes?

## Improve existing functionality
[] Get paragraphs to work in CourseDetail. Currently they morph into a giant paragraph after creating a course.
[] In CourseDetails, update the string helper function to accept other separators ( , ; )
[] dynamically display `Title` in `Header.js`
[] test all error handling
[] keep url the same while displaying NotFound instead of redirecting to /notfound
    * conditionally render NotFound 
    * ```const courseExists = Object.keys(course).length > 1; // Check if `course` is empty or contains only a `message` key```
[] add error handling to all api requests

## Improve design
[] add active classes for header links
[] improve signup and signin validation errors display

## Add new features
[] implement loading feature for components
[] delete course confirmation
[] random id generator for courses
[] display warning for delete course
[] email authentication for user signup
[] confirm password
[] securely store passwords

