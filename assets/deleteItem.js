async function deleteItem(id) {
    try {
        const response = await fetch(`http://localhost:8000/bullets/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error('fetch ' + response.status);
        return await response.json();
    } catch (error) {
        console.log("Возникла проблема с вашим fetch запросом: ", error.message);
    }
}

export default deleteItem;