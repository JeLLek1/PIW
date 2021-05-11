const accounts = {
  students: [
    {
      name: 'Janek K',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      email: 'janek@example.com',
      tags: [
        { key: 'aws', title: 'AWS' },
        { key: 'react', title: 'React' },
        { key: 'html', title: 'HTML' },
      ],
      editKey: 'tajnykluczedycjijanka',
      image:
        'data:image/png;base64,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',
    },
    {
      name: 'Bartosz W',
      description: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`,
      email: 'bartosz@example.com',
      tags: [
        { key: 'jquery', title: 'jQuery' },
        { key: 'mysql', title: 'MySQL' },
      ],
      editKey: 'tajnykluczedycjibartka',
      image:
        'data:image/png;base64,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',
    },
  ],
  groups: [
    {
      name: 'PiWna grupka',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      email: 'janek@example.com',
      tags: [
        { key: 'aws', title: 'AWS' },
        { key: 'react', title: 'React' },
      ],
      editKey: 'tajnykluczedycjipiwnejGrupy',
      image:
        'data:image/png;base64,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',
    },
  ],
};
export default accounts;
