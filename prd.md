User: create a prd for a simple event app (orgenizer and user)

Workspace: Sure, here's a proposed directory structure for a project app:


Create Workspace...

User: just prd

GitHub Copilot: # Product Requirements Document  
**Simple Event App**  
*Roles: Organizer & User*

---

## 1. Overview  
A lightweight web/mobile application that allows event organizers to create and manage events and end‑users to discover, register for and attend those events. The app should be easy to use and require minimal setup.

---

## 2. Objectives  
* Enable organizers to publish events with basic details.  
* Allow users to browse, search and register for events.  
* Provide a clear distinction between organizer and user functionalities.  
* Support basic authentication and data persistence.

---

## 3. Stakeholders  
* **Product owner** – defines requirements and priorities.  
* **Developers** – build and maintain the app.  
* **Event organizers** – create and manage events.  
* **End users** – browse and attend events.  

---

## 4. User Roles & Personas

### Organizer  
* Sign up / log in.  
* Create, edit, cancel events.  
* View list of attendees per event.  
* Manage own profile.

### User  
* Sign up / log in.  
* Browse upcoming events.  
* Search or filter by category/date/location.  
* Register/unregister for events.  
* View personal registration history.

---

## 5. Functional Requirements

1. **Authentication**  
   * Email/password sign up and login for both roles.  
   * Role assignment (organizer or user) at registration or via admin.

2. **Event Management (Organizers)**  
   * Create event with title, description, date/time, location, capacity, optional image.  
   * Edit or delete own events.  
   * Mark event as cancelled.  
   * View attendee list (names, emails).

3. **Event Discovery (Users)**  
   * List all upcoming events.  
   * Search/filter by keyword, date range, category or location.  
   * View event details page.

4. **Registration**  
   * Register for an event (respect capacity limit).  
   * Cancel registration.  
   * Receive confirmation notification (email or in‑app).

5. **Profiles**  
   * View/edit basic profile information (name, contact).  
   * Organizer profile includes events created.

6. **Notifications** (optional/basic)  
   * Notify users of event changes or cancellations.  
   * Notify organizer when registrations occur.

---

## 6. Non‑Functional Requirements

* **Performance:** page loads within 2 seconds on mobile/desktop.  
* **Scalability:** support hundreds of events and users.  
* **Security:** protect user data; passwords hashed.  
* **Usability:** responsive UI; accessible.  
* **Reliability:** database backups; handle concurrent registrations gracefully.  
* **Maintainability:** modular codebase, documented API.

---

## 7. Constraints & Assumptions

* No payment processing.  
* Single language (e.g. English) initially.  
* Data stored in a simple relational or document database.  
* Deployment to a single server or cloud service.

---

## 8. Success Metrics

* Number of events created.  
* User registration and attendance rates.  
* Time to complete event creation or registration.  
* Error/bug reports minimal.

---

## 9. Future Enhancements (out of scope initially)

* Social login.  
* Event categories/tags.  
* Ticketing and payments.  
* Calendar integration.  
* Admin dashboard for overall metrics.

---

This PRD defines the minimal viable product for a simple event application supporting two user roles: organizer and user.