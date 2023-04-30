# Kotlibes

Kotlibes is a planned AI marketing application for small and medium businesses, developed as a student final-year project (projet de fin dÃ¢â‚¬â„¢ÃƒÂ©tude).

## Planned architecture

- `frontend/`: React application.
- `backend/`: PHP REST API (planned for a later phase).
- `database/`: MySQL/MariaDB schema (planned for a later phase).

## Planned development sequence

1. Project documentation, React foundation, public metadata, fonts, and shared styling.
2. Landing page and account workflows.
3. PHP API and database integration.
4. Marketing tools, dashboard, and subscription workflows.
5. Integration and final documentation, ending February 27, 2024.

This milestone contains the React, database and backend foundations only. See RECONSTRUCTION.md for the retrospective dating and source provenance.

## Phase 1 status

The React mounting entry, minimal root class, Bootstrap stylesheet, public metadata and icons, Centra fonts, and global foundation styles are present. Feature routes and implementations remain planned.

Frontend commands and configuration are documented in `frontend/myapp/README.md`. Build verification and deferred dependencies are recorded in RECONSTRUCTION.md.

## Phase 2 status

The users schema, PDO connection class with credential placeholders, bcrypt password helpers and frontend backend-address configuration are present. Registration/login are introduced in Phase 3; later tables remain planned. Local setup and preserved source limitations are documented in `backend/README.md`.

## Phase 3 status

The /login page now stages supplied signup/login forms, validation, requests and browser account state. Registration and account-only login endpoints are included. Billing, recovery, shared navigation and dashboard implementation remain deferred. Dashboard redirects currently have no destination route. Successful registration stays on the form until checkout is introduced. Runtime verification limitations and source adjustments are in RECONSTRUCTION.md.

## Phase 4 status

/settings, /reset-password and /changepassword introduce supplied profile management, settings password changes and recovery. Email remains read-only in settings. The account sidebar links only to settings; dashboard/tools/billing remain deferred. Recovery is a preserved historical implementation with documented expiry, token ownership and reuse enforcement gaps; see RECONSTRUCTION.md for source provenance and actual checks.
