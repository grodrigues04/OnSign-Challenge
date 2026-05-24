function mapFriendsofFriends(friendsMap) {
  const recomendation = new Map();
  for (const [key, lista] of friendsMap) {
    recomendation.set(key, new Set());
    for (const item of lista) {
      const listAmigoDoAmigo = friendsMap.get(item);
      if (!listAmigoDoAmigo) continue;
      const diferenca = listAmigoDoAmigo.difference(lista);
      for (const amigoRecomendado of diferenca) {
        if (amigoRecomendado !== key) {
          recomendation.get(key).add(amigoRecomendado);
        }
      }
    }
  }
  return recomendation;
}
function mapInterests(interests, friendsMap, users) {
  const interestsMap = new Map();
  const interestKeys = Object.keys(interests);
  for (const user of users) {
    for (const keyInterest of interestKeys) {
      if (interests[keyInterest].includes(user.id)) {
        if (!interestsMap.has(user.id, new Set())) {
          interestsMap.set(user.id, new Set());
        }
        interestsMap.get(user.id).add(keyInterest);
      }
    }
  }

  const interestsRecomendation = new Map();
  for (const [key, interest] of interestsMap) {
    for (const [me, listOfFriends] of friendsMap) {
      for (const friend of listOfFriends) {
        const myListOfInterst = interestsMap.get(key);
        const liftOfInterestFriend = interestsMap.get(friend);
        if (!myListOfInterst || !liftOfInterestFriend) {
          continue;
        }
        const diference = liftOfInterestFriend.difference(myListOfInterst);
        if (diference.size > 0) {
          if (!interestsRecomendation.has(key)) {
            interestsRecomendation.set(key, new Set());
          }
          for (const item of diference) {
            interestsRecomendation.get(key).add(item);
          }
        }
      }
    }
  }
  return interestsRecomendation;
}

function getNames(users, idsSet) {
  const names = [];
  for (const user of users) {
    if (idsSet.size > 0 && idsSet.has(user.id)) {
      names.push(user.name);
    }
  }

  return names;
}

function mapWithId(users, suggestedFriends, suggestedInterests) {
  for (const user of users) {
    const id = user.id;
    console.log(suggestedFriends.get(id));
    if (suggestedFriends.get(id)) {
      user["possible_friends"] = getNames(users, suggestedFriends.get(id));
    }
    if (suggestedInterests.get(id)) {
      user["possible_interests"] = suggestedInterests.get(id);
    }
  }
}

export default function mapFriends(api, setUsers) {
  const friends = api.friends;
  const myFriendsMap = new Map();
  for (const duo of friends) {
    const myFriend = duo[1];
    const me = duo[0];
    for (const list of friends) {
      if (list[0] == me) {
        if (!myFriendsMap.has(me)) {
          myFriendsMap.set(me, new Set());
        }
        myFriendsMap.get(me).add(list[1]);
      }
    }
  }
  let recomendationFriends = mapFriendsofFriends(myFriendsMap);
  let interestsRecomendationMap = mapInterests(
    api.interests,
    myFriendsMap,
    api.users,
  );
  mapWithId(api.users, recomendationFriends, interestsRecomendationMap);
  setUsers(api.users);
}
