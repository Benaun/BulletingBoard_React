const deleteFromFav = (items, delItem) => {
    const updateArray = [...items];
    updateArray.splice(delItem, 1);
    return updateArray
};

export default deleteFromFav;