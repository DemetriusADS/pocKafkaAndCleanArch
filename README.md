# Overview
This project is a POC and because of this, it is being running with Nodemon script.
The main motivation was  testing an integration with  ExpressJS and Apache Kafka, adopting as main architecture Clean Architecture. So, the idea is be able to change all external frameworks (ExpressJS), and the topic broker (Kafka) without compromise the main core..

## How to inicialize this project
	- Mounting docker images:
		- At root folder, execute:
	`docker-compose up -d`
	- Then, install Node dependencies 
	`npm install`
	- Lastly, if every step was ran correctly, you can start the project and send requests.
	`npm run start:dev`

Route:
```
	[POST] localhost:8000/login

Body:
{
	"email": "any_email@email.com",
	"password": "any_password"
}
```

## Unit Tests
	- Test coverage:
	File         | % Stmts | % Branch | % Funcs | % Lines |
	All files   |   89.75 |    93.33 |   66.66 |   89.75 |

To run all tests and see the coverage, run:
`npm run test`

## Listening messages in Kafka Container
In a separeted terminal, enter in docker Kafka container:
`docker exec -it loginandkafka_kafka_1 bash`

If, every thing is ok, now you can run the command below:
`kafka-console-consumer.sh —bootstrap-server kafka:9092 —topic topic-1 —from-beginning`

Now, you are able to listen all messages that has been sent to `topic-1`
