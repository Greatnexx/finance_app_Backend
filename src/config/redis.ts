import Redis from 'ioredis';

const redis = new Redis({
  host: 'localhost', // Redis server host (default is localhost)
  port: 6379, // Redis port (default is 6379)
});

export default redis;
