## Library Management System

## Overview

A modular, microservices‑based **Library Management System** combining a **Spring Boot** backend (microservices) with a **React** frontend. The system separates core domains into independent services — **Book Service**, **Member Service**, and **Transaction Service** — each exposing RESTful APIs. DNS‑based routing and a null‑safe, filter‑based search enables scalable deployment and efficient, dynamic book lookup without external search engines. The React SPA provides a modern, responsive UI for catalog, user, and lending workflows.

## Key Features

- **Microservices Architecture** — Book, Member, and Transaction services deployed independently for scalability and maintainability.
- **Spring Boot Backend** — Domain‑driven services with **Model → Repository → Service → Controller** layers and RESTful endpoints.
- **React Frontend** — Single‑page application with pages for **Books, Members, Transactions, Login** and reusable UI components.
- **Filter‑based Search** — Null‑safe chained filters (id, title, author, genre, year, availability) for dynamic multi‑criteria queries without external search engines.
- **Transaction Management** — Borrow/return flows, auto‑assigned status (open/closed), overdue and upcoming due detection.
- **DNS Routing & Service Discovery** — Local DNS mapping for domain‑style routing.
- **Project Structure:**  
  - **Backend** - Spring Boot Framework
    - **Book** — contains the model, repository, service and controller files for Book Microservice.
    - **Member** — contains the model, repository, service and controller files for Member Microservice.
    - **Transaction** — contains the model, repository, service and controller files for Transaction Microservice.
    - **Application** — contains the main application file, `LibraryApplication.java`
  - **Frontend** - React
    - **src/components** — contains modular UI component files.  
    - **src/pages** — contains single‑page application (SPA) files.  
    - **src/services** — contains the service files that map to the backend APIs.  
    - `App.jsx` - defines the application's main routes.
