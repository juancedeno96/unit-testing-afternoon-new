<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250" align="right">

# Project Summary

We will be using a completed full stack project to test both pure functions server/client side and React components. This project will use Jest and react-test-library. You will focus on writing tests for functions/Components that already exist with some slight refactoring on the existing codebase. Run the command `npm run dev` to spin up the express server and React project and then familiarize yourself with the functionality.

To keep the number of libraries you need to learn to a minimum, only Jest and react testing library are included in this project. This project is intended to be a starting point for your testing knowledge and not an all inclusive resource.

## Step 1

Setup

### Instructions

- Fork and clone this repo
- run `npm i`

## Step 2

### Summary

Let's get all the setup out of the way to begin testing our utility functions. In this step, we will install the required dependency for React testing, create our first test file and tell Jest to ignore our test data file(s).

### Instructions

- Run the command `npm install --save-dev @testing-library/react` in your terminal.
  - Note: This is not a required package for testing React components but it provides some utility methods that make testing easier. <b>It is also installed automatically by the newest versions of create-react-app</b>
- In the `src` folder create a folder titled `__tests__` and then in that folder create a file called `utilFunctions.test.js`.
  - Jest will automatically detect this folder and run all files inside of it when you run `npm run test`
- In the `package.json` add this code snippet.
  - This snippet will allow us to place js files in the `__data__` folder that will be ignored by the test runner

```json
"jest": {
    "watchPathIgnorePatterns": [
      "<rootDir>/src/__tests__/__data__"
    ]
  }
```

- Lastly, in the `__tests__` folder create a folder titled `__data__` and inside that folder create the file `testData.js`
- In that new file paste the following test data for use later

<details>

<summary> <code> testData.js </code> </summary>

```javascript
export const users = [
  {
    id: 1,
    first: 'Test',
    last: 'User',
  },
  {
    id: 2,
    first: 'Hello',
    last: 'World',
  },
];

export const posts = [
  {
    id: 1,
    userId: 2,
    title: 'This is a long post',
    text:
      'This is a longer string that will be used to test whether or not the shortenText function correctly shortens the text correctly or not.',
  },
  {
    id: 2,
    userId: 2,
    title: 'This is a short post',
    text: 'hello world',
  },
  {
    id: 3,
    userId: 1,
    title: 'This is a long post',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 4,
    userId: 1,
    title: 'This is a long post',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 5,
    userId: 3,
    title: 'This is a long post',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];
export const shortText = 'This is a very short sentence';

export const longText =
  'This is a longer string that will be used to test whether or not the shortenText function correctly shortens the text correctly or not.';
```

</details>

## Step 3

### Summary

In this step, we will write unit tests for our three pure functions in this application.

### Instructions

- In `utilFunctions.test.js` import the functions `shortenText`, `wordCount` and `attachUserName`
  - `shortenText` is found in the `src/utils/functions` folder
  - `wordCount` and `attachUserName` are found in the `server/utils` folder
- Import `shortText`, `longText`, `posts` and `users` from your data file
- Create a test for `shortenText` to make sure it will not alter a string under 100 characters
  - use the `.toHaveLength` matcher and the `shortText` variable
- Create a test for `shortenText` to make sure it shortens text over 100 characters and adds 3 periods at the end
  - you will need two assertions in this test; one to check length and the second to see if the last 3 characters are `...`
  - use the `.not` matcher on this to compare original `longText` length vs the new length
- Run `npm run test`. The second assertion should fail. You will need to refactor this test to get it to pass.
  - Hint: Check the function logic. Since the string ends with a blank space, the function will incorrectly read it's length as 99
- After refactoring, run the test suite again till it passes
- Write a test for `wordCount` that will check the `posts` array and return a total word count
  - The number of words in the posts array should equal 233
- Write a test for `attachUserName` that will check to see if the first post returned from running this function has a property `displayName`. Running this test will cause a failure since this function does not currently account for any posts that don't have a matching user.
  - refactor this function to filter out all the posts with no users.
- After refactoring, run `npm run test` again until it passes
- Lastly, write a test for `attachUserName` to check that it removes any post with no matching user.
  - The returned array should only contain posts that had a matching user
  - You should not alter the original array passed in

<details>

<summary>Detailed Instructions</summary>

<br />

Let's begin by opening the `utilFunctions.test.js` located in `src/__tests__`. We have several functions in our application that are each handling different pieces of logic. These are perfect for testing since they are pure functions (pure functions are functions that given the same inputs will always return the same output). Let's import these functions so we can invoke them for our tests. The nice thing about our test runner is that it has access to all files in our project directory so we can just as easily test a backend function as we can a frontend one.

```js
import { shortenText } from '../utils/functions';
import { wordCount, attachUserName } from '../../server/utils';
```

We will need some test data to pass our functions. We could write them in the file itself but why not bring in data from our data file that can be used in multiple places? Let's import the following pieces of data.

```js
import { shortText, longText, posts, users } from './__data__/testData';
```

Now that we have the necessary imports, let's create the first unit test starting with `shortenText`. This function will take in a string and if the string's length is greater than 100 it will shorten it to 100 and concatenate 3 periods on the end. This is useful in our application when we want to show the non-expanded version of a post.

We will use the `it` method to pass a description of the test and a callback function that Jest will execute to carry out our assertions. Let's then invoke `expect` and pass in `shortenText(shortText)` to get the shortened version of the passed in text string. Since this string has less than 100 characters to begin with, we should expect that the length of the returned string is equal to the initial length of the string (29).

```js
test('shortenText should not alter a string with less than 100 characters', () => {
  expect(shortenText(shortText)).toHaveLength(29);
});
```

Running this test will pass just like we expect it to. Let's write another test for `shortenText` but this time check if it correctly shortens text that is over 100 characters and adds 3 periods at the end. Since we are going to be testing two things here, lets create a variable called `shortened` that we can save the result of invoking `shortenText(longText)` to. Next, let's create our first assertion and say that we expect the length of `shortened` to not be equal to the length of `longText`. Then, let's write our second assertion to say that we expect `shortened`'s last 3 characters to be equal to `...`.

```js
test('shortenText should cut off extra characters after 100 and add three periods', () => {
  const shortened = shortenText(longText);
  expect(shortened).not.toHaveLength(longText.length);
  expect(shortened.slice(-3)).toBe('...');
});
```

Run `npm run test` again. It breaks! You should get an error that the last 3 characters of the `shortened` string are not `...`. This is because it just so happens calling `.trim()` on this string after shortening it to 100 characters removed the empty space at the end making it 99 characters. The logic of our function then checks if the length of the string is 100 and if so it will add 3 periods. This is a fault in our logic and we caught it using a unit test. Let's go to `src/utils/functions.js` and refactor the function so that it correctly accounts for this case.

```js
export const shortenText = text => {
  if (text.trim().length >= 100 && text.length !== 100) {
    return `${text.substr(0, 100).trim()}...`;
  }
  return text;
};
```

After we make the changes and run `npm run test` again, our test will pass. That is enough testing on that function. Next, let's write a few tests to test if the `wordCount` function will correctly sum up the number of words in an array full of posts. Write a test for `wordCount` that will check if the value of invoking it and passing in our test posts array is equal to 233 words.

```js
test('wordCount should correctly count the number of words in a sentence', () => {
  expect(wordCount(posts)).toBe(233);
});
```

Next, let's write a few tests for `attachUserName`. The first should check to make sure that passing in users and posts will attach a `displayName` property to every post. Let's save the result of invoking `attachUserName` to a variable called `newPosts`. Then we can assert that the first item in the new array has a property called `displayName`.

```js
test('attachUserName should correctly attach a users full name to a post', () => {
  const newPosts = attachUserName(users, posts);
  expect(newPosts[0]).toHaveProperty('displayName');
});
```

Run `npm run test`. You should see a failing test here. This is because one of our posts does not have a matching user. we will need to refactor this function in `server/utils.js` to filter for posts that do have a matching user.

```js
attachUserName(users, posts) {
    let userDict = users.reduce((accum, user) => {
      accum[user.id] = user;
      return accum;
    }, {});
    return posts
      .filter( post => userDict[post.userId])
      .map( post => {
        post.displayName = `${userDict[post.userId].first} ${userDict[post.userId].last}`;
        return post;
      });
  }
```

Lastly, create a test that checks to make sure that the test removes any posts with no matching user. You will want to save `attachUserName(users, posts)` to a new variable `newPosts`. Then you can assert that `newPosts` does not contain the deleted post. There is a helpful matcher that Jest gives us called `.toContainEqual` for this very purpose. It will check an array of objects and see if it can find a matching one.

```js
test('attachUserName should remove any post with no matching user', () => {
  const newPosts = attachUserName(users, posts);
  const deletedPost = posts[5];
  expect(newPosts).not.toContainEqual(deletedPost);
});
```

</details>

### Solution

<details>

<summary> <code> utilFunctions.test.js </code> </summary>

```js
import { shortenText } from '../utils/functions';
import { wordCount, attachUserName } from '../../server/utils';
import { shortText, longText, posts, users } from './__data__/testData';

test('shortenText should not alter a string with less than 100 characters', () => {
  expect(shortenText(shortText)).toHaveLength(29);
});

test('shortenText should cut off extra characters after 100 and add three periods', () => {
  const shortened = shortenText(longText);
  expect(shortened).not.toHaveLength(longText.length);
  expect(shortened.slice(-3)).toBe('...');
});

test('wordCount should correctly count the number of words in a sentence', () => {
  expect(wordCount(posts)).toBe(233);
});

test('attachUserName should correctly attach a users full name to a post', () => {
  const newPosts = attachUserName(users, posts);
  expect(newPosts[0]).toHaveProperty('displayName');
});

test('attachUserName should remove any post with no matching user', () => {
  const newPosts = attachUserName(users, posts);
  const deletedPost = posts[5];
  expect(newPosts).not.toContainEqual(deletedPost);
});
```

</details>

<details>

<summary> <code> src/utils/functions.js </code> </summary>

```js
export const shortenText = text => {
  if (text.trim().length >= 100 && text.length !== 100) {
    return `${text.substr(0, 100).trim()}...`;
  }
  return text;
};
```

</details>

<details>

<summary> <code> server/utils.js </code> </summary>

```js
module.exports = {
  wordCount(posts) {
    return posts.reduce(
      (accum, post) => (accum += post.text.split(' ').length),
      0,
    );
  },
  attachUserName(users, posts) {
    let userDict = users.reduce((accum, user) => {
      accum[user.id] = user;
      return accum;
    }, {});
    return posts
      .filter(post => userDict[post.userId])
      .map(post => {
        post.displayName = `${userDict[post.userId].first} ${
          userDict[post.userId].last
        }`;
        return post;
      });
  },
};
```

</details>

## Step 4

### Summary

Now we will move on to testing individual React Components. Let's start with `Post`. This component is responsible for requesting a single post from the database and rendering it out on the screen in a full width capacity.

### Instructions

- Create a file titled `Post.test.js` in the `__tests__` folder.
- import `React` at the top since it must be in scope
- import `render` and `act` from react testing library
  - The package name is `@testing-library/react`
  - These are not default exports
- Import the `Post` component
  - This file is located in `src/views`
- Import `axios`
- Import `MemoryRouter` from react router
- Import `posts` from our test data
- Create a test to check that our `Post` component actually renders a post
  - You will need to use jest's `spyOn` method to watch for axios get requests and send back an individual post
  - use the async version of act to await the axios request/response cycle
  - use the `.toContain` method to check if the inner textContent of our rendered `Post` matches the posts text that returned as data to the component

<details>

<summary>Detailed Instructions</summary>

<br />

Let's move on to writing our first unit tests for a React component. The component that we will test is `Post`. It is a component that takes in a post object and then displays the title, text content and a link to the user's page that wrote it. Create a file called `Post.test.js` in the `src/__tests__` folder.

Now, open the file and let's import the necessary packages. When testing React components much as writing them, React has to be in scope. Bring that in right at the top. Next thing to bring in is `render` and `act` from the library that we installed at the beginning of the project `@testing-library/react`. `render` will handle all of the behind the scenes rendering of components for us and act will wait for all events such as rendering or data fetching to resolve before moving on to the assertions. Next bring in `Post` from `src/views` since we'll need to render this out to test it. Bring in `axios` since the `Post` component makes an axios call. We will need to intercept that call and pass back some test data. import `MemoryRouter` from `react-router-dom` which is a lightweight provider given to us that gives us access to `withRouter`. Lastly, import `posts` from our test data.

```js
import React from 'react';
import { render, act } from '@testing-library/react';
import Post from '../views/Post';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { posts } from './__data__/testData';
```

Now we can write our test. Since we are just using Jest, we will still use the `it` method. Pass a string along the lines of 'renders out a post widget'. Make the callback function async so we can use await in the body of the function to wait for all axios calls to complete before running our assertions. Create a variable called `post` that is the first object in the `posts` array. Then create an uninitialized variable called `container`. We will save our container object to it once we finish rendering it out using `act` and `render`.

Lastly, we will want to call the method `spyOn` on the jest object. This is a method that lets us listen for certain method calls on objects and send back a custom response. In this case let's invoke `spyOn` passing through axios, and 'get' to have it listen for all 'get' requests. We will then chain onto the `spyOn` method the `.mockImplementation` method. `.mockImplementation` lets us override the actual 'get' methods implementation and write our own implenentation logic. In this case, we can pass back a resolved promise with an object that has a data property. This will resolve the axios request and let us render out the post in the `Post` component.

```js
it('Renders out a post widget', async () => {
  const post = posts[0];
  let container;
  jest
    .spyOn(axios, 'get')
    .mockImplementation(() => Promise.resolve({ data: post }));
});
```

Now we'll use the async version of the `act` method to render out our `Post` component and wait for the axios request to resolve from our `spyOn` method. Since the `Post` component is wrapped in the HOC `withRouter` we need to wrap our rendered out `Post` component with the `MemoryRouter` component. This will spoof what `HashRouter`/`BrowserRouter` does for us in the actual DOM. Pass a match param to the `Post` component whose value is an object with a params property whose value is also an object that has one property; `postId: 1`. This is spoofing the match object that gets passed through to `Post`.

```js
await act(async () => {
  let renderObj = render(
    <MemoryRouter>
      <Post match={{ params: { postId: 1 } }} />
    </MemoryRouter>,
  );
  container = renderObj.container;
});
```

Lastly, let's make an assertion about our container object. Since we passed in the first post, we should expect that our `Post` component will have inner text equal to the text of the first post object. We can assert about that using the matcher `.toContain`.

```js
it('Renders out a post widget', async () => {
  const post = posts[0];
  let container;
  jest
    .spyOn(axios, 'get')
    .mockImplementation(() => Promise.resolve({ data: post }));
  await act(async () => {
    let renderObj = render(
      <MemoryRouter>
        <Post match={{ params: { postId: 1 } }} />
      </MemoryRouter>,
    );
    container = renderObj.container;
  });

  expect(container.textContent).toContain(post.text);
});
```

</details>

## Solution

<details>

<summary> <code> src/__tests__/Post.test.js </code> </summary>

```js
import React from 'react';
import { render, act } from '@testing-library/react';
import Post from '../views/Post';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { posts } from './__data__/testData';

it('Renders out a post widget', async () => {
  const post = posts[0];
  let container;
  jest
    .spyOn(axios, 'get')
    .mockImplementation(() => Promise.resolve({ data: post }));
  await act(async () => {
    let renderObj = render(
      <MemoryRouter>
        <Post match={{ params: { postId: 1 } }} />
      </MemoryRouter>,
    );
    container = renderObj.container;
  });

  expect(container.textContent).toContain(post.text);
});
```

</details>

## Step 5

### Summary

The next component we will test is `PostWidget` in the `src/components` folder. This component handles rendering out all posts and determines whether the post should be full width or not.

### Instructions

- Create a file titled `PostWidget.test.js` in the `__tests__` folder.
- Import all necessary packages/files (remember relative pathing)
  - `React`
  - `render` from `@testing-library/react`
  - `PostWidget` from `src/components`
  - `MemoryRouter` from react router
  - `shortenText` from our utils
  - `posts` from our test data
- Create two variables at the top; `longPost` and `post`. These will be used in various tests in the file
  - `longPost` will be the post at 0
  - `post` will be the post at 1
- Create a test that will render the `PostWidget` and check if the inner text content contains the passed in posts text content
  - You will need to destructure and pass the post data through to `PostWidget`
  - You will need to wrap `PostWidget` in a `MemoryRouter` component
- Create a test that will check if `PostWidget` shortens text when passed a post with text longer than 100 characters
  - pass `longPost` through
  - Call the function `shortenText` to get a shortened version of `longPost`'s text
- Create a test that will check if `PostWidget` displays all text when passed an expanded prop
  - pass `longPost` through
  - expanded must be set to true

<details>

<summary>Detailed instructions</summary>

<br />

The next component that we will be testing is the `PostWidget` component. While `Post` made the axios call to retrieve a post and then rendered out `PostWidget`, the `PostWidget` component is more complicated and determines whether it needs to display the full text length or not based on the passed in props. Let's write some tests for it.

The first thing we need to do is import the necessary packages / functions. I'll save you the detailed walkthrough of all of them since we covered that in the preceding step.

```js
import React from 'react';
import { render } from '@testing-library/react';
import PostWidget from '../components/PostWidget';
import { MemoryRouter } from 'react-router-dom';
import { shortenText } from '../utils/functions';
import { posts } from './__data__/testData';
```

Now let's create a few variables for easy reference later. We need to test this component passing in a long post and short post so create two variables `longPost` and `post`. `longPost` will be the first value in the `posts` array and `post` will be the second.

```js
const longPost = posts[0];
const post = posts[1];
```

Since all the setup is done, let's write the first test. The first test can be very basic and should just check that `PostWidget` actually renders out the post that is passed to it. Create an `it` block and then render out `PostWidget` passing through the destructured `post` object. Destructure `container` from the returned result of invoking `render`. Then assert about the container's inner text content that it should contain `post`'s `text` value.

```js
it('Renders out a Post', () => {
  const { container } = render(
    <MemoryRouter>
      <PostWidget {...post} />
    </MemoryRouter>,
  );
  expect(container.textContent).toContain(post.text);
});
```

Repeat this process for the next test. This next test should check if passing through `longPost` will shorten the displayed text by default. Render out `PostWidget` passing through `longPost` and destructure `container` from the result of invoking `render`. The assertion for this test should check if the text content of container matches the result of running `shortenText` on `longPost.text`.

```js
it('Shortens display text when expanded is false', () => {
  const { container } = render(
    <MemoryRouter>
      <PostWidget {...longPost} />
    </MemoryRouter>,
  );
  expect(container.textContent).toContain(shortenText(longPost.text));
});
```

There is one more test to write that will be pretty similar to the last two. Let's write a test that checks if passing through the `longPost` to `PostWidget` but passing an extended prop will display all the text of the post. Follow the steps for the first two tests except on this one the assertion should pass through `expanded={true}` to the `PostWidget`. Then the assertion should check if the inner text content matches the text of the `longPost`.

```js
it('Displays all text when expanded is true', () => {
  const { container } = render(
    <MemoryRouter>
      <PostWidget expanded={true} {...longPost} />
    </MemoryRouter>,
  );

  expect(container.textContent).toContain(longPost.text);
});
```

</details>

## Solution

<details>

<summary> <code> src/__tests__/PostWidget.test.js </code> </summary>

```js
import React from 'react';
import { render } from '@testing-library/react';
import PostWidget from '../components/PostWidget';
import { MemoryRouter } from 'react-router-dom';
import { shortenText } from '../utils/functions';
import { posts } from './__data__/testData';

const longPost = posts[0];
const post = posts[1];

it('Renders out a Post', () => {
  const { container } = render(
    <MemoryRouter>
      <PostWidget {...post} />
    </MemoryRouter>,
  );
  expect(container.textContent).toContain(post.text);
});

it('Shortens display text when expanded is false', () => {
  const { container } = render(
    <MemoryRouter>
      <PostWidget {...longPost} />
    </MemoryRouter>,
  );
  expect(container.textContent).toContain(shortenText(longPost.text));
});

it('Displays all text when expanded is true', () => {
  const { container } = render(
    <MemoryRouter>
      <PostWidget expanded={true} {...longPost} />
    </MemoryRouter>,
  );

  expect(container.textContent).toContain(longPost.text);
});
```

</details>

## Step 6

### Summary

You have now written multiple unit tests and tested multiple React components! At this point you will want to run `npm run test`. If all of your tests pass, you're done. If not, review the ones that are failing and see if you can figure out what you need to change. You may also reference the detailed instructions included above.

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250">
</p>
```
