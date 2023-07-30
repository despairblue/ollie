## Description

ToDo API.

### ToDos

- [ ] get the description of todoist
- [ ] sync creted todos back to todoist
- [ ] add a sync api so that the FE can efficiently sync and provide instant feedback without request roundtrips
    - see https://www.youtube.com/watch?v=WxK11RsLqp4 and https://www.youtube.com/watch?v=Wo2m3jaJixU for an in depth walkthrough of a well defined synchronization engine

### Considerations

**Why Nest.js?**

Usually I'd consider using a framework like Nest.js an overkill for a coding challenge, but taking into account the requirement that this code base should be build to scale to a team of 10 or more engineers I decided to use a framework. Every small codebase that is created by a start up will eventually morph into a badly documented, badly maintained and badly tested framework itself. So why not strat with one that is well documented, maintained and tested.

**Testing**

* [ ] refine this section and check spelling and grammar

I'm going with e2e testing for the majority of the functionality. Unit tests provide value for complicated subsystems or business logic. Through my career end to end tests have prooven to be a useful tool for allowing a bigger teams to work on a code base together and be able to quickly refactor to keep up with changing requirements. Every refactor requires changing unit tests. Changing code and tests at the same time does not guruantee that the public interface is unchanged. An end to end test on the other hand guarantees a public interface while making no assumption about the implementation. So if a refactor does not change any end to end test, and they all still pass, there is a good chance that the refactor was successful.

End to end tests do have downsides though. 

They are slow, expensive to run in CI due to being slow and they run rather slowly on the developers machine as well. The downsides can be counteracted on by caching and parallelization in CI and locally by organizing them well. Thus the developer knows what end to end tests to execute while developing a feature or doing a refactor. 

The addiditional costs in CI pay off compared to the added costs of needing to change or add unit tests and end to end tests for every feature and the opportunity costs of development being slower.

Another downside is more complicated setups for tests. This can be counteracted by create a setup helper, like a domain specific language, or a builder.

* explain why using supertest (simplicity), and that I'd use a setup with graphql code gen instead

**GraphQL API**

* explain why update and marking todos as done are 2 different mutations


## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
