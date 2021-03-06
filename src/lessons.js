export default [
  {
    number: 1,
    name: 'Lesson One: Plainest of the Plain',
    description: 'Bob is looking for the simplest possible hamburger. It should be easy to find the ingredients.',
    desiredIngredients: [
      {
        quantity: 1,
        symbols: '&',
        name: 'hamburger patty'
      }
    ],
    desiredRegex: '&',
    availableRegex: '&'
  },
  {
    number: 2,
    name: 'Lesson Two: "With cheese, please"',
    description: 'This time, Bob would like a cheeseburger, with american cheese. Still a pretty easy order.',
    desiredIngredients: [
      {
        quantity: 1,
        symbols: '&',
        name: 'hamburger patty'
      },
      {
        quantity: 1,
        symbols: '1',
        name: 'american cheese'
      }
    ],
    desiredRegex: '&|1',
    availableRegex: '12&a&123!123abcd !&@'
  },
  {
    number: 3,
    name: 'Lesson Three: Gouda or Swiss',
    description: 'Bob feels a bit less picky, and says he would like a hamburger with either gouda or swiss cheese. '
      + 'You will have to add some kind of notation that the chef can understand that means "either or these"... ',
    desiredIngredients: [
      {
        quantity: 1,
        symbols: '&',
        name: 'hamburger patty'
      },
      {
        quantity: 1,
        symbols: '12',
        name: 'american OR gouda cheese'
      }
    ],
    desiredRegex: '&|[|1|2|]',
    availableRegex: 'ca&23@ 23&3a'
  },
  {
    number: 4,
    name: 'Lesson Four: Any cheese',
    description: 'Less picky still, Bob requests a hamburger with one piece of ANY cheese. '
      + 'Luckily for the chef, all the cheese is kept in a bin with the "\\d" symbol on it... ',
    desiredIngredients: [
      {
        quantity: 1,
        symbols: '&',
        name: 'hamburger patty'
      },
      {
        quantity: 1,
        symbols: '1',
        name: 'ANY cheese'
      }
    ],
    desiredRegex: '&|\\d',
    availableRegex: 'ca&3@ 23&da'
  }
];
