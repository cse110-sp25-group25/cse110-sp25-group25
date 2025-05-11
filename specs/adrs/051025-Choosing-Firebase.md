| **status** | **date** | **decision-makers** | **consulted** | **informed** |
| --- | --- | --- | --- | --- |
| Proposed | 05-10-2025 | Evan, Harry | Shelby (Will be consulted through this ADR document) | Developer team (Evan, Harry, Harrison, Kate, Ethan, Kalkin, Joshua, Nathan), Kevin |

# Choosing Firebase for Database

## **Context and Problem Statement**

For the backend, we need an database that can be automatically updated and integrated with our web application.

## **Decision Drivers**

- Easy setup for rapid development and local use
- User-specific data (restaurants saved in collection)
- Real-time feedback based on user interactions (e.g. swiping/saving restaurants, removing restaurants)
- Able to use on a limited scale, not aiming to support thousands of users

## **Considered Options**

- Firebase
- MongoDB
- Local JSON File/localStorage

## **Decision Outcome**

**Chosen option**: Firebase, because it allows quick setup, real-time data updates, and database storage in a fully managed way. This is also a recommended tool for prototype running and student projects because of its ease of use.

## **Consequences**

- **Good**, because Firebase makes authentication (stretch goal), database operations, and syncing very simple and requires no backend setup
- **Good**, because Firebase supports real-time listeners for saved restaurant interactions
- **Good**, because Firebase’s local emulator suite allows us to simulate the entire backend without deploying to the cloud
- **Bad**, because we are introducing a new dependency into our project, which makes us dependent on the Firebase Software Development Kit
- **Bad**, because there is a learning curve associated with using a new tool like Firebase

## **Confirmation**

- Swiping logic and collection-saving features will be tested manually and with simple unit tests in Jest
- Code review and data inspection through Firebase Emulator UI and CI/CD pipeline will help ensure that features align with the intended architecture
- No deployment or cloud provisioning will be used since everything will be local at first, so no confirmation is needed here

## **Pros and Cons of the Options**

### Firebase

- **Good**, because the Emulator Suite allows fully local development
- **Good**, because Firestore is easy to integrate with a frontend app
- **Good**, because swiping and collection-saving can be backed by real-time listeners
- **Bad**, because app design becomes dependent on Firebase SDK conventions
- **Neutral**, since it's not deployed, Firebase's free tier and pricing aren't relevant

### MongoDB

- **Good**, because MongoDB is flexible and document-based, which suits restaurant and user data well
- **Good**, because MongoDB can be run locally with minimal setup (via MongoDB Community Server or Docker)
- **Bad**, because of the larger learning curve
- **Bad**, because real-time capabilities require extra setup (e.g. via change streams or polling)

### Local JSON File/localStorage

- **Good**, because it's the most lightweight and requires no backend at all
- **Bad**, because it doesn't support user accounts or persistent shared state
- **Bad**, because data is not portable or queryable across sessions or devices

## **More Information**

Firebase Emulator Suite documentation: https://firebase.google.com/docs/emulator-suite

Restaurant data will be fetched from an external API and put into Firestore manually or via a script.
