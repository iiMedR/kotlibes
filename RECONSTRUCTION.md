# Reconstruction record

This repository's dated sequence reconstructs an estimated implementation order from an existing project snapshot. Assigned dates are not verified original development dates. Source and dependency versions come from the supplied snapshot.

## Boundaries

Phase 1: January 1–31, 2023 — project foundation. The overall reconstruction ends February 27, 2024. No February implementation is included in this phase.

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

## Phase 2: February 1–28, 2023 — database and backend foundation

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
