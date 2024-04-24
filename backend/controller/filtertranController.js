const getFilteredTransactions = async (req, res) => {
  const { startDate, endDate } = req.query;

  // Extract month from startDate and endDate
  const startMonth = new Date(startDate).getMonth() + 1; // Adding 1 to get the month in range 1-12
  const endMonth = new Date(endDate).getMonth() + 1;

  try {
    // Query transactions filtered by month
    const transactions = await BookTransaction.find({
      issueDate: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    });

    // Filter transactions within the specified month
    const filteredTransactions = transactions.filter(transaction => {
      const transactionMonth = new Date(transaction.issueDate).getMonth() + 1;
      return transactionMonth >= startMonth && transactionMonth <= endMonth;
    });

    res.status(200).json(filteredTransactions);
  } catch (error) {
    console.error('Error fetching filtered transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getFilteredTransactions };
