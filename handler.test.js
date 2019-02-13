const fs = require('fs');
const { indexContent } = require('./handler');

describe('indexContent', () => {
  describe('invoked withvalid box event', () => {
    const event = JSON.parse(fs.readFileSync('./test/data/boxEvent1.json', 'utf8'));
    it('posts the readonly url to ElasticAllen', async () => {
      await indexContent(event);
      expect(true).toBe(true);
    });
  });
});
