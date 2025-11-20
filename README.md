# Node.js Base Controller & Service Architecture

This project provides a **BaseController and BaseService architecture** for Node.js applications using Express and Prisma. It is designed to simplify CRUD operations, media handling, and relationships between models. Child controllers only need to extend the base controller and pass configuration — no need to rewrite repetitive logic.

---

## Features

- **BaseController** handles all CRUD operations for a resource:
  - Create, Read (all/by ID), Update, Delete
  - Optional media handling (upload, attach, replace, delete)
  - Supports related models in queries
  - Configurable default ordering
- **BaseService** provides generic data access methods using Prisma
- **MediaService** handles file attachments and associations
- **Child controllers** only need to extend BaseController with configuration parameters

---

## Architecture Overview

```text


┌─────────────────────┐
│   route │  make vaildation here
│                     │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│   Child Controller  │  <-- Extends BaseController
│  (e.g., EcosystemReleaseController)
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│    BaseController   │
│  - CRUD operations  │
│  - Media handling   │
│  - Related models   │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│     BaseService     │
│  - Generic DB ops   │
│  - CRUD via Prisma  │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│    MediaService     │
│  - Attach / Replace │
│  - Fetch / Delete   │
└─────────────────────┘
