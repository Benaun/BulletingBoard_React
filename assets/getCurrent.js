export function getCurrentUser (users, id) {
    const currentUser = users?.find(user => user.id == id);
    return currentUser;
}

export function getCurrentBullet (bullets, id) {
    const currentBullet = bullets?.find(bullet => bullet.id == id)
    return currentBullet;
}
