import { DefaultApolloClient } from "@vue/apollo-composable"
import type { App } from "vue";
import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client/core";

const httpLink = createHttpLink({
    uri: "https://frontend-developer-assignment.vercel.app/api/graphql"
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
    link: httpLink,
    cache
});

export const apolloPlugin = {
    install(app: App) {
        app.provide(DefaultApolloClient, apolloClient);
    }
}