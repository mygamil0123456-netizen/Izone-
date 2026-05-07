# Security Specification: I zone E-Commerce

## Data Invariants
1. A user can only access their own profile and orders.
2. Only an Admin can create, edit, or delete products.
3. An order must belong to a valid authenticated user.
4. Product reviews must be linked to the creating user.
5. Roles (admin/customer) are immutable from the client-side user profile update.

## The Dirty Dozen Payloads (Rejection Targets)

1. **Identity Spoofing**: User A trying to update User B's profile.
2. **Privilege Escalation**: User updating their `role` to `admin`.
3. **Ghost Field Injection**: Adding a `discountVerified: true` field to a product update.
4. **ID Poisoning**: Using a 2KB string as a `productId`.
5. **Orphaned Write**: Creating a review for a non-existent product.
6. **Unauthorized Read**: Anonymous user attempting to list all `users`.
7. **Bypassing Verification**: Writing to `orders` with `email_verified: false`.
8. **State Jumping**: Customer trying to set `order.status` to `shipped`.
9. **Large Request Attack**: Sending a 1MB string in the `fullName` field.
10. **Array Overflow**: Sending 10,000 items in a single order request.
11. **PII Leak**: Querying the `users` collection without a `uid` filter as a non-admin.
12. **Timestamp Forgery**: Providing a client-side `createdAt` in the future.

## Test Runner Status
Verification through `firestore.rules` logic and ESLint checks.
