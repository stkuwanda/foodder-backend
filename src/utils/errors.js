export function handleError(error, res) {
  console.log(error);
  res.status(500).json({ success: false, message: 'Operation failed with an error.' });
}