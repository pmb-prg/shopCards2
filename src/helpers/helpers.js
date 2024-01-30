const shortenText = (text) => {
    return text.split(" ").slice(0, 3).join(" ");
}

const searchProducts = (products, search) =>{
    if (!search) return products;
    const searchedProducts = products.filter((p) => p.title.toLowerCase().includes(search));
    return searchedProducts
}

const filterProducts = (products, category) => {
    if (!category || category === 'all') return products;
    const filteredCategory = products.filter((p) => p.category === category);
    return filteredCategory
}

const orderProducts = (products, order) => {
    if(!order || order === "newest"){
        const newest = products.sort((a, b) => a.id - b.id)
        return newest
    } else if(order === "cheapest"){ 
         const cheap =  products.sort((a, b) => a.price - b.price);
         return cheap;
    } else if(order === "expensive"){
        const expensive = products.sort((a, b) => a.price - b.price).reverse();
        return expensive;
    }
}

const createQueryObject = (currentQuery, newQuery) =>{
    if(newQuery.category === 'all'){
        const {category, ...rest} = currentQuery;
        return rest;
    }
    if(newQuery.search === ''){
        const {search, ...rest} = currentQuery;
        return rest;
    }
    if(newQuery.order === 'newest'){
        const {order, ...rest} = currentQuery;
        return rest;
    }
    return {...currentQuery, ...newQuery,}
}

 const getInitialQuery = (searchParams) =>{
    const query = {};
    const category = searchParams.get('category');
    const searchQuery = searchParams.get('search');
    const order = searchParams.get('order');
    if (category) query.category = category
    if (searchQuery) query.search = searchQuery
    if (order) query.order = order
    return query;
 }

const sumProducts = products => {
    const itemsCounter = products.reduce((acc, cur) => acc+cur.quantity, 0);
    const total = products.reduce((acc, cur) => acc + cur.price * cur.quantity,0).toFixed(2);
    return { itemsCounter, total};
}

const productQuantity = (state, id) => {
    const productIndex = state.selectedItems.findIndex(items => items.id === id);
    if (productIndex === -1){
        return 0
    }else{
        return state.selectedItems[productIndex].quantity;
    }
}

export {
    shortenText, 
    searchProducts, 
    filterProducts, 
    orderProducts,
    createQueryObject, 
    getInitialQuery,
    sumProducts,
    productQuantity
};