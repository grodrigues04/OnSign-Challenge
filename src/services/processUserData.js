export default function processAndSetUsers(apiData, setUsers) {
  const { users, friends, interests } = apiData;
  const userMap = new Map(users.map((u) => [u.id, u.name]));

  const friendsMap = new Map();
  users.forEach((u) => friendsMap.set(u.id, new Set()));

  friends.forEach(([sourceId, targetId]) => {
    if (friendsMap.has(sourceId)) {
      console.log(`${sourceId} -> ${targetId}`);
      friendsMap.get(sourceId).add(targetId);
    }
  });

  const userInterestsMap = new Map();
  users.forEach((u) => userInterestsMap.set(u.id, new Set()));

  for (const [interestName, userIds] of Object.entries(interests)) {
    userIds.forEach((userId) => {
      if (userInterestsMap.has(userId)) {
        userInterestsMap.get(userId).add(interestName);
      }
    });
  }

  const enrichedUsers = users.map((user) => {
    const myId = user.id;
    const myFriends = friendsMap.get(myId);
    const myInterests = userInterestsMap.get(myId);

    const suggestedFriendsSet = new Set();
    const suggestedInterestsSet = new Set();

    for (const friendId of myFriends) {
      const friendsOfFriend = friendsMap.get(friendId) || new Set();
      for (const fofId of friendsOfFriend) {
        if (fofId !== myId && !myFriends.has(fofId)) {
          suggestedFriendsSet.add(fofId);
        }
      }

      const friendInterests = userInterestsMap.get(friendId) || new Set();
      for (const interest of friendInterests) {
        if (!myInterests.has(interest)) {
          suggestedInterestsSet.add(interest);
        }
      }
    }

    return {
      ...user,
      suggestedFriends: Array.from(suggestedFriendsSet).map((id) =>
        userMap.get(id),
      ),
      suggestedInterests: Array.from(suggestedInterestsSet),
    };
  });

  setUsers(enrichedUsers);
}
