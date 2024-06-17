const FILTERED_MESSAGES: string[] = [
  'Material-UI: The `css` function is deprecated. Use the `styleFunctionSx` instead.',
];

jest.spyOn(global.console, 'warn').mockImplementationOnce(message => {
  if (
    !FILTERED_MESSAGES.some(filteredMessage =>
      message.includes(filteredMessage),
    )
  ) {
    global.console.warn(message);
  }
});
