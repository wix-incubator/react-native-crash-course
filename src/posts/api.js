const baseUrl = 'http://localhost:3000/posts';

export async function fetchPosts() {
  //If you are having issues with fetching from localhost on Android please follow this issue or use iOS:
  //https://github.com/facebook/react-native/pull/23984
  const response = await fetch(baseUrl);
  const posts = await response.json();
  return posts;
}

export async function addPost(post) {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  const postToAdd = await response.json();
  return postToAdd;
}

export async function updatePost(post) {
  const response = await fetch(`${baseUrl}/${post.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  const postToUpdate = await response.json();
  return postToUpdate;
}

export async function deletePost(id) {
  await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE'
  });
}

