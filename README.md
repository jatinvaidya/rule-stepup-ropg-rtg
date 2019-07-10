Simple rule to implement step-up authentication when using 
Resource Owner Password Grant and Refresh Token Grant.

Auth0 docs for step-up cover step-up authentication scenarios for API access.
The primary mechanism for step-up documented is via a second call to `/authorize` endpoint
endpoint with privilege scope. Then enforce step-up via rules.

However, when client is using ROPG, we dont have any call to `/authorize` endpoint.

In this solution outline, ROPG app will:

1. Acquire `access_token` and `refresh_token` with regular (non-privilege) scope.
2. Let user perform regular (non-privilege) operations on target API.
3. Detect when user needs to perform elevated (privilege) operation (ex. change mobile# or home address)
4. Use Refresh Token grant with `refresh_token` from step 1 and privilege scope.
5. **Rule** included in this repo will detect elevation and enforce `MFA` before elevated scope is granted in `access_token`.
6. Perform privilege operation using elevated `access_token` and discard the `access_token` once the operation is performed, i.e. fallback to regular `access_token`.
   