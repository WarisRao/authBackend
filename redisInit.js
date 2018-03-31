import redis from 'redis';

client = redis.createClient();

client.on('error',(error)=>{
    console.log('error::',error);
});

export default client;