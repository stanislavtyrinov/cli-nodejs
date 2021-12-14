module.exports = {
  content: {
    rickandmorty: {
      characters: {
        apiUrl: 'https://rickandmortyapi.com/api/character',
        mapping: 'rickandmorty-character'
      },
      episodes: {
        apiUrl: 'https://rickandmortyapi.com/api/episode',
        mapping: 'rickandmorty-episode'
      }
    }
  },
  aws: {
    sqs: {
      apiVersion: '2012-11-05',
      region: 'us-east-1',
      endpoint: process.env.SQS_ENDPOINT,
      queueUrl: process.env.SQS_QUEUE_URL
    }
  }
};
