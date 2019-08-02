# GithubSearch

## Development server

Optionally run `TOKEN=<token> yarn codegen` to re-generate the typings and the introspection file for the fragment matcher.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Deployed version

https://darkbasic.github.io/github-search/

The token is hardcoded and will be invalidated in a couple of days since this commit.

To deploy a new version run `ng build --prod --base-href "https://darkbasic.github.io/github-search/" && npx angular-cli-ghpages --dir=dist/github-search`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

NOTE: you should change the base-href to `https://darkbasic.github.io/github-search/` for GitHub Pages.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Notes

- All typings are automatically generated from the remote GraphQL schema thanks to graphql-code-generator
- The queries make use of fragments
- The fragment matcher is automatically generated using graphql-code-generator: https://graphql-code-generator.com/docs/plugins/fragment-matcher
- Apollo Services are automatically generated from the queries using graphql-code-generator: https://graphql-code-generator.com/docs/plugins/typescript-apollo-angular
- A single query can retrieve both users and repositories
- A single component can display both users and repositories
- Routing dictates whether you display user results or repository results
- Dynamic components take care of displaying either user-items or repository-items
- The Material List gets fed through a custom DataSource, which could be easily attached to a Material table instead
- Responsive layout (desktop and mobile)
- Custom Material theme
- Tests
