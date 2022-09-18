## Fixes
[] Submit button needs to be dynamic for all pages

## Improve existing functionality
[] Get paragraphs to work in CourseDetail. Currently they morph into a giant paragraph after creating a course.
[] In CourseDetails, update the string helper function to accept other separators ( , ; )
[] dynamically display `Title` in `Header.js`
[] test all error handling

## Improve design
[] add active classes for header links
[] improve signup and signin validation errors display

## New features
[] implement loading feature for components
[] delete course confirmation
[] random id generator for courses
[] display warning for delete course

## Refactoring
[] refactor createCourse component to useState user (like UpdateCourse) instead of individual states
[] refactor handleSubmit since it's duplicated?
[] function components with many different states - convert to class (CourseDetail, UpdateCourse, etc)?
[] refactor createCourse inputs without refs
[] modularize functions in App.js?
[] refactor post requests
[] Why do we need a separate state for courseUser? Seems like another async operation on top of retreiving the course?

## User Authentication
[] email authentication for user signup
[] confirm password
[]
