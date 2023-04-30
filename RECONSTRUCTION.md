# Reconstruction record

This repository's dated sequence reconstructs an estimated implementation order from an existing project snapshot. Assigned dates are not verified original development dates. Source and dependency versions come from the supplied snapshot.

## Boundaries

Phase 1: January 1â€“31, 2023 â€” project foundation. The overall reconstruction ends February 27, 2024. No February implementation is included in this phase.

The owner authorized replacement of the earlier full-project root commit. Complete original-source and published-repository snapshots, including their histories, remain outside this tracked repository.

Dates use UTC. Noon is a fixed reconstruction convention, not evidence of actual work times. Same-day commits share that timestamp; their parent order records the sequence. The repository's existing configured author identity is retained.

## Source staging and exclusions

Only React foundation files, public metadata, Centra fonts, and applicable global styles enter this phase. The original complete App.js, App.css, package manifest, lockfile, and README remain in the preserved snapshots for later phases. App.js is reduced to its supplied React class structure with an empty root container; feature routes are deferred.

Package metadata, dependencies, and scripts are staged separately. React, ReactDOM, and react-scripts are needed for the foundation; Bootstrap is added with its stylesheet integration. Existing version ranges are retained. They are snapshot versions, not claims about availability in January 2023. The full application lockfile and feature dependencies are deferred; no newer dependencies are installed.

Public HTML retains supplied metadata and root markup; routing recovery, payment checkout, and chat scripts are deferred. The logo192/logo512 public icons and favicon are included; the navigation logo and all feature assets are deferred because the root does not use them.

Credential notes, local environment files, database passwords, payment keys, and email-service credentials are excluded. No backend or database implementation enters Phase 1. The published snapshot had credentials replaced and SQL data rows removed; the complete local supplied snapshot preserves the original files privately.

## Schedule adjustments

January 23 responsive-style commit omitted: supplied media queries are feature-specific and do not apply to the empty foundation. January 27 asset commit omitted: no additional asset is referenced by this foundation. Result: 20 meaningful commits across nine active days. No empty commits are used.

## Phase 1 inventory and verification

Included: root README and ignore rules; frontend setup README and staged package manifest; public HTML, manifest, robots, favicon and two logo icons; React mounting and minimal root class; Bootstrap integration; three Centra font files; supplied font, global reset, scrolling, scrollbar, body and heading rules.

Verified byte-for-byte against the preserved snapshot: frontend README, mounting entry, manifest, robots, icons, and three fonts. CSS blocks were extracted verbatim from the supplied global sections; dependencies and npm scripts retain their supplied values. App.js adaptation and public-script exclusions are described above. Every commit's staged paths and diff summary were checked for phase scope; imported textual candidates were scanned for credential signatures. Backend, database, feature pages, account/tool/dashboard/billing styles, and local credential files are absent from tracked Phase 1 content.

Build attempt: Node was invoked against the React Scripts build entry. It failed with MODULE_NOT_FOUND because node_modules/react-scripts is not installed. No successful build is claimed. No new dependency versions were installed or generated lockfile published. Full build validation remains pending installation of suitable snapshot dependencies; the supplied version ranges alone do not provide reproducible transitive resolution for this reduced manifest.

Foundation dependencies included: react, react-dom, react-scripts, bootstrap. No additional package is required by the current foundation source. Remaining setup: installed dependencies and a reviewed phase-specific lockfile. All other supplied packages and the full application lockfile are deferred until their code enters later phases.

The final sequence has 20 commits on January 1, 3, 6, 9, 12, 16, 19, 23, and 31; each day has at most three commits. Author and committer dates use the same UTC convention. The sequence stops after Phase 1.

## Phase 2: February 1â€“28, 2023 â€” database and backend foundation

Continues Phase 1 on main with assigned UTC noon timestamps and the configured Git identity. Existing January commits and original snapshots remain unchanged. Dates describe reconstruction order, not verified original activity.

Introduced the supplied SQL initialization/charset restoration and users table incrementally; the final table matches the snapshot. The supplied dump header, including its 2026 generation date, remains intact as source provenance. It is not claimed to be an original 2023 dump. No dump was executed.

Introduced the active DbConnect class in configuration, PDO, then options/error-handling sections. Host, database name, username and password are placeholders from the sanitized snapshot. The inactive commented-out duplicate class was omitted; active headers, private properties, DSN, error mode, return and catch behavior remain supplied. Intermediate staging is superseded by the final source-derived class.

Introduced password hashing and verification separately; final password.php is the supplied file. BaseURL.js is copied unchanged, with default http://localhost:80 and alternative addresses only in comments. No deployment abstraction is added.

Registration/login endpoints remain deferred to Phase 3. Password reset tables are deferred to Phase 4; tools and usage tables to Phase 8; subscriptions and variants to Phase 9; newsletter to Phase 10. No later tables, account pages or features enter this phase.

### Phase 2 inventory and actual verification

Files introduced: database/schema.sql, backend/DbConnect.php, backend/password.php, backend/README.md, frontend/myapp/src/components/BaseURL.js. Root README and this record were updated.

Source checks passed: final users CREATE/DROP and applicable initialization/closing sections match normalized supplied text; exactly nine supplied user fields and only one table are present. No seed data, foreign keys, invented indexes or later tables are included. Password helpers and BaseURL match snapshot bytes; the active DbConnect section matches normalized source apart from the documented PHP opening wrapper and prior credential substitutions. Every staged diff was reviewed for allowed paths and credential signatures.

Node checked BaseURL.js syntax as an ES module and imported the supplied configuration in isolation; default export resolved to http://localhost:80. No account-page wiring was introduced.

PHP syntax checks unavailable: no PHP runtime found on PATH or in the checked local installation paths. No PHP execution is claimed.

No live database connection or SQL import was attempted; a configured PHP/PDO/MySQL environment is required for runtime verification. The Phase 1 frontend dependency/build limitation remains. No new frontend dependency is required by this constant export.

Schedule: 12 nonempty commits on February 2, 5, 9, 13, 17, 21, 25 and 28. At most two commits per active day, matching UTC author and committer dates, following the unchanged January history. Phase 2 stops here.

## Phase 3: March 1–31, 2023 — registration and login

32 meaningful commits across the 20 assigned active days, using the configured Git author and UTC noon reconstruction convention. January and February ancestry remains unchanged. Assigned dates are not verified original development activity.

Registration index.php matches the supplied snapshot byte for byte, preserving initialization, POST JSON parsing, duplicate-email status 0, bcrypt helper invocation, prepared insertion, profile response, success status 1 and failure status 0. Client request data contains the supplied password input; the source's comment about sending a hashed password does not change this actual behavior. No additional validation or email verification was added.

Login endpoint retains supplied initialization, email1/password1 parsing, user lookup, password verification, status 0 success and status 1 incorrect credentials. Subscription lookup, remaining-day calculations and billing response fields are deferred to Phase 9; the successful response retains name/email/id/phone/tokens/plan from users. The complete original login endpoint remains in the preserved snapshot for exact later restoration.

Signin is assembled from the supplied state, inputs, validation, feedback, Axios requests, account storage and mode overlay. Registration success retains profile storage but checkout/co state and its redirect are deferred to Phase 9; successful signup therefore remains on the form at this milestone. The March 17 navigation entry is represented by profile storage rather than introducing unavailable checkout behavior. Signup query selection is retained during March 31 reconciliation. Login storage retains n/e/i/p/t and au=True; subscription storage pl/ca/ra/cb/clf/rd and its remainingDays conversion are deferred to Phase 9. The original success/error console feedback is retained, not replaced with new feedback. The auth flag check and successful login keep the original /dashboard navigation, but no dashboard route exists yet; that destination is intentionally incomplete until its phase. Auth is a browser-stored flag, not a secure server-side session. The supplied render-time auth navigation behavior is retained.

LoginPage retains its supplied wrapper and Signin usage with shared NavBar omitted pending the navigation phase. Password recovery link and its CSS are deferred to Phase 4. App contains only the supplied /login route and router scaffolding; no later pages are imported. Components.js and Loader.js are imported unchanged as account UI dependencies; the supplied account media queries and loader CSS are extracted without adding later feature styles. Existing responsive selector mismatches are not corrected.

Added supplied version ranges for axios, react-router-dom and react-secure-storage. styled-components is absent from the supplied package manifest but required by Components.js; its ^5.3.6 range is taken from the supplied lockfile root dependency record (resolved 5.3.6). No newer versions are installed and no historical availability is claimed. Full app dependencies and lockfile remain deferred.

Source checks: registration endpoint, Components and Loader match snapshot bytes; LoginPage matches its documented navbar omission; login matches the documented subscription-stripped sections. All introduced local imports resolve and external imports have manifest dependencies. Source-derived account blocks and route selection were reviewed; no reset/settings/dashboard/billing implementations or later database tables enter the phase. Every staged diff was checked for path scope and credential signatures. No credentials were introduced.

PHP syntax checks unavailable: no PHP runtime found. No PHP or endpoint execution is claimed.

Frontend build entry invocation failed with MODULE_NOT_FOUND: react-scripts is not installed. No successful build or browser validation is claimed.

No disposable configured test database is available; registration, duplicate-email, correct-login and incorrect-login behavior were not executed. PHP/PDO/database setup and frontend dependencies remain required for runtime checks. Existing connection behavior, response conventions and incomplete intermediate behavior are preserved rather than improved. Intermediate staged frontend forms/endpoints are not claimed independently functional.

Final date checks: author and committer timestamps match, March sequence is chronological after February, 32 nonempty commits on 20 active days, at most two per day (limit 11). Published with a normal push; phase stops after March.

## Phase 4: April 1–30, 2023 — account management and password recovery

Continues main in iiMedR/kotlibes from Phase 3. January–March commits and complete local source snapshots are preserved. All April dates use the same assigned UTC noon convention and configured author; they are not verified original activity. No new branches or history rewrites are used.

Profile settings use the active implementation after the commented older version. Full name/email/phone are loaded from n/e/p storage; email editing is disabled. Name and phone use existing HTML required checks. The request supplies Id/FullName/Email/Phone, but update.php changes only name and phone. Success updates n/e/p and reloads after three seconds. Feedback uses supplied status 0 success/1 failure. The endpoint trusts a client-supplied Id and adds no authorization. Settings password fields have required attributes only; no frontend strength or confirmation-comparison rule is invented. updatePassword.php hashes newPass before checking emptiness, verifies the existing password, compares raw newPass and confirmPass, then updates the hash. Its hashed-empty check is preserved even though it does not reject an empty raw new password reliably. Password parsing/hashing is staged with current-password verification because the supplied earlier checks reference the hash; April 15 introduces the prepared update and then responses.

The exact resetpassword table is added to the existing schema: token_id/token/expiration_date/id/is_used, existing primary key and id index, MyISAM/latin1 options. is_used remains NOT NULL without an invented default. No other table or seed data is introduced, and the dump is not executed.

Composer declares PHPMailer ^6.7 and the supplied lock resolves v6.7.1. The supplied installation note contains no credential values and is included; vendor is excluded. Reset requests retain email validation and frontend-only 60-second resend cooldown. Backend account lookup generates 16 random bytes encoded as a token, stores an expiry ten minutes ahead and is_used=0. PHPMailer uses the supplied SMTP host/TLS/port and email/link content; SMTP Username and Password use REPLACE_WITH_YOUR_VALUE and the supplied sender placeholder is EMAIL. No real emails are sent. Configured SMTP values must remain private.

checkLink.php returns is_used for a token; it does not validate expiry, user ownership or reject used tokens itself. ChangePassword.js never calls this endpoint. Accordingly, April 24 stages the supplied query parsing and client expiry comparison, not an invented frontend API validation request. Its exp query string is client-controlled, and its effect depends on and replaces inputs, potentially causing repeated renders. The final file preserves this behavior. The replacement form compares password and confirmation, submits supplied token/id/password/confirm, logs its error state and navigates to /login on success; no new error display is invented.

change.php checks token existence and user ID existence separately, hashes and checks confirmation, updates the selected user and sets is_used=1. It does not require that the token belongs to the supplied account, check stored expiry, or reject prior use. Marking a token used is not server enforcement of single use. Recovery change responses preserve status 1 success/0 failure; settings endpoints preserve 0 success/1 failure. Token-write and query failures retain the supplied handling gaps.

Settings.js and Sidebar.js restore their complete supplied file contents, including commented alternatives, during reconciliation; those inactive alternatives are not presented as dated development steps. SidebarData introduces only its supplied Settings entry; dashboard/tools/upgrade links and their imports remain deferred. Account sidebar logo and UI dependencies are included because the settings page requires them. NavDashboard (including its wallet) remains deferred because this page uses Sidebar directly. ResetPassword omits the shared NavBar import/render pending its later phase; all other supplied contents remain. The existing recovery link and /settings, /reset-password, /changepassword routes are connected, with source-extracted settings/recovery/sidebar styles. No AI tools, usage or billing implementation is introduced.

Dependency ranges for @mui/material, @mui/icons-material, @emotion/react, @emotion/styled and react-bootstrap come from the supplied manifest. No newer versions are installed. PHPMailer vendor installation and frontend dependency installation remain required; no generated lock changes are published.

### Actual verification

All five introduced PHP endpoints, Composer manifests/lock, installation note, Settings page, complete SettingsHome and Sidebar files, recovery replacement form and sidebar logo match the sanitized snapshot byte for byte. ResetPassword matches its documented navbar omission; SidebarData matches its extracted Settings item. The reset table matches normalized supplied text and the prior users schema remains intact. JSON manifest/lock checks, exact reset field/table inventory, active local import resolution, declared external dependency checks, route checks, and credential-signature/path-scope checks passed. Every staged diff was reviewed for phase scope. Original source and sanitized published snapshot remain outside the tracked repository.

PHP syntax checks unavailable: no PHP runtime found on PATH or checked installation locations.

Frontend build entry invocation failed with MODULE_NOT_FOUND because react-scripts is not installed. No successful build or browser verification is claimed.

No disposable configured database or test email setup is available. Profile/password updates, recovery requests, valid/expired links and token reuse were not exercised. No existing database was imported and no emails were sent. Intermediate staging is not claimed independently functional. Runtime configuration, PHP/PDO, Composer vendor and frontend dependencies remain outstanding.

Schedule: 29 nonempty commits across 18 active April days, at most two per day (limit seven), chronological matching author and committer dates after March. Normal push only; no May work is introduced.
