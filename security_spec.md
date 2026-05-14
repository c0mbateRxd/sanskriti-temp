# Security Specification for Sanskriti AI

## Data Invariants
1. **Stories Collection**:
   - `read`: Publicly accessible (get and list).
   - `write`: Restricted to Admins only (deny by default for users).
   - Immutable fields: All (users cannot modify stories).

2. **Contributions Collection**:
   - `read`: Restricted to the author of the contribution.
   - `write`: Restricted to Authenticated users.
   - `author`: Must match the authenticated user's email or UID.
   - `createdAt`: Must be set to server timestamp (`request.time`).
   - ID Hardening: Document IDs must be valid alphanumeric strings.

3. **Global Safety**:
   - Deny all by default.
   - Enforce size limits on all strings and arrays.

## The "Dirty Dozen" Payloads

### Stories (Target: /stories/story_001)
1. **Unauthorized Write**: `{"title": "Hacked Title", "content": "Bad Content"}` as a normal user. -> `PERMISSION_DENIED`
2. **Field Injection**: `{"ghost_field": "test"}` as Admin. (Should fail unless whitelisted). -> `PERMISSION_DENIED`

### Contributions (Target: /contributions/contrib_001)
3. **Identity Spoofing**: `{"author": "victim@example.com", "title": "Spoofed"}` when logged in as `attacker@example.com`. -> `PERMISSION_DENIED`
4. **Anonymous Write**: `{"title": "Anon Story", "content": "..."}` without authentication. -> `PERMISSION_DENIED`
5. **Junk ID**: Attempting to write to `/contributions/!!!!junk%%%%`. -> `PERMISSION_DENIED`
6. **Large Payload**: `{"title": "A" * 1000000}`. -> `PERMISSION_DENIED`
7. **Bypassing Server Timestamp**: `{"createdAt": "2020-01-01T00:00:00Z"}`. -> `PERMISSION_DENIED`
8. **Unauthorized List**: Attempting to `list` contributions without being the owner of all returned docs (or without owner filter). -> `PERMISSION_DENIED`
9. **Update Hijacking**: Modifying the `author` field of an existing contribution. -> `PERMISSION_DENIED`
10. **State Poisoning**: Injecting a non-string or 1MB string into the `state` field. -> `PERMISSION_DENIED`
11. **Malicious Array**: Injecting a massive array into any field (if applicable). -> `PERMISSION_DENIED`
12. **PII Leak**: Non-owner trying to `get` a contribution that contains `author` email. -> `PERMISSION_DENIED` (if restricted).
