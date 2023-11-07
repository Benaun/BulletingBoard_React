async function getUsers() {
    try {
        const response = await fetch("http://localhost:8000/users");
        if (!response.ok) throw new Error('fetch ' + response.status);
        return await response.json();
    } catch (error) {
        console.log("Возникла проблема с вашим fetch запросом: ", error.message);
    }
}

export default getUsers;