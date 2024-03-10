const generateFilter = (color, size, priceFrom, priceTo, category) => {
    let filter = {};
    if (color) filter.colors = { $in: [color] };
    if (size) filter.sizes = { $in: [size] };
    if (priceFrom && priceTo) {
        filter.price = { $gte: priceFrom, $lte: priceTo };
    } else if (priceFrom) {
        filter.price = { $gte: priceFrom };
    } else if (priceTo) {
        filter.price = { $lte: priceTo };
    }

    return { ...filter, category: category };
};

module.exports = generateFilter;
