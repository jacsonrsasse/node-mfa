# NODE MFA

A simple project to study multi-factor authentication using a one-time password, like the Google Authenticator app.

However, you'll also find other study scenarios, such as the `Either` monad, which is very common in functional programming. I used it here as a way to avoid using try/catch. It is clean to read, easy to understand, but very verbose. I found out that TypeScript doesn't have the specific type-checking required to fully leverage this approach. Meaning, even though I typed it with a specific Exception, I could use another one without any type error. This happens because my exceptions extend the same `Error` class, so TypeScript couldn't enforce the type properly.

I also used a clean architecture approach, which adds even more verbosity. In this scenario, it was unnecessary and over-engineered. But it was just a study case anyway.

## Technologies

#### Database

- [DrizzleORM](https://orm.drizzle.team/): easy to set up, easy to use. I can easily switch to another database driver if needed.

#### Second Factor Authenticator

- Package [otpauth](https://www.npmjs.com/package/otpauth): straightforward and easy to use.

#### JWT

- Package [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): no comments needed

#### HTTP

- [Fastify](https://fastify.dev/): just to use something different from Express

#### Encrypt

- Node encrypt module: I started using `bcryptjs` and switched to node module because I wanted something more complex. I recommend not use this for production, it is just a simple example of what can be built with this module.

#### Bulding the project

- [Esbuild](https://esbuild.github.io/)
