# Store Admin Dashboard

This is a Vue 3 application for an interview technical task.

## Libraries

For fetching the API, I used [VueUse](https://vueuse.org/) with the help of ```useFetch```.

For the CSS, I utilized [TailwindCSS](https://tailwindcss.com/)

## TODOs (If I had more time)

- [ ] Create tests
- [ ] Simplify / use components in ProductCreateView

Platzi Store API doesn't provide a total number of items when fetching items using pagination. Thus, there is no way to add pagination numbers as their docs mention there are 200 products, but this number changes because users can create/delete products.

I considered adding a first query to fetch all the products and using that length to display the pagination numbers. However, doing this has a downside: when changing pages, the data may vary, and thus, the total number of items will be incorrect. Additionally, it adds an extra query that is not necessary.

Another approach I considered is making one single query and using ```.slice``` to show the paginated products.

## Project Setup

Clone the project and then follow the instructions below.

Make sure you are using Node v18. You can use any node version manager for example [NVM](https://github.com/nvm-sh/nvm).

```sh
yarn install
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).