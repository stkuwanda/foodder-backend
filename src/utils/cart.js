export function checkIfCartIsEmpty(cartData) {
	// set cartData to empty object if all cartItem properties across the cartData object
	// have a total count of zero
	const cartValues = Object.values(cartData);
	const sum = cartValues.reduce((accumulator, currentValue) => {
		return accumulator + currentValue;
	}, 0);

	if (sum < 1) {
		return true;
	}

	return false;
}
