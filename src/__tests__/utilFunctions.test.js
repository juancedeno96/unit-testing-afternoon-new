import { shortenText } from "../../src/utils/functions";
import { wordCount, attachUserName } from "../../server/utils";
import { shortText, longText, posts, users } from "./__data__/testData";

test("shortenText will not alter a string under 100 characters", () => {
  expect(shortenText(shortText)).toHaveLength(29);
});

test("shortenText should cut off extra characters after 100 and add three periods", () => {
  const shortened = shortenText(longText);
  expect(shortened).not.toHaveLength(longText.length);
  expect(shortened.slice(-3)).toBe("...");
});

test("wordCount will correctly sum up the number of words in an array full of posts.", () => {
  expect(wordCount(posts)).toBe(233);
});

test("attachUserName should check to make sure that passing in users and posts will attach a displayName property to every post", () => {
  const newPosts = attachUserName(users, posts);
  expect(newPosts[0]).toHaveProperty("displayName");
});

test('attachUsername will remove any post with no matching user', ()=>{
    const newPosts = attachUserName(users, posts);
    const deletedPosts = posts[5];
    expect(newPosts).not.toContainEqual(deletedPosts)
});
