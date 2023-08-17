# Routes Documentation

## Patient Routes


### Signup & Login Routes

### POST /signup/patient
- Purpose: Allows a patient to sign up for the application.
- Input: Request body with patient information (e.g., username, password, etc.).
- Output: If successful, returns the newly created user's details and authentication token in the response body.

### POST /login/patient
- Purpose: Allows a patient to log in.
- Input: Basic authentication credentials (username and password).
- Output: If successful, returns the user's details and authentication token in the response body. Also sets an HTTP cookie for the authentication token.

### GET /logout
- Purpose: Logs out the currently authenticated user.
- Input: None (uses the authentication token from the user's session).
- Output: Clears the authentication token cookie and redirects to the root path.
Patient Subscriptions Routes

### GET /patient/:username/physicians/subscriptions
- Purpose: Retrieves a list of all physicians subscribed by a patient.
- Input: Patient's username in the URL parameter.
- Output: Returns an array of subscription details (e.g., username, mobile number, email) in the response body.
Patient Profile Routes

### GET /patient/:username/profile
- Purpose: Retrieves the profile information of a patient.
- Input: Patient's username in the URL parameter.
- Output: Returns the patient's profile information (e.g., username, full name, gender, birthdate, etc.) in the response body.

### PUT /patient/:username/profile
- Purpose: Updates the profile information of a patient.
- Input: Patient's username in the URL parameter and updated profile information in the request body.
- Output: Returns the updated patient profile in the response body.

## Patient Appointment Routes

### GET /patient/:username/appointments
- Purpose: Retrieves all appointments for a specific patient.
- Input: Patient's username in the URL parameter.
- Output: Returns an array of appointment details for the patient.

### GET /patient/:username/physicians/:physicianUN/appointments
- Purpose: Retrieves all appointments for a specific patient with a specific physician.
- Input: Patient's username and physician's username in the URL parameters.
- Output: Returns an array of appointment details for the patient with the specified physician.

### GET /patient/:username/appointments/:id
- Purpose: Retrieves a specific appointment by ID for a patient.
- Input: Patient's username and appointment ID in the URL parameters.
- Output: Returns the details of the specified appointment.

## Patient Group Routes
### GET /patient/:username/groups
- Purpose: Retrieves all groups that a patient is a member of.
- Input: Patient's username in the URL parameter.
- Output: Returns an array of group details that the patient is a member of.
### GET /patient/:username/groups/:groupName
- Purpose: Retrieves details of a specific group that a patient is a member of.
- Input: Patient's username and group name in the URL parameters.
- Output: Returns the details of the specified group that the patient is a member of.

## Patient Group Posts Routes
### GET /patient/:username/groups/:id/posts
- Purpose: Retrieves all posts within a specific group that a patient is a member of.
- Input: Patient's username and group ID in the URL parameters.
- Output: Returns an array of posts within the specified group.

### GET /patient/:username/groups/:id/posts/:postID
- Purpose: Retrieves details of a specific post within a group that a patient is a member of.
- Input: Patient's username, group ID, and post ID in the URL parameters.
- Output: Returns the details of the specified post within the group.

## Patient Vitals Routes 

### POST /patient/:username/vitals
- Purpose: Adds vital sign data for a patient.
- Input: Patient's username in the URL parameter and vital sign data in the request body.
- Output: Returns the newly created vital sign record.

## GET /patient/:username/vitals
- Purpose: Retrieves all vital sign records for a patient.
- Input: Patient's username in the URL parameter.
- Output: Returns an array of vital sign records for the patient.

## GET /patient/:username/vitals/:id
- Purpose: Retrieves details of a specific vital sign record for a patient.
- Input: Patient's username and vital sign record ID in the URL parameters.
- Output: Returns the details of the specified vital sign record.

## PUT /patient/:username/vitals/:id
- Purpose: Updates a specific vital sign record for a patient.
- Input: Patient's username and vital sign record ID in the URL parameters, and updated vital sign data in the request body.
- Output: Returns the updated vital sign record.

## DELETE /patient/:username/vitals/:id
- Purpose: Deletes a specific vital sign record for a patient.
- Input: Patient's username and vital sign record ID in the URL parameters.
- Output: Returns a success message indicating that the record has been deleted.

## Patient History Routes

### GET /patient/:username/disease
- Purpose: Retrieves the medical history of a patient.
- Input: Patient's username in the URL parameter.
- Output: Returns the medical history records for the patient.

Patient Prescription Routes

### GET /patient/:username/prescriptions
- Purpose: Retrieves all prescriptions for a patient.
- Input: Patient's username in the URL parameter.
- Output: Returns an array of prescription records for the patient.

### GET /patient/:username/prescriptions/:id
- Purpose: Retrieves details of a specific prescription for a patient.
- Input: Patient's username and prescription ID in the URL parameters.
- Output: Returns the details of the specified prescription.

### GET /patient/:username/prescriptions/by/:physicianUN
- Purpose: Retrieves all prescriptions issued by a specific physician for a patient.
- Input: Patient's username and physician's username in the URL parameters.
- Output: Returns an array of prescription records issued by the specified physician.

## Patient Q&A Routes

### POST /patient/:username/Q&A

- Purpose: Allows a patient to post a question in the Q&A section.
- Input: Patient's username in the URL parameter and question data in the request body.
- Output: Returns the newly created question post.

### GET /patient/:username/Q&A
- Purpose: Retrieves all question posts posted by a patient in the Q&A section.
- Input: Patient's username in the URL parameter.
- Output: Returns an array of question posts by the patient.

### GET /patient/:username/Q&A/:id
- Purpose: Retrieves details of a specific question post in the Q&A section.
- Input: Patient's username and question post ID in the URL parameters.
- Output: Returns the details of the specified question post.

### PUT /patient/:username/Q&A/:id
- Purpose: Updates a specific question post in the Q&A section.
- Input: Patient's username and question post ID in the URL parameters, and updated question data in the request body.
- Output: Returns the updated question post.

### DELETE /patient/:username/Q&A/:id
- Purpose: Deletes a specific question post in the Q&A section.
- Input: Patient's username and question post ID in the URL parameters.
- Output: Returns a success message indicating that the post has been deleted.

## Chat Routes

### GET /patient/:username/chat/:physicianUN
- Purpose: Retrieves all chat messages between a patient and a specific physician.
- Input: Patient's username and physician's username in the URL parameters.
- Output: Returns an array of chat messages between the patient and physician.

### POST /patient/:username/chat/:physicianUN
- Purpose: Allows a patient to send a chat message to a specific physician.
- Input: Patient's username and physician's username in the URL parameters, and chat message data in the request body.
- Output: Returns the newly sent chat message.

### DELETE /patient/:username/chat/:physicianUN/:msgID
- Purpose: Deletes a specific chat message sent by a patient to a physician.
- Input: Patient's username, physician's username, and message ID in the URL parameters.
- Output: Returns a success message indicating that the message has been deleted.

### PUT /patient/:username/chat/:physicianUN/:msgID
- Purpose: Edits a specific chat message sent by a patient to a physician.
- Input: Patient's username, physician's username, and message ID in the URL parameters, and updated message data in the request body.
- Output: Returns the updated chat message.

## Rating Routes

### GET /patient/:username/rating/
- Purpose: Retrieves all ratings given by a patient.
- Input: Patient's username in the URL parameter.
- Output: Returns an array of rating records given by the patient.

### POST /patient/:username/rating/:physicianUN
- Purpose: Allows a patient to rate a specific physician.
- Input: Patient's username and physician's username in the URL parameters, and rating data in the request body.
- Output: Returns the newly created rating record.

### DELETE /patient/:username/rating/:id
- Purpose: Deletes a specific rating given by a patient.
- Input: Patient's username and rating ID in the URL parameters.
- Output: Returns a success message indicating that the rating has been deleted.

### PUT /patient/:username/rating/:id
- Purpose: Edits a specific rating given by a patient.
- Input: Patient's username, rating ID, and updated rating data in the request body.
- Output: Returns the updated rating record.



---
---

# Physician Routes



## Signup & Login Routes
### Route: POST /signup/physician

- Purpose: Allows a physician to sign up and create an account.
- Input: Physician's registration data in the request body.
- Output: Newly created physician's user object and authentication token.

### Route: POST /login/physician

- Purpose: Allows a physician to log in to their account.
- Input: Physician's login credentials (username and password) in the request body.
- Output: Authenticated physician's user object and authentication token. Sets a cookie with the authentication token.

### Route: GET /logout

- Purpose: Allows a physician to log out and invalidate their authentication token.
- Input: None.
- Output: Clears the authentication cookie and redirects to the homepage.

## Subscription Routes

### Route: GET /physician/:username/patients/:patientUN/subscribe

- Purpose: Allows a physician to subscribe a patient.
- Input: Physician's username and patient's username as URL parameters.
- Output: An array of subscriber objects (patients) for the physician. Returns an error if the patient is already a subscriber.

### Route: GET /physician/:username/patients/subscribers

- Purpose: Retrieve all subscribers (patients) of a specific physician.
- Input: Physician's username as a URL parameter.
- Output: An array of subscriber objects (patients) containing information about each patient's username, mobileNumber, emailAddress, gender, and fullName. Returns an error if there are no subscribers.

## Profile Routes

### Route: GET /physician/:username/profile

- Purpose: Retrieve a physician's profile information.
- Input: Physician's username as a URL parameter.
- Output: Physician's profile information, including username, fullName, gender, birthdate, and department. Returns a 404 error if the physician is not found.

### Route: PUT /physician/:username/profile

- Purpose: Update a physician's profile information.
- Input: Physician's username as a URL parameter and updated profile data in the request body.
- Output: Updated physician's profile information. Returns a 404 error if the physician is not found.

## Appointments Routes

### Route: POST /physician/:username/patients/:patientUN/appointments

- Purpose: Add an appointment to a patient by a physician.
- Input: Physician's username and patient's username as URL parameters. Appointment data in the request body.
- Output: Newly created appointment information.

### Route: GET /physician/:username/patients/:patientUN/appointments

- Purpose: Retrieve all appointments of a specific patient with a physician.
- Input: Physician's username and patient's username as URL parameters.
- Output: An array of appointment objects.

### Route: GET /physician/:username/appointments

- Purpose: Retrieve all appointments of a specific physician.
- Input: Physician's username as a URL parameter.
- Output: An array of appointment objects.

### Route: PUT /physician/:username/patients/:patientUN/appointments/:id

- Purpose: Update an appointment of a patient by a physician.
- Input: Physician's username, patient's username, and appointment ID as URL parameters. Updated appointment data in the request body.
- Output: Updated appointment information.

### Route: DELETE /physician/:username/patients/:patientUN/appointments/:id

- Purpose: Delete an appointment of a patient by a physician.
- Input: Physician's username, patient's username, and appointment ID as URL parameters.
- Output: Confirmation message with appointment details.

## Physician Groups Routes:

### GET /physician/:username/groups

- Purpose: Retrieve all groups owned by a physician.
- Input: username parameter in the URL.
- Output: JSON array of physician's groups.

### GET /physician/:username/groups/:id

- Purpose: Retrieve details of a specific group owned by a physician.
- Input: username parameter in the URL, id parameter in the URL.
- Output: JSON object representing the group.

### POST /physician/:username/groups

- Purpose: Create a new group owned by a physician.
- Input: username parameter in the URL, request body with group information.
- Output: JSON object representing the created group.

### PUT /physician/:username/groups/:id

- Purpose: Update details of a specific group owned by a physician.
- Input: username parameter in the URL, id parameter in the URL, request body with updated group information.
- Output: JSON object representing the updated group.

### DELETE /physician/:username/groups/:id

- Purpose: Delete a specific group owned by a physician.
- Input: username parameter in the URL, id parameter in the URL.
- Output: JSON response confirming the deletion.

### POST /physician/:username/patients/:patientUN/addtogroup/:groupName

- Purpose: Add a patient to a physician's group.
- Input: username parameter in the URL, patientUN parameter in the URL, groupName parameter in the URL.
- Output: JSON response confirming the addition of the patient to the group.
Physician Group Posts Routes:
### GET /physician/:username/groups/:id/posts

- Purpose: Retrieve all posts from a specific group owned by a physician.
- Input: username parameter in the URL, id parameter in the URL.
- Output: JSON array of group posts.
### POST /physician/:username/groups/:id/posts

- Purpose: Create a new post within a specific group owned by a physician.
- Input: username parameter in the URL, id parameter in the URL, request body with post information.
- Output: JSON object representing the created post.

### GET /physician/:username/groups/:id/posts/:postID

- Purpose: Retrieve details of a specific post from a group owned by a physician.
- Input: username parameter in the URL, id parameter in the URL, postID parameter in the URL.
- Output: JSON object representing the post.

### PUT /physician/:username/groups/:id/posts/:postID

- Purpose: Update details of a specific post from a group owned by a physician.
- Input: username parameter in the URL, id parameter in the URL, postID - parameter in the URL, request body with updated post information.
- Output: JSON object representing the updated post.

### DELETE /physician/:username/groups/:id/posts/:postID

- Purpose: Delete a specific post from a group owned by a physician.
- Input: username parameter in the URL, id parameter in the URL, postID parameter in the URL.
- Output: JSON response confirming the deletion of the post.

## Physician Vitals Routes:

### GET /physician/:username/patients/vitals

- Purpose: Retrieve vitals records of all patients associated with a physician.
- Input: username parameter in the URL.
- Output: JSON array of patients' vitals records.

### GET /physician/:username/patients/:PatientUN/vitals

- Purpose: Retrieve vitals records of a specific patient associated with a physician.
- Input: username parameter in the URL, PatientUN parameter in the URL.
- Output: JSON object representing the patient's vitals records.
Physician History Routes:

### GET /physician/:username/patients/disease

- Purpose: Retrieve disease history records of all patients associated with a physician.
- Input: username parameter in the URL.
- Output: JSON array of patients' disease history records.

### GET /physician/:username/patients/:patientUN/disease

- Purpose: Retrieve disease history records of a specific patient associated with a physician.
- Input: username parameter in the URL, patientUN parameter in the URL.
- Output: JSON object representing the patient's disease history records.

### POST /physician/:username/patients/:patientUN/disease

- Purpose: Add disease history records to a specific patient associated with a physician.
- Input: username parameter in the URL, patientUN parameter in the URL, request body with disease history information.
- Output: JSON object representing the added disease history records.

### PUT /physician/:username/patients/:patientUN/disease

- Purpose: Update disease history records of a specific patient associated with a physician.
- Input: username parameter in the URL, patientUN parameter in the URL, request body with updated disease history information.
- Output: JSON object representing the updated disease history records.




## Physician History Routes

### GET /physician/:username/patients/disease

- Input: :username (Physician's username)
- Output: Returns a list of patient history records for the physician.
- Purpose: Retrieve all patient history records associated with the physician.
### GET /physician/:username/patients/:patientUN/disease

- Input: :username (Physician's username), :patientUN (Patient's username)
- Output: Returns the patient's history records for the physician.
- Purpose: Retrieve a specific patient's history records associated with the physician.

### POST /physician/:username/patients/:patientUN/disease

- Input: :username (Physician's username), :patientUN (Patient's username), Request Body (History record data)
- Output: Creates a new patient history record.
- Purpose: Add a new patient history record for the specified patient and physician.

### PUT /physician/:username/patients/:patientUN/disease

- Input: :username (Physician's username), :patientUN (Patient's username), Request Body (Updated history record data)
- Output: Updates an existing patient history record.
- Purpose: Update an existing patient history record associated with the physician.

## Physician Prescriptions Routes

### GET /physician/:username/patients/prescriptions

- Input: :username (Physician's username)
- Output: Returns a list of all prescriptions created by the physician.
- Purpose: Retrieve all prescriptions associated with the physician.

### GET /physician/:username/patients/:patientUN/prescriptions

- Input: :username (Physician's username), :patientUN (Patient's username)
- Output: Returns a list of prescriptions for a specific patient and physician.
- Purpose: Retrieve prescriptions for a specific patient associated with the physician.

### POST /physician/:username/patients/:patientUN/prescriptions

- Input: :username (Physician's username), :patientUN (Patient's username), Request Body (Prescription data)
- Output: Creates a new prescription.
- Purpose: Add a new prescription for a specific patient and physician.

### PUT /physician/:username/patients/:patientUN/prescriptions/:id

- Input: :username (Physician's username), :patientUN (Patient's username), :id (Prescription ID), Request Body (Updated prescription data)
- Output: Updates an existing prescription.
- Purpose: Update an existing prescription for a specific patient and physician.

### DELETE /physician/:username/patients/:patientUN/prescriptions/:id

- Input: :username (Physician's username), :patientUN (Patient's username), :id (Prescription ID)
- Output: Deletes a prescription.
- Purpose: Delete a prescription for a specific patient and physician.

## Physician Q&A Routes

### POST /physician/:username/Q&A/:id/comments

- Input: :username (Physician's username), :id (Question/Answer ID), Request Body (Comment data)
- Output: Creates a new comment on a Q&A post.
- Purpose: Allow the physician to add a comment to a Q&A post.

### GET /physician/:username/Q&A/:id/comments

- Input: :username (Physician's username), :id (Question/Answer ID)
- Output: Returns a Q&A post with associated comments.
- Purpose: Retrieve a Q&A post along with its comments.
### GET /physician/:username/Q&A

- Input: :username (Physician's username)
- Output: Returns a list of all Q&A posts along with their comments.
- Purpose: Retrieve all Q&A posts along with comments.
### PUT /physician/:username/Q&A/:id/comments/:commentID

- Input: :username (Physician's username), :id (Question/Answer ID), :commentID (Comment ID), Request Body (Updated comment data)
- Output: Updates an existing comment on a Q&A post.
- Purpose: Allow the physician to update their own comment on a Q&A post.

### DELETE /physician/:username/Q&A/:id/comments/:commentID

- Input: :username (Physician's username), :id (Question/Answer ID), :commentID (Comment ID)
- Output: Deletes a comment on a Q&A post.
- Purpose: Allow the physician to delete their own comment on a Q&A post.

## Physician Chat Routes

### GET /physician/:username/chat/:patientUN

- Input: :username (Physician's username), :patientUN (Patient's username)
- Output: Returns all messages exchanged between the physician and a specific patient.
- Purpose: Retrieve all messages between the physician and a patient.
### POST /physician/:username/chat/:patientUN

- Input: :username (Physician's username), :patientUN (Patient's username), Request Body (Message data)
- Output: Creates a new message from the physician to the patient.
- Purpose: Allow the physician to send messages to a patient.

### DELETE /physician/:username/chat/:patientUN/:msgID

- Input: :username (Physician's username), :patientUN (Patient's username), :msgID (Message ID)
- Output: Deletes a message.
- Purpose: Allow the physician to delete their own message sent to a patient.

### PUT /physician/:username/chat/:patientUN/:msgID

- Input: :username (Physician's username), :patientUN (Patient's username), :msgID (Message ID), Request Body (Updated message data)
- Output: Updates an existing message.
- Purpose: Allow the physician to edit their own message sent to a patient.

## Physician Rate Routes

### GET /physician/:username/rating/

- Input: :username (Physician's username)
- Output: Returns a list of ratings given to the physician along with the average rating.
- Purpose: Retrieve ratings given to the physician and calculate the average rating.

## Physician Notification Routes

### GET /physician/:username/notifications
- Input: :username (Physician's username)
- Output: Returns notifications for the physician's subscribers.
- Purpose: Retrieve notifications for the physician's subscribed patients.



