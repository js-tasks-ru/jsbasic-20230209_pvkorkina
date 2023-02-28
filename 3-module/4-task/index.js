function showSalary(users, age) {
  return users
    .filter(user => user.age <= age)
    .map((user, index, arr) => {
      let str = `${user.name}, ${user.balance}`;
      return (index !== arr.length - 1) ? str += '\n' : str;
    })
    .join('');
}
