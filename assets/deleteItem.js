const deleteFromFav = (items, itemToDelete) => {
    return items.filter(item => item.id !== itemToDelete.id);
};

export default deleteFromFav;