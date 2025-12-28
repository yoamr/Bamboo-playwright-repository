function calculateExpectedSubTotal(items) {
  return items.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);
}

module.exports = { calculateExpectedSubTotal };