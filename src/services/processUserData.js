function friendsRecomendation(friendsMap) {
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
  console.log(recomendation);
  return recomendation;
}

export default function mapFriends(friends) {
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
  console.log(myFriendsMap);
  return friendsRecomendation(myFriendsMap);
}
