# Reactive Poll UI

A reactive poll interface built with **Spring WebFlux** and **Angular**.
Users can fetch a poll (e.g., *“How do you build UI?”*), vote in real time (options include **Vue**, **React**, **Angular**, or **Other**), and instantly see live updates as other users cast their votes.

The server continuously streams vote updates (option counts) to all subscribed clients.
Users can select or deselect one or multiple options, and these choices are sent to the server.
The server aggregates the votes and broadcasts the updated counts to every connected user, ensuring all UIs stay in sync.

- Uses SSE (Server-Sent Events) for publishing (WebFlux) and subscribing (Angular)
- Enables fully reactive end-to-end data flow using Reactor on the backend and RxJS on the frontend

Inspired by *Beyond REST: Using Full-Stack Signals for Real-Time Reactive UIs by Leif Åstrand @ Spring I/O 2025* (https://www.youtube.com/watch?v=WLF_RSYXKz8&list=PLe6FX2SlkJdQ8jcbDZSFJWG7CPXMWi_yf&index=19)

---

[!poll-app](https://github.com/user-attachments/assets/e0f1fec9-9991-4ddb-94e3-4226bd65400b)

---

#### 1. Clone the repository
```bash
git clone https://github.com/coolioalexander/poll-app.git
```

#### 2. Start the containers
```bash
cd .
docker compose up -d
```

#### 3. Connect to server on port 4200 and vote 🎉
