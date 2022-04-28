const {Kafka, CompressionTypes} = require('kafkajs')
const config = require("../_config/kafka");
let isConnected = false;
const kafka = new Kafka({
    brokers: config.brokers,
});

const producer = kafka.producer()
const sendMessage = (topic, messages) => {

    return producer
        .send({
            topic,
            compression: CompressionTypes.GZIP,
            messages: messages.map(el => {
                return {value: JSON.stringify(el)}
            }),
        })
        .catch(e => console.error(`${topic} ${e.message}`, e))
}

const connected = () => {
    return isConnected
}

const run = async () => {
    await producer.connect();
    isConnected = true;
    console.log('Kafka running...')
}

run().catch(() => isConnected = false);

module.exports = {sendMessage, connected};
