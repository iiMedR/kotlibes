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
