# Backend and database foundation

Phase 3 introduces the supplied registration handler and an account-only login handler. Subscription integration is deferred to Phase 9. Runtime checks require a configured disposable local database and PHP/PDO environment.

## Local configuration

Use a PHP runtime with PDO and the pdo_mysql extension, and MySQL/MariaDB. The supplied dump identifies database `reactapp`; create a disposable local database yourself. The dump does not create or select a database. Phase 2's schema contains the supplied users table only. Review it before executing it: it retains DROP TABLE IF EXISTS users and would replace an existing users table. No database import was performed for this reconstruction.

Set DbConnect's private server, dbname, user and pass properties to your own local database configuration. All four values have been substituted with REPLACE_WITH_YOUR_VALUE; no original database credentials are published. Keep configured credentials private. The supplied configuration uses literal private properties, not environment-variable loading.

The PDO DSN uses mysql:host and dbname; no charset or explicit port is added. ERRMODE_EXCEPTION is retained. Connection errors echo the exception message and connect() can return no connection. Wildcard CORS headers and their supplied formatting are retained. There is no new OPTIONS handler or shared bootstrap middleware.

Password helpers use password_hash with PASSWORD_BCRYPT and cost 11, and password_verify. No sessions or other authentication implementation is added.

## Frontend address

frontend/myapp/src/components/BaseURL.js exports the literal http://localhost:80 as its default export. Its other addresses are comments, not environment selection. Later callers append endpoint paths to this address; local serving must match that path layout. This phase does not wire account pages or claim deployment portability.

## Fields required by later account endpoints

The supplied registration handler reads name, email and password, inserts id/name/email/password/created_at and reads back id/name/email/phone. The supplied login handler reads email1/password1 and accesses users id/name/email/password/phone/tokens/status. Its subscription queries and response fields require Phase 9 data and remain deferred. The users schema additionally retains updated_at.

The supplied users table retains MyISAM and latin1, the unusual quoted inactive status default, nullable phone, default token balance 0, and current_timestamp defaults for both timestamps. No unique email index, foreign keys, seed data, or automatic updated_at behavior is invented.

## Phase 4 setup and limits

Account-update and recovery endpoints are now included. The resetpassword table is source-derived; review destructive DROP statements before using a disposable test database. Install the supplied Composer lock in backend/resetPassword to provide vendor/autoload.php, and configure private SMTP credentials and a test sender. SMTP username/password are placeholders. Recovery links retain the supplied https://kotlibes.com/changepassword address. No reset emails were sent during reconstruction. Stored expiry and is_used values are not enforced by the backend, and token ownership is not tied to the requested user ID. These preserved behaviors are documented in RECONSTRUCTION.md.
