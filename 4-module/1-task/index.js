function makeFriendsList(friends) {
  const ul = document.createElement('ul');
  let li;

  for (let friend of friends) {
    li = document.createElement('li');
    li.textContent = `${friend.firstName} ${friend.lastName}`;
    ul.append(li);
  }

  return ul;
}
