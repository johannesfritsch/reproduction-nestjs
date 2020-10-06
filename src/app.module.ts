import { Module } from '@nestjs/common';
import * as path from 'path';
import { Resolver, Query, createUnionType, ID, GraphQLModule, Field, ObjectType, ResolveField } from '@nestjs/graphql';

@ObjectType()
export class UrlRedirect {
  @Field((type) => ID)
  id: string;

  @Field()
  url: string;
}

export const RedirectUnion = createUnionType({
  name: 'Redirect',
  types: () => [UrlRedirect],
});

// resolver
@Resolver((of) => RedirectUnion)
export class RedirectsResolver {
  constructor() {}

  @Query((returns) => [RedirectUnion])
  async allRedirects() {
    const u = new UrlRedirect();
    u.id = '123';
    u.url = 'http://www.niklas.de';
    return [u];
  }
}

// module
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: path.join(__dirname, '../schema.gql'),
      sortSchema: true,
    }),
  ],
  providers: [RedirectsResolver],
})
export class AppModule {}