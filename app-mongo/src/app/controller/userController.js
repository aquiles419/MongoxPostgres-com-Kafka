const User = require("../model/User");
const { Kafka } = require('kafkajs');

class UserController {
  async store(req, res) {
    const data = await User.create(req.body);

          //kafka
      //Instanciando o broker
      const { Kafka } = require('kafkajs')

      const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['localhost:9093'],
      })

      // create msg kafka
      const producer = kafka.producer()

      await producer.connect()
      await producer.send({
        topic: 'test-topic',
        messages: [
          { value: 'Testando 01' },
        ],
      })

      await producer.disconnect()

      //end userController
    return res.json(data);
  }
  async index(req, res) {
    const data = await User.find({});

    return res.json(data);
  }
}

module.exports = new UserController();