
# Backend Design Document  
**Stack:** Node.js, Express, MongoDB (Mongoose ODM)

## 1. Architecture Overview  
- **RESTful API** in Express; JSON payloads.  
- **MongoDB** as the data store, using Mongoose for schema/validation.  
- **JWT**-based authentication.  
- **Role‑based access control** (“organizer”, “user”).  
- **Environment config** via `.env` (e.g. `MONGO_URI`, `JWT_SECRET`).

## 2. Data Models (Mongoose schemas)

### User
```js
{
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  name: String,
  role: { type: String, enum: ['user','organizer'], default: 'user' },
  createdAt: Date
}
```

### Event
```js
{
  title: String,
  description: String,
  date: Date,
  location: String,
  capacity: Number,
  imageUrl: String,
  organizer: { type: ObjectId, ref: 'User' },
  attendees: [{ type: ObjectId, ref: 'User' }],
  status: { type: String, enum: ['active','cancelled'], default: 'active' },
  createdAt: Date
}
```

### Registration (optional separate collection)
Could embed in `Event.attendees` or use its own collection to track timestamps.

## 3. API Endpoints

### Authentication
1. `POST /api/auth/signup` – create user/organizer.  
2. `POST /api/auth/login` – returns JWT.

### Users
- `GET /api/users/me` – profile.  
- `PUT /api/users/me` – update profile.

### Events
- `GET /api/events` – list, supports query params (`search`, `dateFrom`, `dateTo`, `location`).  
- `GET /api/events/:id` – event details.  
- `POST /api/events` – **organizer only**, create event.  
- `PUT /api/events/:id` – **organizer only**, modify own event.  
- `DELETE /api/events/:id` – **organizer only**, cancel/delete event.

### Registrations
- `POST /api/events/:id/register` – **user only**, add attendee (check capacity).  
- `DELETE /api/events/:id/register` – cancel registration.  
- `GET /api/events/:id/attendees` – **organizer only**, list attendees.

### Misc
- `GET /api/organizers/:id/events` – events by organizer.

## 4. Middleware

- **authMiddleware** – verify JWT, attach `req.user`.  
- **roleMiddleware** – enforce role/ownership (e.g. only organizer can modify own event).  
- **errorHandler** – centralized error formatting.

## 5. Database & Persistence

- Use **MongoDB Atlas** or local instance.  
- Define indexes: e.g. `events.date`, `events.organizer`, text index on `title`/`description` for search.  
- Use transactions for registration to decrement capacity and add attendee safely.

## 6. Security

- Passwords hashed with **bcrypt**.  
- JWT tokens with reasonable expiration (e.g. 1h).  
- Validate & sanitize request data (e.g. via Joi or express-validator).  
- CORS configured for frontend origin.

## 7. Notifications (future/basic)

- Bare‑bones notifications can be stored in a `notifications` collection or sent via email (e.g. using Nodemailer).  
- Fire events on registration/cancellation using an event emitter.

## 8. Deployment & Dev Workflow

- `npm scripts`: `start`, `dev` (with nodemon), `lint`, `test`.  
- Environment variables for connection and secrets.  
- Integration tests using **jest** / **supertest**.

## 9. Error Handling & Logging

- Log to console or integrate with a service (Winston / Morgan for request logging).  
- Return standardized API error responses `{ error: 'message', code }`.

## 10. Scaling & Extensibility

- Stateless API – can scale horizontally.  
- Add caching layer (Redis) for frequent queries.  
- Separate service for notifications or analytics later.

---

This design provides a solid foundation for the backend service, meeting the PRD’s functional and non‑functional requirements while remaining lightweight and easy to extend.